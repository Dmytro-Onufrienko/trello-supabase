import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  linkSuccess: boolean = false;

  constructor(
    private auth: AuthService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) {
    this.email = '';
    this.password = '';
    this.auth.currentUser.subscribe((user) => {
      if (user) {
        this.router.navigateByUrl('/workspace', { replaceUrl: true });
      }
    });
  }

  ngOnInit(): void {}

  async signIn() {
    this.spinner.show()

    const result = await this.auth.signInWithEmail(this.email, this.password)

    this.spinner.hide()
    
    if (!result.error) {
      this.linkSuccess = true
    } else {
      alert(result.error.message)
    }
  }
}
