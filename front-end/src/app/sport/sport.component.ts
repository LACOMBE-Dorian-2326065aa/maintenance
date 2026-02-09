import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sport',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sport.component.html',
  styleUrl: './sport.component.scss'
})
export class SportComponent implements OnInit {
  sports: any[] = [];
  newSportName: string = '';
  newSportType: string = 'Individuel';
  
  sportTypes = ['Individuel', 'Collectif', 'Individuel en équipe'];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.loadSports();
  }

  loadSports() {
    this.http.get<any[]>('/api/sport').subscribe({
      next: (data) => {
        this.sports = data;
      },
      error: (err) => console.error('Error loading sports', err)
    });
  }

  addSport() {
    if (this.newSportName.trim() && this.newSportType) {
      // Backend expects POST /api/sport/{name}/{type}
      const url = `/api/sport/${this.newSportName}/${this.newSportType}`;
      
      this.http.post(url, {}).subscribe({
        next: () => {
          this.newSportName = '';
          this.loadSports(); // Reload list
        },
        error: (err) => console.error('Error adding sport', err)
      });
    }
  }

  goToChampionships(sportId: number) {
    this.router.navigate(['/sports', sportId, 'championnats']);
  }
}
