import { Routes } from '@angular/router';
import { SportComponent } from './sport/sport.component';
import { ListeChampionnatComponent } from './liste-championnat/liste-championnat.component';
import { ListeCompetitionComponent } from './liste-competition/liste-competition.component';
import { ListeEpreuveComponent } from './liste-epreuve/liste-epreuve.component';

export const routes: Routes = [
    { path: '', redirectTo: 'sports', pathMatch: 'full' },
    { path: 'sports', component: SportComponent },
    { path: 'sports/:sportId/championnats', component: ListeChampionnatComponent },
    { path: 'championnats/:championshipId/competitions', component: ListeCompetitionComponent },
    { path: 'competitions/:competitionId/epreuves', component: ListeEpreuveComponent }
];

