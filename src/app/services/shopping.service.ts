import { Injectable } from '@angular/core';
import {Ingredient} from "../models/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  startEditing: Subject<number> = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("apples", 5),
    new Ingredient("oranges", 7)
  ];

  constructor() { }

  getIngredients(): Ingredient[] {

    return this.ingredients;
  }

  getIngredient(index: number): Ingredient {

    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  updateIngredient(itemEditIndex: number, ingredient: Ingredient) {
    this.ingredients[itemEditIndex] = ingredient;
  }

  delete(itemEditIndex: number) {
    this.ingredients.splice(itemEditIndex, 1);
  }
}
