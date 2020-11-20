import {Config} from '../../interfaces/config.interface';
import {CoreAction, CoreActions} from '../actions/core.actions';

export interface State {
  loading: boolean;
  error: string;
  configs: Config;
}

export const initialState: State = {
  loading: false,
  error: '',
  configs: null
};

export function coreReducer(state = initialState, action: CoreAction): State {
  switch (action.type) {
    case CoreActions.GetConfigs: {
      return {...state, loading: true};
    }
    case CoreActions.GetConfigsSuccess: {
      return {...state, loading: false, error: '', configs: action.payload};
    }
    case CoreActions.GetConfigsFail: {
      return {...state, loading: false, error: 'APP_CONFIG_FETCH_ERROR', configs: null};
    }
    default: {
      return state;
    }
  }
}

export const loading = (state: State) => state.loading;
export const error = (state: State) => state.error;
export const configs = (state: State) => state.configs;
export const core = (state: State) => state;
