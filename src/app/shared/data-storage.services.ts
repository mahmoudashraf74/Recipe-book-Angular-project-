import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe-model';
import { RecipeService } from '../recipes/recipe.services';

@Injectable({ providedIn: 'root' })
export class DataStorageServices {
  constructor(
    private http: HttpClient,
    private recipeServices: RecipeService
  ) {}

  storeRecipes() {
    const recipes = this.recipeServices.getRecipes();
    this.http
      .put(
        'https://recipe-course-66963-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((Response) => {
        console.log(Response);
      });
  }
  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://recipe-course-66963-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : [],
            };
          });
        }),
        tap((recipes) => {
          this.recipeServices.setRecipes(recipes);
        })
      );
  }
}
