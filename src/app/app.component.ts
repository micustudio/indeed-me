import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Post } from './post.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup;
  posts: Post[] = [];
  retrieved: boolean = false;
  
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
        this.posts = [];
        this.retrieved = false;
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
        

      // Make the HTTP request:
      this.http.post('/api/posts', body, { headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
        // Read the result field from the JSON response.
        console.log(data['results']);

        //extract full post from each element
        data['results'].forEach( element => {

            console.log(element);
            console.log('hello');
            console.log(element.url);

            let elementUrl = {
              url: element.url
            }
            const elementBody = JSON.stringify(elementUrl);
            console.log(elementBody);
            this.http.post('/api/description', elementBody, { headers: new HttpHeaders().set('Content-Type', 'application/json')}).subscribe(data => {
              // Read the result field from the JSON response.
              let post = new Post(
                    element.city,
                    element.company,
                    element.jobtitle,
                    element.url,
                    data['description']
              );

              this.posts.push(post);
              console.log("the posts are...");
              
            });
            
      });

      console.log(this.posts);
      this.retrieved = true;
  });
}
}
