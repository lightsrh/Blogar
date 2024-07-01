import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../../shared/services/post/post.service'; // Assurez-vous que ce chemin est correct
import { Post } from '../../interfaces/post'; // Assurez-vous que ce chemin est correct

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
  sujetId: string = '0';

  constructor(private postService: PostService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sujetId = params['id']; // Le signe + convertit la chaîne en nombre
      this.getPostsBySujetId(this.sujetId);
    });
  }

  getPostsBySujetId(id: string): void {
    this.postService.getPostsBySujetId(id).then(posts => {
      this.posts = posts;
    });
  }
}
