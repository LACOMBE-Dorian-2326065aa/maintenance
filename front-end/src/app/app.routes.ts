import { Routes } from '@angular/router';
import { CreationChampionnat } from './creation-championnat/creation-championnat';
import { SportComponent } from './sport/sport.component';
import { ListeChampionnatComponent } from './liste-championnat/liste-championnat.component';

export const routes: Routes = [
    { path: '', redirectTo: 'sports', pathMatch: 'full' },
    { path: 'sports', component: SportComponent },
    { path: 'sports/:sportId/championnats', component: ListeChampionnatComponent },
    { path: 'creation-championnat', component: CreationChampionnat }
];

