import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Recipe} from "../models/recipe.model";
import {Observable, Subject} from "rxjs";
import {RecipeService} from "./recipe.service";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStoreService {

  fetchingDataClicked: Subject<Recipe[]> = new Subject<Recipe[]>();

  url: string = "https://ng-recipe-book-6a1df-default-rtdb.firebaseio.com/recipes.json";

  constructor(private httpClient: HttpClient, private recipeService: RecipeService,
              private authService: AuthService) { }

  addRecipes(): void {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put(this.url, recipes).subscribe(response => {
      console.log(response);
    })
  }

  getAllRecipes(): Observable<Recipe[]> {
      return this.httpClient.get<Recipe[]>(this.url, { observe: "body"}).pipe(map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients: []};
      });
    }), tap(recipes => {
      this.recipeService.updateRecipes(recipes);
    }));
  }

  addRecipe(recipe: Recipe): Observable<{ name: string }> {
    return this.httpClient.post<{ name: string }>(this.url, recipe, { observe: "body" });
  }

}
