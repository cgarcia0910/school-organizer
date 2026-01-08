import { provideApi as provideApiGroup } from '@organizer/group-api';
import { provideApi as provideApiPrueba } from '@organizer/prueba-api';

export const apiConfig = [
    provideApiGroup('/api'),
    provideApiPrueba('/api'),
]