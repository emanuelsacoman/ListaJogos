import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { LogarPage } from './logar.page';

describe('LogarPage', () => {
  let component: LogarPage;
  let fixture: ComponentFixture<LogarPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LogarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});