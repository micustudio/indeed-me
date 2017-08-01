import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Headers } from '@angular/http';

import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  results = {};

    // Inject HttpClient into your component or service.
  constructor(private http: HttpClient) {}
 
  ngOnInit(): void {
          this.myForm = new FormGroup({
            query: new FormControl(null, Validators.required),
            location: new FormControl(null, Validators.required),
            sort: new FormControl(null, Validators.required),
            radius: new FormControl(null, Validators.required),
            limit: new FormControl(null, Validators.required),
            sitetype: new FormControl(null, Validators.required)

        })

        this.myForm.patchValue({
          query: 'fullstack web developer',
          location: 'San Francisco, CA',
          sort: 'date',
          radius: '25',
          limit: '20',
          sitetype: 'jobsite'
      });

  }

  getIndeedData() {
        let inputtedData = {
            query: this.myForm.value.query,
            location: this.myForm.value.location,
            sort: this.myForm.value.sort,
            radius: this.myForm.value.radius,
            limit: this.myForm.value.limit,
            sitetype: this.myForm.value.sitetype
        }

        console.log(inputtedData);

        const body = JSON.stringify(inputtedData);
        console.log(body);

        const headers = new Headers({'Content-Type': 'application/json'});
        

      // Make the HTTP request:
      this.http.post('/api/posts', body).subscribe(data => {
        // Read the result field from the JSON response.
        console.log(data);
        this.results = data;
        console.log(this.results);
      });

  }
}

