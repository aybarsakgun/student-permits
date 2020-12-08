import {LayoutAction, LayoutActions} from '../actions/layout.actions';

export interface State {
  navigationBarCollapsed: boolean;
  mobileNavigationBarCollapsed: boolean;
  mobileHeaderBarCollapsed: boolean;
}

export const initialState: State = {
  navigationBarCollapsed: false,
  mobileNavigationBarCollapsed: false,
  mobileHeaderBarCollapsed: true
};

export function layoutReducer(state = initialState, action: LayoutAction): State {
  switch (action.type) {
    case LayoutActions.NavigationBarToggle: {
      return {
        ...state,
        navigationBarCollapsed: action.payload != null ? action.payload : !state.navigationBarCollapsed
      };
    }
    case LayoutActions.MobileNavigationBarToggle: {
      return {
        ...state,
        mobileNavigationBarCollapsed: action.payload != null ? action.payload : !state.mobileNavigationBarCollapsed
      };
    }
    case LayoutActions.MobileHeaderBarToggle: {
      return {
        ...state,
        mobileHeaderBarCollapsed: action.payload != null ? action.payload : !state.mobileHeaderBarCollapsed
      };
    }
    default: {
      return state;
    }
  }
}

export const layout = (state: State) => state;
