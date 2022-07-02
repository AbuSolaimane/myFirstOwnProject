import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../../services/recipe.service";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipeForm: FormGroup = new FormGroup({});

  id: number = -1;
  editMode: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.id = +params["id"];
      this.editMode = params["id"] != null;
      this.initForm();
    })
  }

  initForm(): void {

    let name = "";
    let imagePath = "";
    let description = "";
    let ingredients = new FormArray([]);

    if(this.editMode) {
      let recipe= this.recipeService.getRecipe(this.id);

      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;

      let recipeIngredients = recipe.ingredients;
      if(recipeIngredients) {
        for(let recipeIngredient of recipeIngredients) {
          let newIngredient = new FormGroup({
            "name": new FormControl(recipeIngredient.name, Validators.required),
            "amount": new FormControl(recipeIngredient.amount, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")])
          });
          ingredients.push(newIngredient);
        }
      }

    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(name, Validators.required),
      "imagePath": new FormControl(imagePath, Validators.required),
      "description": new FormControl(description, Validators.required),
      "ingredients": ingredients
    })
  }

  getControls() {
    return (<FormArray>this.recipeForm.get("ingredients")).controls;
  }

  onSubmit() {
    const recipe = this.recipeForm.value;
    if(this.editMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    }
    else {
      this.recipeService.addRecipe(recipe);
    }

    this.recipeService.recipesChanged.next();
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get("ingredients")).push(new FormGroup({
      "name": new FormControl(null, Validators.required),
      "amount": new FormControl(null, [Validators.required, Validators.pattern("^[1-9]+[0-9]*$")])
    }))
  }

  onCancel() {
    this.router.navigate(["../"], {relativeTo: this.activatedRoute});
  }

  onDeleteIngredient(i: number) {
    (<FormArray>this.recipeForm.get("ingredients")).removeAt(i);
  }
}
