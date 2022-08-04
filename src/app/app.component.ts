import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

const PHONE_PATTERN = /^[6789]{1}[0-9]{9}$/;
const EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PINCODE_PATTERN = /\b\d{6}\b/;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  languages = [
    { label: 'english', default: true },
    { label: 'german', default: false },
    { label: 'french', default: false },
    { label: 'hindi', default: false }
  ];

  addressForm = this.fb.group({
    line1: ['', Validators.required],
    line2: ['', Validators.required],
    city: ['', Validators.required],
    pincode: ['', [Validators.pattern(PINCODE_PATTERN), Validators.required]]
  })

  profileForm = this.fb.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.pattern(EMAIL_PATTERN), Validators.required]],
    mobile: ['', [Validators.pattern(PHONE_PATTERN), Validators.required]],
    languages: this.fb.array(
      this.languages.map(x => x.default),
      { validators: this.atLeastOneLanguage }
    ),
    gender: ['', Validators.required],
    dob: ['', [Validators.required]],
    avatar: ['', Validators.required],
    address: this.addressForm,
    hobbies: this.fb.array(
      [this.fb.control('')],
      { validators: this.atLeastOneHobby }
    ),
    height: [180, Validators.required],
  });

  constructor(private fb: FormBuilder) { }

  get hobbies() {
    return this.profileForm.get('hobbies') as FormArray;
  }

  addHobby() {
    this.hobbies.push(this.fb.control(''));
  }

  removeHobby(index: number) {
    if (this.hobbies.length > 1) {
      this.hobbies.removeAt(index);
    }
  }

  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? { forbiddenName: { value: control.value } } : null;
    };
  }

  atLeastOneLanguage(control: AbstractControl): ValidationErrors | null {
    const atLeastOneSelected = (control as FormArray).controls.some(c => c.value);
    return atLeastOneSelected ? null : { 'atLeastOneError': true };
  }

  atLeastOneHobby(control: AbstractControl): ValidationErrors | null {
    const atLeastOne = (control as FormArray).controls.some(c => c.value != '');
    return atLeastOne ? null : { 'atLeastOneError': true };
  }

  formSubmit() {
    this.profileForm.markAllAsTouched();
    if (this.profileForm.invalid) {
      console.error('Invalid form');
      return;
    };

    console.log(this.profileForm.getRawValue());
  }
}
