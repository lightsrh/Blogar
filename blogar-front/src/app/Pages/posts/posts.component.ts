import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PostService } from '../../shared/services/post/post.service';
import { Post } from '../../interfaces/post';
import { SujetService } from '../../shared/services/sujet/sujets.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import PocketBase from 'pocketbase';
import { environment } from '../../../environments/environment';

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
  pocketBase: PocketBase;
  currentUserId: string | null = null;

  constructor(
    private postService: PostService, 
    private route: ActivatedRoute, 
    private router: Router, 
    private sujetService: SujetService, 
    public dialog: MatDialog
  ) {
    this.pocketBase = new PocketBase(environment.baseUrl);
    this.currentUserId = this.pocketBase.authStore.model?.['id'] ?? null;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.sujetId = params['id'];
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

  return() {
    this.router.navigate(['sujet']);
  }

  async editPost(event: Event, post: Post) {
    event.stopPropagation();
    this.router.navigate([`sujet/${this.sujetId}/editpost/${post.id}`]);
  }

  async deletePost(event: Event, post: Post) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    console.log('Deleting post:', post);

    dialogRef.afterClosed().subscribe(async result => {
      if (result === true) {
        try {
          await this.postService.deletePost(post.id.toString());
          this.posts = this.posts.filter(s => s.id !== post.id);
        } catch (error) {
          console.error('Erreur lors de la suppression du post:', error);
          // Afficher une notification d'erreur
        }
      }
    });
  }
}
