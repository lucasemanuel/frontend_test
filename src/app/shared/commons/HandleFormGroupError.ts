import { FormGroup } from "@angular/forms";

export default class HandleFormGroupError
{
  static getFirstErrorForm(form: FormGroup) {
    Object.keys(form.controls).forEach((controlName) => {
      const control = form.controls[controlName];
      const error = Object.keys({ ...control.errors})[0];
      if (error) {
        return {field: controlName, error}
      }
      return null;
    });
  }
}
