import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {ShoppingService} from "../../../services/shopping.service";
import {RecipeService} from "../../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe = new Recipe("", "", "", []);
  id: number = -1;

  constructor(private shoppingService:ShoppingService, private recipeService: RecipeService,
              private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = Number(params["id"]);
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  addIngredientsToShoppingList() {
    this.recipe?.ingredients.forEach((ingredient) => {
      this.shoppingService.addIngredient(ingredient);
    });
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.recipeService.recipesChanged.next();
    this.router.navigate(["../"], {relativeTo: this.activatedRoute});
  }
}
