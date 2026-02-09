import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-liste-championnat',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './liste-championnat.component.html',
  styleUrl: './liste-championnat.component.scss'
})
export class ListeChampionnatComponent implements OnInit {
  sportId: number | null = null;
  championships: any[] = [];

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
        this.loadChampionships(this.sportId);
      }
    });
  }

  loadChampionships(sportId: number) {
    this.http.get<any[]>(`/api/championnat/sport/${sportId}`).subscribe({
      next: (data) => {
        this.championships = data;
      },
      error: (err) => console.error('Error loading championships', err)
    });
  }

  goToCreateChampionship() {
    this.router.navigate(['/creation-championnat'], { queryParams: { sportId: this.sportId } });
  }
}
