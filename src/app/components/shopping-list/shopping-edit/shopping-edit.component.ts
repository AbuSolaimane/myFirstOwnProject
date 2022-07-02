import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../../models/ingredient.model";
import {ShoppingService} from "../../../services/shopping.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild("f") theForm: NgForm | undefined;
  subscription: Subscription = new Subscription();
  editMode: boolean = false;
  itemEditIndex: number = -1;

  constructor(private shoppingService: ShoppingService) { }

  ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startEditing.subscribe(index => {
      this.editMode = true;
      this.itemEditIndex = index;
      const ingredient = this.shoppingService.getIngredient(index);
      this.theForm?.setValue({
        name: ingredient.name,
        amount: ingredient.amount
      })
    });
  }

  onAddItem(f: NgForm) {
    const value = f.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if(this.editMode) {
      this.shoppingService.updateIngredient(this.itemEditIndex, ingredient);
    } else {
      this.shoppingService.addIngredient(ingredient);
    }
    this.theForm?.reset();
    this.editMode = false;
  }

  onClear() {
    this.theForm?.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingService.delete(this.itemEditIndex);
    this.onClear();
  }
}
