import { Component } from '@angular/core';
import { PostService } from '../../shared/services/post/post.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service'; // Assurez-vous que le chemin est correct
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-createpost',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './createpost.component.html',
  styleUrls: ['./createpost.component.css']
})
export class CreatepostComponent {

  newPost = {
    title: '',
    content: '',
    id_sujet: '',
    author: ''
  };

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Récupérer l'ID du sujet depuis la route actuelle
    this.route.params.subscribe(params => {
      this.newPost.id_sujet = params['id'];
    });

    // Récupérer l'username de l'utilisateur actuel depuis AuthService
    this.authService.user$.subscribe(user => {
      if (user) {
        this.newPost.author = user.username;
      }
    });
  }

  onSubmit() {
    this.postService.createPost(this.newPost).then(() => {
      this.router.navigate(['/sujet']);
    }).catch(error => {
      console.error('Erreur lors de la création du sujet', error);
    });
  }

}
