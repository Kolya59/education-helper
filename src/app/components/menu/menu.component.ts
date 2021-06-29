import { AfterViewInit, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { GetUser } from '../../store/actions/user.actions';
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
  user$: Observable<IUser>;
  allowed = {
    admin: [
      'Обущающиеся',
      'Программы обучающихся',
      'Запись на занятия',
      'Расписание',
      'Квитанции',
    ],
    director: [
      'Обущающиеся',
      'Преподаватели',
      'Программы обучения',
      'Квитанции',
    ],
  };

  constructor(private router: Router, private store: Store<IAppState>) {
    this.user$ = store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUser());
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new GetUser());
  }

  isAvailable(action: string): Observable<boolean> {
    return this.store.pipe(
      select(selectCurrentUser),
      map((user: IUser): string => {
        return user.role;
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
}
