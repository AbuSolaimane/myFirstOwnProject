import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "../../services/auth.service";
import {Observable, Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AlertComponent} from "../../shared/components/alert/alert.component";
import {PlaceHolderDirective} from "../../directives/place-holder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = "";
  authObs: Observable<AuthResponseData> = new Observable<AuthResponseData>();
  @ViewChild(PlaceHolderDirective, {static: false}) placeHolderDirective: PlaceHolderDirective | undefined;
  closeSubs: Subscription = new Subscription();

  constructor(private authService:AuthService, private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnDestroy(): void {
        if(this.closeSubs) {
          this.closeSubs.unsubscribe();
        }
    }

  ngOnInit(): void {
  }

  onSwitchMode(): void {

    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(f: NgForm) {
    const email = f.value.email;
    const password = f.value.password;

    this.isLoading = true;

    if(this.isLoginMode) {
      this.authObs = this.authService.login(email, password)
    }
    else {
      this.authObs = this.authService.signup(email, password);
    }

  this.authObs.subscribe(value => {
      console.log(value);
      this.isLoading = false;
      this.router.navigate(["/recipes"]);
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.onShowError(errorMessage);
      this.isLoading = false;
    });

    f.reset();
  }

  onCloseAlert() {
    this.error = "";
  }

  onShowError(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.placeHolderDirective?.viewContainerRef;
    hostViewContainerRef?.clear();
    const componentRef = hostViewContainerRef?.createComponent(alertComponentFactory);
    if(componentRef) {
      componentRef.instance.message = message;
      this.closeSubs = componentRef.instance.close.subscribe(() => {
        this.closeSubs.unsubscribe();
        hostViewContainerRef?.clear();
      })
    }

  }

}
