import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
@Input() posts: Post[];

  constructor() { }

  ngOnInit() {
  }

  getBackgroundStyle(index){
    if(index % 2 == 1)
      return {'background-color': '#F2F2F2'};
    else
      return null;
  }


}
