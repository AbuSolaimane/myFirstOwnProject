import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStoreService} from "../../services/data-store.service";
import {RecipeService} from "../../services/recipe.service";
import {AuthService} from "../../services/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userSub: Subscription = new Subscription();
  isAuthenticated: boolean = false;

  constructor(private dataStoreService: DataStoreService, private recipeService: RecipeService,
              private authService: AuthService) { }

  ngOnDestroy(): void {
        this.userSub.unsubscribe()
    }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
        this.isAuthenticated = !user ? false: true;
    });
  }

  onSaveData() {
    this.dataStoreService.addRecipes();
  }

  onFetchData() {
    this.dataStoreService.getAllRecipes().subscribe(data => {
      this.recipeService.updateRecipes(data);
    })
  }

  onLogout() {
    this.authService.logout();
  }
}
