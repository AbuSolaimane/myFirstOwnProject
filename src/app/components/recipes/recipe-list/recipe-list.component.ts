import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "../../../models/recipe.model";
import {RecipeService} from "../../../services/recipe.service";
import {Subscription} from "rxjs";
import {DataStoreService} from "../../../services/data-store.service";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  recipes: Recipe[] = [];
  subscription: Subscription = new Subscription();

  constructor(private recipeService: RecipeService, private dataStoreService: DataStoreService) { }

  ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.subscription = this.recipeService.recipesChanged.subscribe(() => {
      this.recipes = this.recipeService.getRecipes();
    });

    this.dataStoreService.getAllRecipes().subscribe(data => {
      this.recipeService.setRecipes(data);
    })

  }

}
