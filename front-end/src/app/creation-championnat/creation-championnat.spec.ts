import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CreationChampionnatComponent } from './creation-championnat.component';

describe('CreationChampionnatComponent', () => {
  let component: CreationChampionnatComponent;
  let fixture: ComponentFixture<CreationChampionnatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreationChampionnatComponent, NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
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
