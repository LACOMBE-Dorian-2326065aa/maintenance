import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-championnat',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './liste-championnat.component.html',
  styleUrl: './liste-championnat.component.scss'
})
export class ListeChampionnatComponent implements OnInit {
  sportId: number | null = null;
  championships: any[] = [];
  
  // For adding new
  isAdding = false;
  newChampionshipName = '';

  // For editing
  editingId: number | null = null;
  editName = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('sportId');
      if (id) {
        this.sportId = +id;
        this.loadChampionships();
      }
    });
  }

  loadChampionships() {
    if (!this.sportId) return;
    this.http.get<any[]>(`/api/championship/sport/${this.sportId}`).subscribe({
      next: (data) => {
        this.championships = data;
      },
      error: (err) => console.error('Error loading championships', err)
    });
  }

  startAdd() {
    this.isAdding = true;
    this.newChampionshipName = '';
  }

  cancelAdd() {
    this.isAdding = false;
    this.newChampionshipName = '';
  }

  saveNew() {
    if (!this.newChampionshipName.trim() || !this.sportId) return;
    
    // API: POST /api/championship/{name}/{sport}
    const url = `/api/championship/${this.newChampionshipName}/${this.sportId}`;
    this.http.post(url, {}).subscribe({
      next: () => {
        alert('Championnat ajouté avec succès');
        this.loadChampionships();
        this.cancelAdd();
      },
      error: (err) => console.error('Error creating championship', err)
    });
  }

  startEdit(championship: any, event: Event) {
    event.stopPropagation();
    this.editingId = championship.id;
    this.editName = championship.name;
  }

  cancelEdit(event?: Event) {
    if (event) event.stopPropagation();
    this.editingId = null;
    this.editName = '';
  }

  saveEdit(championship: any, event: Event) {
    event.stopPropagation();
    if (!this.editName.trim()) return;

    // API: PUT /api/championship/{id}/{newName}
    const url = `/api/championship/${championship.id}/${this.editName}`;
    this.http.put(url, {}).subscribe({
      next: () => {
        this.loadChampionships();
        this.editingId = null;
      },
      error: (err) => console.error('Error updating championship', err)
    });
  }

  goToCompetitions(championshipId: number) {
    if (this.editingId !== null) return; // Don't navigate if editing
    this.router.navigate(['/championnats', championshipId, 'competitions']);
  }
}
