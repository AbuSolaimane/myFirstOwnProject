import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../../../models/recipe.model";
import {RecipeService} from "../../../../services/recipe.service";

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe | undefined;
  @Input() index: number = 1;

  constructor() { }

  ngOnInit(): void {
  }
}
