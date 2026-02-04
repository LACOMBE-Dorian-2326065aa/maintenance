import { Component, inject, OnInit } from '@angular/core';
import { FormArray, ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-creation-championnat',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule
  ],
  templateUrl: './creation-championnat.html',
  styleUrl: './creation-championnat.scss',
})
export class CreationChampionnat implements OnInit {
  private fb = inject(FormBuilder);
  
  championnatForm: FormGroup = this.fb.group({
    nom: ['', Validators.required],
    competitions: this.fb.array([], Validators.minLength(1))
  });

  ngOnInit() {
    this.addCompetition();
  }

  get competitions(): FormArray {
    return this.championnatForm.get('competitions') as FormArray;
  }

  addCompetition() {
    const competitionGroup = this.fb.group({
      nom: ['', Validators.required],
      epreuves: this.fb.array([], Validators.minLength(1))
    });
    this.competitions.push(competitionGroup);
    // Une compétition doit avoir au moins une épreuve
    this.addEpreuve(this.competitions.length - 1);
  }

  removeCompetition(index: number) {
    this.competitions.removeAt(index);
  }

  getEpreuves(competitionIndex: number): FormArray {
    return this.competitions.at(competitionIndex).get('epreuves') as FormArray;
  }

  addEpreuve(competitionIndex: number) {
    const epreuveGroup = this.fb.group({
      nom: ['', Validators.required],
      type: ['individuel', Validators.required] // individuel or equipe
    });
    this.getEpreuves(competitionIndex).push(epreuveGroup);
  }

  removeEpreuve(competitionIndex: number, epreuveIndex: number) {
    this.getEpreuves(competitionIndex).removeAt(epreuveIndex);
  }

  onSubmit() {
    if (this.championnatForm.valid) {
      console.log(this.championnatForm.value);
      // TODO: Envoyer au backend
    }
  }
}
