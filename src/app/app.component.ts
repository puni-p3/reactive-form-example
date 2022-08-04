import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

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
    line1: ['',],
    line2: ['',],
    city: ['',],
    pincode: ['',]
  })

  profileForm = this.fb.group({
    fullName: ['',],
    email: ['',],
    mobile: ['',],
    languages: this.fb.array(
      this.languages.map(x => x.default),
    ),
    gender: ['',],
    dob: ['',],
    avatar: ['',],
    address: this.addressForm,
    hobbies: this.fb.array(
      [this.fb.control('')],
    ),
    height: [180,],
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

  formSubmit() {
    console.log(this.profileForm.getRawValue());
  }
}
