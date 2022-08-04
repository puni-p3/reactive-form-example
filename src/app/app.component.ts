import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  today = new Date();

  languages = [
    { label: 'english', default: true },
    { label: 'german', default: false },
    { label: 'french', default: false },
    { label: 'hindi', default: false }
  ];

  constructor() { }


  addHobby() {

  }

  removeHobby(index: number) {
    
  }

  formSubmit() {

  }
}
