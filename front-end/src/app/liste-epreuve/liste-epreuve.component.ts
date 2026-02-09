import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-epreuve',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-epreuve.component.html',
  styleUrl: './liste-epreuve.component.scss'
})
export class ListeEpreuveComponent implements OnInit {
  competitionId: number | null = null;
  events: any[] = [];
  
  isAdding = false;
  newName = '';

  editingId: number | null = null;
  editName = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router // Not strictly needed for navigation unless deep linking further or back
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('competitionId');
      if (id) {
        this.competitionId = +id;
        this.loadEvents();
      }
    });
  }

  loadEvents() {
    if (!this.competitionId) return;
    this.http.get<any[]>(`/api/event/competition/${this.competitionId}`).subscribe({
      next: (data) => {
        this.events = data;
      },
      error: (err) => console.error('Error loading events', err)
    });
  }

  startAdd() {
    this.isAdding = true;
    this.newName = '';
  }

  cancelAdd() {
    this.isAdding = false;
    this.newName = '';
  }

  saveNew() {
    if (!this.newName.trim() || !this.competitionId) return;
    
    // API: POST /api/event/{name}/{competition}
    const url = `/api/event/${this.newName}/${this.competitionId}`;
    this.http.post(url, {}).subscribe({
      next: () => {
        this.loadEvents();
        this.cancelAdd();
      },
      error: (err) => console.error('Error creating event', err)
    });
  }

  startEdit(item: any, event: Event) {
    event.stopPropagation();
    this.editingId = item.id;
    this.editName = item.name;
  }

  cancelEdit(event?: Event) {
    if (event) event.stopPropagation();
    this.editingId = null;
    this.editName = '';
  }

  saveEdit(item: any, event: Event) {
    event.stopPropagation();
    if (!this.editName.trim()) return;

    // API: PUT /api/event/{id}/{newName}
    const url = `/api/event/${item.id}/${this.editName}`;
    this.http.put(url, {}).subscribe({
      next: () => {
        this.loadEvents();
        this.editingId = null;
      },
      error: (err) => console.error('Error updating event', err)
    });
  }
}
