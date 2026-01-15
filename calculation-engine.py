from ortools.sat.python import cp_model

# -----------------------
# MODELO
# -----------------------
model = cp_model.CpModel()

# -----------------------
# CONJUNTOS
# -----------------------
G = range(2)   # grupos
P = range(6)   # profesores
A = range(9)   # asignaturas
D = range(5)   # días
H = range(6)   # horas por día

# Asignaturas con profesor único semanal
A_unico = [0, 1, 2, 5, 7]  # A1, A2, A3, A6, A8

# -----------------------
# CARGA SEMANAL POR GRUPO Y ASIGNATURA
# -----------------------
carga = {
    0: [6, 6, 2, 5, 2, 2, 3, 4, 0],  # grupo 1
    1: [6, 6, 2, 5, 2, 2, 3, 2, 2],  # grupo 2
}

# Máximo diario por asignatura
max_diario = {
    0: 2,  # A1
    1: 2,  # A2
    2: 1,
    3: 1,
    4: 1,
    5: 1,
    6: 1,
    7: 1,
    8: 1,
}

# -----------------------
# VARIABLES
# -----------------------
z = {}
x = {}
y = {}
for g in G:
    for a in A:
        for d in D:
            for h in H:
                z[g,a,d,h] = model.NewBoolVar(f"z_{g}_{a}_{d}_{h}")
                for p in P:
                    x[g,p,a,d,h] = model.NewBoolVar(f"x_{g}_{p}_{a}_{d}_{h}")

# y solo para A_unico
for g in G:
    for p in P:
        for a in A_unico:
            y[g,p,a] = model.NewBoolVar(f"y_{g}_{p}_{a}")

# -----------------------
# RESTRICCIONES DURAS
# -----------------------

# 1. Cobertura total: exactamente una asignatura por hora
for g in G:
    for d in D:
        for h in H:
            model.Add(sum(z[g,a,d,h] for a in A) == 1)

# 3. Máximo diario por asignatura
for g in G:
    for a in A:
        for d in D:
            model.Add(sum(z[g,a,d,h] for h in H) <= max_diario[a])

# 4. Horas semanales exactas por grupo
for g in G:
    for a in A:
        model.Add(sum(z[g,a,d,h] for d in D for h in H) == carga[g][a])

# 2. Exactamente un profesor si hay clase
for g in G:
    for a in A:
        for d in D:
            for h in H:
                model.Add(sum(x[g,p,a,d,h] for p in P) == z[g,a,d,h])

# 6. Un profesor no puede dar dos clases al mismo tiempo
for p in P:
    for d in D:
        for h in H:
            model.Add(sum(x[g,p,a,d,h] for g in G for a in A) <= 1)

# 7. Restricciones profesor–asignatura–grupo
permitido = {
    (0,0): [0,1,2,5,7],
    (1,1): [0,1,2,5,7],
    (2,0): [3], (2,1): [3],
    (3,0): [4], (3,1): [4],
    (4,0): [6], (4,1): [6],
    (5,0): [8], (5,1): [8],
}

for g in G:
    for p in P:
        for a in A:
            if (p,g) not in permitido or a not in permitido[(p,g)]:
                for d in D:
                    for h in H:
                        model.Add(x[g,p,a,d,h] == 0)

# 8. Relación x → z
for g in G:
    for p in P:
        for a in A:
            for d in D:
                for h in H:
                    model.Add(x[g,p,a,d,h] <= z[g,a,d,h])

# 9a. Profesor único para A_unico
for g in G:
    for a in A_unico:
        model.Add(sum(y[g,p,a] for p in P) == 1)

# 9b. x → y
for g in G:
    for p in P:
        for a in A_unico:
            for d in D:
                for h in H:
                    model.Add(x[g,p,a,d,h] <= y[g,p,a])

# -----------------------
# DISPONIBILIDAD
# -----------------------
disponibilidad = {}
for p in P:
    disponibilidad[p] = {d: list(H) for d in D}  # todos disponibles

# Profesor 3 (p=2) tiene horario especial
disponibilidad[2] = {
    0: [3,4,5],
    1: [3,4,5],
    2: [3,4,5],
    3: [0,1,2],
    4: [0,1,2],
}

for p, dias in disponibilidad.items():
    for d in D:
        horas_permitidas = dias.get(d, [])
        for h in H:
            if h not in horas_permitidas:
                for g in G:
                    for a in A:
                        model.Add(x[g,p,a,d,h] == 0)

# -----------------------
# CLASES OBLIGATORIAS (genérico)
# -----------------------
# Formato: (profesor, asignatura, grupo, día, hora)
clases_obligatorias = [
    (0, 0, 0, 0, 0),  # Profesor 1, A1, todos los grupos, día 1, hora 1
]

for (p, a, g, d, h) in clases_obligatorias:
    grupos = [g] if g is not None else G
    for grp in grupos:
        model.Add(x[grp, p, a, d, h] == 1)

# -----------------------
# PREFERENCIAS SUAVES
# -----------------------

# Profesor 4
penalizacion_p4 = []
p = 3
dias_preferidos = [0,1,2]  # días 1-3
horas_preferidas = [0,1,2,3,4]  # horas 1-5

for g in G:
    for a in A:
        for d in D:
            for h in H:
                if (d not in dias_preferidos) or (h not in horas_preferidas):
                    pen = model.NewBoolVar(f"pen_p4_{g}_{a}_{d}_{h}")
                    penalizacion_p4.append(pen)
                    model.Add(x[g,p,a,d,h] == 1).OnlyEnforceIf(pen)
                    model.Add(x[g,p,a,d,h] == 0).OnlyEnforceIf(pen.Not())

# Profesor 5
penalizacion_p5 = []
p = 4
dias_preferidos = [1,2,3,4]  # días 2-5
horas_preferidas = [0,1,2]   # horas 1-3

for g in G:
    for a in A:
        for d in D:
            for h in H:
                if (d not in dias_preferidos) or (h not in horas_preferidas):
                    pen = model.NewBoolVar(f"pen_p5_{g}_{a}_{d}_{h}")
                    penalizacion_p5.append(pen)
                    model.Add(x[g,p,a,d,h] == 1).OnlyEnforceIf(pen)
                    model.Add(x[g,p,a,d,h] == 0).OnlyEnforceIf(pen.Not())

# -----------------------
# OBJETIVO: minimizar penalizaciones
# -----------------------
model.Minimize(10*sum(penalizacion_p4) + 1*sum(penalizacion_p5))

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
if status in (cp_model.FEASIBLE, cp_model.OPTIMAL):
    for g in G:
        print(f"\nGrupo {g+1}")
        for d in D:
            print(f" Día {d+1}: ", end="")
            for h in H:
                for a in A:
                    if solver.Value(z[g,a,d,h]):
                        for p in P:
                            if solver.Value(x[g,p,a,d,h]):
                                print(f"(A{a+1},P{p+1}) ", end="")
            print()
    print("\nCoste total de preferencias suaves:", solver.ObjectiveValue())
elif status == cp_model.INFEASIBLE:
    print("No se encontró solución factible ❌")
    print(solver.ReasonForInfeasibility())
else:
    print("Estado desconocido")
