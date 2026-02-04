import { Routes } from '@angular/router';
import { CreationChampionnat } from './creation-championnat/creation-championnat';

export const routes: Routes = [
    { path: '', redirectTo: 'creation-championnat', pathMatch: 'full' },
    { path: 'creation-championnat', component: CreationChampionnat }
];

