import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../../interfaces/post';
import { PostService } from '../../shared/services/post/post.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
export class UpdatepostComponent implements OnInit {
  newPost: Post = {
    id: '0',
    id_sujet: 0,
    title: '',
    content: '',
    created: new Date(),
    updated: new Date()

  };
  editMode = false;
  postId: string | null = null;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.postId = params['id'];
      if (this.postId) {
        this.editMode = true;
        this.postService.getPostById(this.postId).then(post => {
          if (post) {
            this.newPost = post;
          }
        });
      }
    });
  }

  onSubmit() {
      this.postService.updatePost(this.postId!, this.newPost).then(() => {
        this.router.navigate(['/post', this.newPost.id_sujet]);
      }).catch(error => {
        console.error('Error updating post:', error);
      });
  }
}
