import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationChampionnat } from './creation-championnat';

describe('CreationChampionnat', () => {
  let component: CreationChampionnat;
  let fixture: ComponentFixture<CreationChampionnat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationChampionnat]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationChampionnat);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
