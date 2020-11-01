import {ClassCreate, ClassDelete, ClassUpdate} from '../../../../functions/modules/class/class.dao';
import pubsub from '../../../../singletons/pubsub';
import {CLASS_CREATED, CLASS_DELETED, CLASS_UPDATED} from '../../../../constants/subscriptions';

export const classCreateDef = `classCreate(class: ClassInput!): Class!`;

export async function classCreate(root, payload, {user}, info) {
  try {
    const classModel = await ClassCreate(payload.class, user);
    pubsub.publish(CLASS_CREATED, {classModel});
    return classModel;
  } catch (err) {
    console.error('ERROR: [graphql/mutation] classCreate:', err);
    throw new Error(err);
  } finally {
    console.info('[graphql/mutation] classCreate');
  }
}

export const classUpdateDef = `classUpdate(class: ClassInput!): Class!`;

export async function classUpdate(root, payload, {user}, info) {
  try {
    const classModel = await ClassUpdate(payload.class, user);
    pubsub.publish(CLASS_UPDATED, {classModel});
    return classModel;
  } catch (err) {
    console.error('ERROR: [graphql/mutation] classUpdate:', err);
    throw new Error(err);
  } finally {
    console.info('[graphql/mutation] classUpdate');
  }
}

export const classDeleteDef = `classDelete(class: ID!): Class!`;

export async function classDelete(root, payload, {user}, info) {
  try {
    const classModel = await ClassDelete(payload.class, user);
    pubsub.publish(CLASS_DELETED, {classModel});
    return classModel;
  } catch (err) {
    console.error('ERROR: [graphql/mutation] classDelete:', err);
    throw new Error(err);
  } finally {
    console.info('[graphql/mutation] classDelete');
  }
}
