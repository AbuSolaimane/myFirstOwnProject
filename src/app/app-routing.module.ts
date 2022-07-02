import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipesComponent} from "./components/recipes/recipes.component";
import {ShoppingListComponent} from "./components/shopping-list/shopping-list.component";
import {NoSelectedRecipeComponent} from "./components/recipes/no-selected-recipe/no-selected-recipe.component";
import {RecipeDetailComponent} from "./components/recipes/recipe-detail/recipe-detail.component";
import {AddRecipeComponent} from "./components/recipes/add-recipe/add-recipe.component";
import {RecipesResolverService} from "./services/recipes-resolver.service";
import {AuthComponent} from "./components/auth/auth.component";
import {AuthGuard} from "./shared/guards/auth.guard";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "/recipes",
    pathMatch: "full"
  },
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: NoSelectedRecipeComponent,
      },
      {
        path: "new",
        component: AddRecipeComponent
      },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ":id/edit",
        component: AddRecipeComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
  {
    path: "shopping-list",
    component: ShoppingListComponent
  },
  {
    path: "auth",
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
