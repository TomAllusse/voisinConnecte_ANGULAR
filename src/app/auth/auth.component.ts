import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent {

  loginObj: Login;
  msg: string = "";

  constructor(private http: HttpClient,private router: Router) {
    this.loginObj = new Login();
  }

  onLogin() {
    this.http.post('https://gsbrapport.allusse-tom.tech/gsbapi/?connexion', this.loginObj).subscribe((res:any)=>{
      if(res != null && res !== undefined && res.length !== 0) {
        this.msg = "Login Success";
        localStorage.setItem('angular17token', res[0]['hash']);
        setTimeout(
          () => {
            this.msg = "";
            this.router.navigate(['home']);
          }, 1000
        );


      } else {
        this.msg = "Connexion impossible ! Identifiant ou Password incorrect !";
        setTimeout(
          () => {
            this.msg = "";
          }, 2000
        );
      }
    })
  }
}

export class Login {
  login: string;
  password: string;
  constructor() {
    this.login = '';
    this.password = '';
  }
}
