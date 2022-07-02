import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoSelectedRecipeComponent } from './no-selected-recipe.component';

describe('NoSelectedRecipeComponent', () => {
  let component: NoSelectedRecipeComponent;
  let fixture: ComponentFixture<NoSelectedRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoSelectedRecipeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoSelectedRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
