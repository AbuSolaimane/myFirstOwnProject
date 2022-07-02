import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "../models/recipe.model";
import {Ingredient} from "../models/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged: Subject<void> = new Subject<void>();

  /*private recipes: Recipe[] = [
    new Recipe(
      "A Test Recipe",
      "Test",
      "https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg",
      [
        new Ingredient("meat", 1),
        new Ingredient("salt", 2)
      ]),
    new Recipe("Another Test Recipe",
      "Test",
      "https://www.simplyrecipes.com/thmb/mbN8mXZ0srgAT1YrDU61183t0uM=/648x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/Simply-Recipes-Homemade-Pizza-Dough-Lead-Shot-1b-ea13798d224048b3a28afb0936c9b645.jpg",
      [
        new Ingredient("bread", 1),
        new Ingredient("carry", 2)
      ])
  ];*/
  private recipes: Recipe[] = [];

  constructor() { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next();
  }


  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes.slice()[index];
  }

  updateRecipe(id: number, recipe: Recipe): void {
    this.recipes[id] = recipe;
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
  }

  updateRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next();
  }

}
