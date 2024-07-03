import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../../shared/services/post/post.service'; // Assurez-vous que ce chemin est correct
import { Post } from '../../interfaces/post'; // Assurez-vous que ce chemin est correct
import { SujetService } from '../../shared/services/sujet/sujets.service';

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
  sujetTitle: string | null = null;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, private sujetService: SujetService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sujetId = params['id']; // Le signe + convertit la chaîne en nombre
      this.getPostsBySujetId(this.sujetId);
    });
    this.sujetTitle = this.sujetService.getSujetTitle();
  }

  getPostsBySujetId(id: string): void {
    this.postService.getPostsBySujetId(id).then(posts => {
      this.posts = posts;
    });
  }

  createPost() {
    this.router.navigate([`sujet/${this.sujetId}/createpost`]); 
  }

  return(){
    this.router.navigate(['sujet']);
  }

  
}
