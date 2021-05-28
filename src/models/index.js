// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { RecommendCoffee, Result, Question } = initSchema(schema);

export {
  RecommendCoffee,
  Result,
  Question
};