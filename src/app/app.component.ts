import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
      // Make the HTTP request:
    this.http.get('/api/posts').subscribe(data => {
      // Read the result field from the JSON response.
      this.results = data;
      console.log(this.results);
    });

  }
}


// http://api.indeed.com/ads/apisearch?publisher=8280467879034728&q=java&format=json&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2