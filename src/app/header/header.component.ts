import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) {}

  authenticty: boolean = false;
  authSub: Subscription;

  ngOnInit() {
    this.authSub = this.store.select('auth')
    .pipe(map(authState => authState.user))
    .subscribe((user) => {
      this.authenticty = !!user;
    })
  }
  
  onNav() {
    document.getElementById('nav').classList.toggle('collapse');
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
