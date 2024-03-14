import { Component, inject, OnDestroy } from '@angular/core';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { debounceTime, Subscription } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { setTaskFilters } from '@task-manager/ng-tasks/store';

@Component({
  selector: 'task-list-sidebar',
  templateUrl: './task-list-sidebar.component.html',
  standalone: true,
  imports: [
    MatRadioGroup,
    MatRadioButton,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    MatButton,
  ],
})
export class TaskListSidebarComponent implements OnDestroy {
  private readonly store = inject(Store);
  private filterSubscription: Subscription;

  form = new FormGroup({
    done: new FormControl<boolean | undefined>(undefined, {
      nonNullable: true,
    }),
    label: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
  });

  constructor() {
    this.filterSubscription = this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe((value) => {
        this.store.dispatch(setTaskFilters({filters: value}));
      });
  }

  ngOnDestroy() {
    this.filterSubscription.unsubscribe();
  }
}
