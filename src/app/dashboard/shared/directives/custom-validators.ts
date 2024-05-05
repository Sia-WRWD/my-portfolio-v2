import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';

export class CustomValidators {
  static nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const nameRegex = /^[a-zA-Z\s]*$/; // Regex to match alphabets and spaces
      const isValid = nameRegex.test(control.value);
      return isValid ? null : { 'invalidName': true };
    };
  }

  static emailValidator(): ValidatorFn {
    return Validators.email;
  }

  static escapeStringValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbiddenChars = ['<', '>', '&', '"', '\''];
      const value = control.value as string;
      const hasForbiddenChars = forbiddenChars.some(char => value.includes(char));
      if (hasForbiddenChars) {
        return { invalidChars: true };
      }
      return null;
    };
  }
}
