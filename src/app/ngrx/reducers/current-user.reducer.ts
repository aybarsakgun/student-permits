import {Actions, SET_CURRENT_USER, CLEAR_CURRENT_USER} from '../actions/current-user.actions';
import {User} from '../../interfaces/user.interface';

/**
 * @param state (User)
 * @param action (Actions)
 * @returns User
 */
export function currentUser(state: User = null, action: Actions): User {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.payload as User;
    case CLEAR_CURRENT_USER:
      return null;
    default:
      return state;
  }
}
