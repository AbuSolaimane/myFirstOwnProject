import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class.open') isOpen: boolean = false;

  constructor(private elementRef: ElementRef) { }

  @HostListener("click") onClick($event: Event) {
    this.isOpen = !this.isOpen;
  }

}
