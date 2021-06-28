import { AfterViewInit, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { GetUser } from '../../store/actions/user.actions';
import { Observable } from 'rxjs';
import { IAppState } from '../../store/state/app.state';
import { selectCurrentUser } from '../../store/selectors/user.selectors';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit, AfterViewInit {
  user$: Observable<IUser>;

  constructor(private router: Router, private store: Store<IAppState>) {
    this.user$ = store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUser());
  }

  ngAfterViewInit(): void {
    this.store.dispatch(new GetUser());
  }
}
