import { AbstractControl } from '@angular/forms';

export function matchPassword(control: AbstractControl) {
  const passwordConfirm = control.get('passwordConfirm')?.value;
  const password = control.get('password')?.value;

  if (!password || !passwordConfirm || password !== passwordConfirm) {
    return { passwordMatchError: true };
  }
  return null;
}
