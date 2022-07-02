import {Ingredient} from "../../models/ingredient.model";
import {Action} from "@ngrx/store";

const initialState = {
  ingredients: [],

};


export function ShoppingListReducer(state = initialState, action: Action) {

  switch (action.type) {
    case "ADD_INGREDIENT":
      return {...state, ingredients: [...state.ingredients, ]}
  }
}
