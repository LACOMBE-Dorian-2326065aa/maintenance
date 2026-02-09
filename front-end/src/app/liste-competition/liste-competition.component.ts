import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-liste-competition',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './liste-competition.component.html',
  styleUrl: './liste-competition.component.scss'
})
export class ListeCompetitionComponent implements OnInit {
  championshipId: number | null = null;
  competitions: any[] = [];
  
  // For adding new
  isAdding = false;
  newName = '';

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
      const id = params.get('championshipId');
      if (id) {
        this.championshipId = +id;
        this.loadCompetitions();
      }
    });
  }

  loadCompetitions() {
    if (!this.championshipId) return;
    this.http.get<any[]>(`/api/competition/championship/${this.championshipId}`).subscribe({
      next: (data) => {
        this.competitions = data;
      },
      error: (err) => console.error('Error loading competitions', err)
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
    if (!this.newName.trim() || !this.championshipId) return;
    
    // API: POST /api/competition/{name}/{championship}
    const url = `/api/competition/${this.newName}/${this.championshipId}`;
    this.http.post(url, {}).subscribe({
      next: () => {        alert('Compétition ajoutée avec succès');        this.loadCompetitions();
        this.cancelAdd();
      },
      error: (err) => console.error('Error creating competition', err)
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

    // API: PUT /api/competition/{id}/{newName}
    const url = `/api/competition/${item.id}/${this.editName}`;
    this.http.put(url, {}).subscribe({
      next: () => {
        this.loadCompetitions();
        this.editingId = null;
      },
      error: (err) => console.error('Error updating competition', err)
    });
  }

  // Expansion Logic
  toggleDetails(competition: any, event?: Event) {
    if (this.editingId !== null) return; // Don't toggle if editing title
    if (event) {
      // If clicking inside the expansion panel shouldn't close it, handle propagation carefully in HTML
    }
    
    // Toggle expanded state
    competition.expanded = !competition.expanded;
    
    // If expanding and events not yet loaded (or we want to refresh), load them
    if (competition.expanded) {
      this.loadEvents(competition);
    }
  }

  loadEvents(competition: any) {
    this.http.get<any[]>(`/api/event/competition/${competition.id}`).subscribe({
      next: (data) => {
        competition.events = data;
      },
      error: (err) => console.error('Error loading events', err)
    });
  }

  // Event Management inside Competition
  startAddEvent(competition: any, event: Event) {
    event.stopPropagation();
    competition.isAddingEvent = true;
    competition.newEventName = '';
  }

  cancelAddEvent(competition: any) {
    competition.isAddingEvent = false;
    competition.newEventName = '';
  }

  saveNewEvent(competition: any) {
    if (!competition.newEventName?.trim()) return;
    
    // API: POST /api/event/{name}/{competition}
    const url = `/api/event/${competition.newEventName}/${competition.id}`;
    this.http.post(url, {}).subscribe({
      next: () => {
        alert('Épreuve ajoutée avec succès');
        // Quick add: keep adding mode open or close? 
        // "ajouter une ou plusieurs épreuve" -> nicer to keep input or support multiple. 
        // Let's clear input and reload events.
        competition.newEventName = '';
        this.loadEvents(competition);
        // competition.isAddingEvent = false; // Uncomment to close after one add
      },
      error: (err) => console.error('Error creating event', err)
    });
  }

  // Edit Event
  startEditEvent(eventItem: any, event: Event) {
    event.stopPropagation();
    this.editingId = eventItem.id; // Global editingId can be reused if unique across all IDs or use a composite
    // Warning: editingId is number, IDs might collide between competition and event if generated sequentially global or table specific?
    // Usually table specific. Safer to use object reference or separate tracking.
    // Let's use a separate tracker "editingEventId"
  }
  
  editingEventId: number | null = null;
  editEventName = '';

  enableEditEvent(eventItem: any) {
    this.editingEventId = eventItem.id;
    this.editEventName = eventItem.name;
  }

  cancelEditEvent() {
    this.editingEventId = null;
    this.editEventName = '';
  }

  saveEditEvent(eventItem: any) {
    if (!this.editEventName.trim()) return;

    // API: PUT /api/event/{id}/{newName}
    const url = `/api/event/${eventItem.id}/${this.editEventName}`;
    this.http.put(url, {}).subscribe({
      next: () => {
        // Find parent competition to refresh? Or just update local object
        eventItem.name = this.editEventName;
        this.editingEventId = null;
      },
      error: (err) => console.error('Error updating event', err)
    });
  }
  
  deleteEvent(eventItem: any, competition: any) {
    if(!confirm('Supprimer cette épreuve ?')) return;
    
    // API: DELETE /api/event/{event}
    const url = `/api/event/${eventItem.id}`;
    this.http.delete(url).subscribe({
        next: () => {
            this.loadEvents(competition);
        },
        error: (err) => console.error('Error deleting event', err)
    });
  }
}
