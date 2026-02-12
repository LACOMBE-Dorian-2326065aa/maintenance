import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationChampionnatComponent } from './creation-championnat.component';

describe('CreationChampionnatComponent', () => {
  let component: CreationChampionnatComponent;
  let fixture: ComponentFixture<CreationChampionnatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationChampionnatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreationChampionnatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (expect(component) as any).toBeTruthy();
  });
});
