import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  MatOption,
  MatSelect,
  MatSelectModule,
} from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { TaskForm } from './task.form';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormField,
    MatSelectModule,
    MatInput,
    MatSelect,
    MatOption,
    MatButton,
    MatLabel,
  ],
  selector: 'tm-tasks-create',
  templateUrl: './create-task.form.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskForm {
  form = new FormGroup<TaskForm>({
    label: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100),
      ],
    }),
    done: new FormControl(false, { nonNullable: true }),
  });

  @Output() submit$ = new EventEmitter();

  submit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submit$.next(this.form.value);
    this.form.reset();
  }
}
