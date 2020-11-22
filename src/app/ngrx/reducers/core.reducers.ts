import {Config} from '../../interfaces/config.interface';
import {CoreAction, CoreActions} from '../actions/core.actions';
import {User} from '../../interfaces/user.interface';

export interface State {
  loading: boolean;
  errors: string[];
  config: Config;
  user: User;
  accessToken: string;
}

export const initialState: State = {
  loading: false,
  errors: [],
  config: null,
  user: null,
  accessToken: '',
};

export function coreReducer(state = initialState, action: CoreAction): State {
  switch (action.type) {
    case CoreActions.FetchCore: {
      return {
        ...state,
        loading: true
      };
    }
    case CoreActions.FetchingCoreSuccess: {
      return {
        ...state,
        loading: false,
        errors: [],
        config: action.payload.config,
        user: action.payload.user
      };
    }
    case CoreActions.FetchingCoreFail: {
      return {
        ...state,
        loading: false,
        errors: action.payload.errors,
        config: null,
        user: null
      };
    }
    case CoreActions.SetAccessToken: {
      return {
        ...state,
        accessToken: action.payload
      };
    }
    case CoreActions.Logout: {
      return {
        ...initialState
      };
    }
    default: {
      return state;
    }
  }
}

export const core = (state: State) => state;

export const loading = (state: State) => state.loading;
export const errors = (state: State) => state.errors;
export const config = (state: State) => state.config;
export const user = (state: State) => state.user;
export const accessToken = (state: State) => state.accessToken;
