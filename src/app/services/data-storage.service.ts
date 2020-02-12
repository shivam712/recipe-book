import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../recipes/recipe.model';

import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipe = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-12345.firebaseio.com/recipes.json', recipe)
    .subscribe(
      (responseData) => {
        console.log(responseData);
      }
    )
  }

  fetchRecipes() {
    
    return this.http.get<Recipe []>('https://recipe-book-12345.firebaseio.com/recipes.json').pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        });
      }),
      tap (recipes => {
        this.recipeService.takeRecipes(recipes);
      })
    )
  }
}
