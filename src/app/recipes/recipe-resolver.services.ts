import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { DataStorageServices } from '../shared/data-storage.services';
import { Recipe } from './recipe-model';
import { RecipeService } from './recipe.services';

@Injectable({ providedIn: 'root' })
export class RecipesResolverServices implements Resolve<Recipe[]> {
  constructor(
    private dataStorageServices: DataStorageServices,
    private recipesServices: RecipeService
  ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesServices.getRecipes();
    if (recipes.length === 0) {
      return this.dataStorageServices.fetchRecipes();
    } else {
      return recipes;
    }
    return this.dataStorageServices.fetchRecipes();
  }
}
