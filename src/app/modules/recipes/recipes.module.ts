import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipesComponent} from "../../components/recipes/recipes.component";
import {RecipeListComponent} from "../../components/recipes/recipe-list/recipe-list.component";
import {RecipeDetailComponent} from "../../components/recipes/recipe-detail/recipe-detail.component";
import {RecipeItemComponent} from "../../components/recipes/recipe-list/recipe-item/recipe-item.component";
import {NoSelectedRecipeComponent} from "../../components/recipes/no-selected-recipe/no-selected-recipe.component";
import {AddRecipeComponent} from "../../components/recipes/add-recipe/add-recipe.component";
import {AppRoutingModule} from "../../app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    NoSelectedRecipeComponent,
    AddRecipeComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  exports: [
    RecipesComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    NoSelectedRecipeComponent,
    AddRecipeComponent
  ]
})
export class RecipesModule { }
