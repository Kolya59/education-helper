import { AfterViewInit, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { ClearUser, GetUser } from '../../store/actions/user.actions';
import { Observable, of } from 'rxjs';
import { IAppState } from '../../store/state/app.state';
import { selectCurrentUser } from '../../store/selectors/user.selectors';
import { IUser } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  allowed = {
    admin: [
      'Обучающиеся',
      'Программы обучающихся',
      'Запись на занятия',
      'Расписание',
      'Квитанции',
    ],
    director: [
      'Обучающиеся',
      'Преподаватели',
      'Программы обучения',
      'Квитанции',
    ],
  };

  constructor(private router: Router, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.dispatch(new GetUser());
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new GetUser());
  }

  isAvailable(action: string): Observable<boolean> {
    return this.store.pipe(
      select(selectCurrentUser),
      map((user: IUser | null): string => {
        return user ? user.role : '';
      }),
      map((role: string): boolean => {
        if (role == 'admin') {
          return this.allowed.admin.includes(action);
        }
        if (role == 'director') {
          return this.allowed.director.includes(action);
        }
        return false;
      })
    );
  }

  getUser(): Observable<IUser | null> {
    return this.store.pipe(select(selectCurrentUser));
  }

  isAuth(): Observable<boolean> {
    return this.getUser().pipe(
      map((user: IUser | null): boolean => {
        return user ? user.status : false;
      })
    );
  }

  getUserName(): Observable<string> {
    return this.getUser().pipe(
      map((user: IUser | null) => {
        return user ? user.name : '';
      })
    );
  }

  getUserRole(): Observable<string> {
    return this.getUser().pipe(
      map((user: IUser | null) => {
        return user ? user.role : '';
      })
    );
  }

  exit() {
    this.router.navigateByUrl('/login').then((r) => {
      this.store.dispatch(new ClearUser());
    });
  }
}
