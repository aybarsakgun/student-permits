import {User} from '../../interfaces/user.interface';
import {AuthAction, AuthActions} from '../actions/auth.actions';

export interface State {
  loading: boolean;
  user: User;
}

export const initialState: State = {
  loading: false,
  user: null,
};

export function appReducer(state = initialState, action: AuthAction): State {
  switch (action.type) {
    case AuthActions.GetUser: {
      return {...state, loading: true};
    }
    case AuthActions.GetUserFail: {
      return {...state, user: null, loading: false};
    }
    case AuthActions.CurrentUser: {
      return {...state, user: action.payload, loading: false};
    }
    default: {
      return state;
    }
  }
}

export const user = (state: State) => state.user;
export const loading = (state: State) => state.loading;
