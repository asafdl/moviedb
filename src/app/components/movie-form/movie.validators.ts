import { AbstractControl, ValidationErrors } from '@angular/forms';

export class FormValidation {

  static cannotContainLetters(control: AbstractControl) : ValidationErrors | null {
    let reg = /^[1-2][0-9]{3}$/;
    if (control.value && !(control.value as string).match(reg))
      return { cannotContainLetters: true }

    return null;
  }

  static validRuntime(control: AbstractControl) : ValidationErrors | null {
    let reg = /^[0-9]{1,} min$/;
    if (control.value && !(control.value as string).match(reg))
      return { notValidRuntime: true }

    return null;
  }

  static onlyLetters(control: AbstractControl) : ValidationErrors | null {
    let reg = /^[a-zA-Z,\s]*$/
    if (control.value && !(control.value as string).match(reg))
      return { containsNotLetters: true }

    return null;
  }
}

