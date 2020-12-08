import {Action} from '@ngrx/store';

export enum LayoutActions {
  NavigationBarToggle = '[Layout] NavigationBarToggle',
  MobileNavigationBarToggle = '[Layout] MobileNavigationBarToggle',
  MobileHeaderBarToggle = '[Layout] MobileHeaderBarToggle'
}

export class NavigationBarToggle implements Action {
  readonly type = LayoutActions.NavigationBarToggle;

  constructor(public payload?: boolean) {
  }
}

export class MobileNavigationBarToggle implements Action {
  readonly type = LayoutActions.MobileNavigationBarToggle;

  constructor(public payload?: boolean) {
  }
}

export class MobileHeaderBarToggle implements Action {
  readonly type = LayoutActions.MobileHeaderBarToggle;

  constructor(public payload?: boolean) {
  }
}

export type LayoutAction = NavigationBarToggle | MobileNavigationBarToggle | MobileHeaderBarToggle;
