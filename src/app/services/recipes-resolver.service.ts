import { Injectable } from '@angular/core';
import {DataStoreService} from "./data-store.service";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../models/recipe.model";
import {Observable} from "rxjs";
import {RecipeService} from "./recipe.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]>{

  constructor(private dataStoreService: DataStoreService, private recipesService: RecipeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {

    const recipes = this.recipesService.getRecipes();
    if(recipes.length === 0)  return this.dataStoreService.getAllRecipes();
    else return recipes;
  }


}
