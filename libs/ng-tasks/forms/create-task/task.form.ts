import { FormControl } from '@angular/forms';

export interface TaskForm {
  label: FormControl<string>;
  done: FormControl<boolean>;
}
