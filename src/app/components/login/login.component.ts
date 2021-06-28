import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { IAppState } from '../../store/state/app.state';
import { GetUser } from '../../store/actions/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    login: new FormControl('', Validators.required),
    password: new FormControl(''),
  });

  constructor(
    private router: Router,
    private store: Store<IAppState>,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    console.log('LoginComponent INIT');
    localStorage.removeItem('token');
    this.store.dispatch(new GetUser());
  }

  onSubmit(): void {
    this.http
      .post(
        `http://localhost:8080/login`,
        {
          login: this.loginForm.value.login,
          password: this.loginForm.value.password,
        },
        {
          responseType: 'json',
        }
      )
      .subscribe(
        (resp: any) => {
          console.log(resp);
          if (!resp.token) {
            alert(
              'Возможно, у вас не хватает прав на данную систему. Обратитесь к администратору.'
            );
            return;
          }
          localStorage.setItem('token', resp.token);
          this.router.navigateByUrl('/students').then((r) => console.log(r));
        },
        (err: HttpErrorResponse) => {
          if (err.status == 403) {
            alert('Неверный логин/пароль');
          } else {
            alert('Что-то пошло не так. Попробуйте еще раз');
          }
          console.error(err);
        }
      );

    console.log('submit');
  }
}
