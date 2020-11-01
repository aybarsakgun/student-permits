import pubsub from '../../../../singletons/pubsub';
import {USER_CREATED, USER_DELETED, USER_UPDATED} from "../../../../constants/subscriptions";
import {UserCreate, UserDelete, UserUpdate} from "../../../../functions/modules/user/user.dao";

export const userCreateDef = `userCreate(user: UserInput!): User!`;

export async function userCreate(root, payload, context, info) {
  try {
    const userModel = await UserCreate(payload.user, context.user);
    pubsub.publish(USER_CREATED, {userModel});
    return userModel;
  } catch (err) {
    console.error('ERROR: [graphql/mutation] userCreate:', err);
    throw new Error(err);
  } finally {
    console.info('[graphql/mutation] userCreate');
  }
}

export const userUpdateDef = `userUpdate(user: UserInput!): User!`;

export async function userUpdate(root, payload, context, info) {
  try {
    const userModel = await UserUpdate(payload.user, context.user);
    pubsub.publish(USER_UPDATED, {userModel});
    return userModel;
  } catch (err) {
    console.error('ERROR: [graphql/mutation] userUpdate:', err);
    throw new Error(err);
  } finally {
    console.info('[graphql/mutation] userUpdate');
  }
}

export const userDeleteDef = `userDelete(user: ID!): User!`;

export async function userDelete(root, payload, context, info) {
  try {
    const userModel = await UserDelete(payload.user, context.user);
    pubsub.publish(USER_DELETED, {userModel});
    return userModel;
  } catch (err) {
    console.error('ERROR: [graphql/mutation] userDelete:', err);
    throw new Error(err);
  } finally {
    console.info('[graphql/mutation] userDelete');
  }
}
