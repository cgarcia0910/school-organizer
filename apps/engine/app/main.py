from fastapi import FastAPI
from ortools.sat.python import cp_model
from typing import List
from pydantic import BaseModel


# Subject básico (solo para habilitations)
class SubjectBasic(BaseModel):
    id: int
    name: str


# Subject completo (con horas)
class Subject(BaseModel):
    id: int
    name: str
    hoursPerWeek: int
    maxDailyWorkload: int


class CourseRef(BaseModel):
    id: int


class Habilitation(BaseModel):
    id: int
    name: str
    course: CourseRef
    subjects: List[SubjectBasic]  # ← Cambio aquí: usar SubjectBasic


class Teacher(BaseModel):
    id: int
    name: str
    habilitations: List[Habilitation]


class TeacherAssignment(BaseModel):
    teacher: Teacher
    subject: Subject  # ← Este sigue usando Subject completo


class Group(BaseModel):
    id: int
    groupName: str
    teacherAssignments: List[TeacherAssignment]


class Course(BaseModel):
    id: int
    name: str


class CourseWithGroups(BaseModel):
    course: Course
    groups: List[Group]

app = FastAPI()

@app.post("/")
def solve_scenario(payload: List[CourseWithGroups]):
    # Línea 713: Cambiar acceso de diccionario a atributo
    flattened_courses_groups = [
        {'course_id': course_with_groups.course.id, 'group_id': group.id}
        for course_with_groups in payload
        for group in course_with_groups.groups
    ]

    G = range(len(flattened_courses_groups))

    unique_teacher_ids = set()
    unique_subject_ids = set()

    for course_with_groups in payload:
        for group in course_with_groups.groups:
            for assignment in group.teacherAssignments:
                unique_teacher_ids.add(assignment.teacher.id)
                unique_subject_ids.add(assignment.subject.id)

    # AÑADIR ESTAS LÍNEAS AQUÍ (después de la línea 78):
    # Convert sets to lists if needed, or keep as sets for direct use
    P_ids = list(unique_teacher_ids)
    A_ids = list(unique_subject_ids)
    P = range(len(P_ids))
    A = range(len(A_ids))

    # Línea 732: Cambiar accesos
    subject_map = {}

    for course_with_groups in payload:
        for group in course_with_groups.groups:
            for a in group.teacherAssignments:
                sid = a.subject.id
                if sid not in subject_map:
                    subject_map[sid] = a.subject

    # Orden estable por id
    sorted_subjects = sorted(subject_map.values(), key=lambda s: s.id)

    subject_index = {s.id: i for i, s in enumerate(sorted_subjects)}
    num_subjects = len(sorted_subjects)

    carga = {}
    max_diario = {}

    group_idx = 0

    for course_with_groups in payload:
        for group in course_with_groups.groups:

            # Inicializar con ceros
            carga[group_idx] = [0] * num_subjects
            max_diario[group_idx] = {}

            for a in group.teacherAssignments:
                subject = a.subject
                i = subject_index[subject.id]

                carga[group_idx][i] = subject.hoursPerWeek
                max_diario[group_idx][i] = subject.maxDailyWorkload

            # Asegurar que todas las asignaturas tengan max_diario
            for i in range(num_subjects):
                max_diario[group_idx].setdefault(i, 0)

            group_idx += 1

    teachers = {}
    subjects = {}

    for course_with_groups in payload:
        for group in course_with_groups.groups:
            for a in group.teacherAssignments:
                t = a.teacher
                s = a.subject

                teachers[t.id] = t
                subjects[s.id] = s

    sorted_teachers = sorted(teachers.values(), key=lambda t: t.id)
    sorted_subjects = sorted(subjects.values(), key=lambda s: s.id)

    teacher_index = {t.id: i for i, t in enumerate(sorted_teachers)}
    subject_index = {s.id: i for i, s in enumerate(sorted_subjects)}

    permitido = {}

    group_idx = 0

    for course_with_groups in payload:
        for group in course_with_groups.groups:

            for a in group.teacherAssignments:
                t_id = a.teacher.id
                s_id = a.subject.id

                t_idx = teacher_index[t_id]
                s_idx = subject_index[s_id]

                key = (t_idx, group_idx)

                if key not in permitido:
                    permitido[key] = []

                if s_idx not in permitido[key]:
                    permitido[key].append(s_idx)

            group_idx += 1

    for k in permitido:
        permitido[k].sort()

    # -----------------------
    # MODELO
    # -----------------------
    model = cp_model.CpModel()

    # -----------------------
    # CONJUNTOS
    # -----------------------
    D = range(5)   # días
    H = range(6)   # horas

    # -----------------------
    # VARIABLES
    # -----------------------
    z, x, t = {}, {}, {}

    for g in G:
        for a in A:
            for d in D:
                for h in H:
                    z[g,a,d,h] = model.NewBoolVar(f"z_{g}_{a}_{d}_{h}")
                    for p in P:
                        x[g,p,a,d,h] = model.NewBoolVar(f"x_{g}_{p}_{a}_{d}_{h}")

    for g in G:
        for p in P:
            for a in A:
                t[g,p,a] = model.NewBoolVar(f"t_{g}_{p}_{a}")

    # -----------------------
    # RESTRICCIONES
    # -----------------------

    # 1. Cobertura total: una asignatura por hora
    for g in G:
        for d in D:
            for h in H:
                model.Add(sum(z[g,a,d,h] for a in A) == 1)

    # 2. Exactamente un profesor si hay clase
    for g in G:
        for a in A:
            for d in D:
                for h in H:
                    model.Add(sum(x[g,p,a,d,h] for p in P) == z[g,a,d,h])

    # 3. Un profesor no puede dar dos clases simultáneas
    for p in P:
        for d in D:
            for h in H:
                model.Add(sum(x[g,p,a,d,h] for g in G for a in A) <= 1)

    # 4. Carga semanal exacta por grupo y asignatura
    for g in G:
        for a in A:
            model.Add(sum(z[g,a,d,h] for d in D for h in H) == carga[g][a])

    # 5. Máximo diario por grupo y asignatura
    for g in G:
        for a in A:
            for d in D:
                model.Add(sum(z[g,a,d,h] for h in H) <= max_diario[g][a])

    # 6. Profesor único por (grupo, asignatura) SOLO si la carga > 0
    for g in G:
        for a in A:
            if carga[g][a] > 0:
                model.Add(sum(t[g,p,a] for p in P) == 1)
            else:
                model.Add(sum(t[g,p,a] for p in P) == 0)

    # 7. Enlace x → t
    for g in G:
        for p in P:
            for a in A:
                for d in D:
                    for h in H:
                        model.Add(x[g,p,a,d,h] <= t[g,p,a])

    for g in G:
        for p in P:
            for a in A:
                if (p,g) not in permitido or a not in permitido[(p,g)]:
                    model.Add(t[g,p,a] == 0)

    # -----------------------
    # DISPONIBILIDAD (funciona, se ha comentado para hacer version mas simple)
    # -----------------------
    # disponibilidad = {p:{d:list(H) for d in D} for p in P}

    ## Profesor 3 (p=2)

    # disponibilidad[2] = {
    #     0:[3,4,5],
    #     1:[3,4,5],
    #     2:[3,4,5],
    #     3:[0,1,2],
    #     4:[0,1,2],
    # }

    # for p in P:
    #     for d in D:
    #         for h in H:
    #             if h not in disponibilidad[p].get(d, []):
    #                 for g in G:
    #                     for a in A:
    #                         model.Add(x[g,p,a,d,h] == 0)

    # # -----------------------
    # # CLASES OBLIGATORIAS (funciona, se ha comentado para hacer version mas simple)
    # # -----------------------
    # clases_obligatorias = [
    #     (0, 0, 0, 0, 0),  # Profesor 1, A1, Grupo 1, lunes hora 1
    # ]

    # for p,a,g,d,h in clases_obligatorias:
    #     model.Add(x[g,p,a,d,h] == 1)

    # -----------------------
    # SOLVER
    # -----------------------
    solver = cp_model.CpSolver()
    solver.parameters.max_time_in_seconds = 60
    solver.parameters.num_search_workers = 8

    status = solver.Solve(model)

    # -----------------------
    # RESULTADOS
    # -----------------------
    solution = []
    if status in (cp_model.FEASIBLE, cp_model.OPTIMAL):
        print("✅ SOLUCIÓN ENCONTRADA\n")
        for g in G:
            print(f"Grupo {g+1}")
            for d in D:
                print(f" Día {d+1}: ", end="")
                for h in H:
                    for a in A:
                        if solver.Value(z[g,a,d,h]):
                            for p in P:
                                if solver.Value(x[g,p,a,d,h]):
                                    print(f"(A{a+1},P{p+1}) ", end="")
                                    solution.append({
                                        'course_id': flattened_courses_groups[g]['course_id'],
                                        'group_id': flattened_courses_groups[g]['group_id'],
                                        'subject_id': A_ids[a],
                                        'teacher_id': P_ids[p],
                                        'day': d,
                                        'hour': h,
                                    })
                print()
            print()
    else:
        print("❌ No se encontró solución factible")
    return solution