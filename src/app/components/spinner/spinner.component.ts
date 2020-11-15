import {Component, Inject, Input, OnDestroy, ViewEncapsulation} from '@angular/core';
import {spinnerTypes} from './spinner-types';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {DOCUMENT} from '@angular/common';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: [
    './spinner.component.scss',
    './spinner-types/sk-line-material.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class SpinnerComponent implements OnDestroy {
  public isSpinnerVisible = true;
  public spinnerTypes = spinnerTypes;
  private routerEvents$: Subscription = null;
  @Input() public backgroundColor = '#2196f3';
  @Input() public spinner = spinnerTypes.skLine;

  constructor(
    private router: Router,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.routerEvents$ = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.isSpinnerVisible = true;
      } else if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
        this.isSpinnerVisible = false;
      }
    }, () => {
      this.isSpinnerVisible = false;
    });
  }

  ngOnDestroy(): void {
    this.isSpinnerVisible = false;
    this.routerEvents$.unsubscribe();
  }
}
