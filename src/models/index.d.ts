import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class RecommendCoffee {
  readonly id: string;
  readonly mbti?: string;
  readonly coffee?: string;
  readonly description?: string;
  readonly image?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<RecommendCoffee>);
  static copyOf(source: RecommendCoffee, mutator: (draft: MutableModel<RecommendCoffee>) => MutableModel<RecommendCoffee> | void): RecommendCoffee;
}

export declare class Result {
  readonly id: string;
  readonly result?: string;
  readonly simplified?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Result>);
  static copyOf(source: Result, mutator: (draft: MutableModel<Result>) => MutableModel<Result> | void): Result;
}

export declare class Question {
  readonly id: string;
  readonly question?: string;
  readonly questionNo?: number;
  readonly optionOne?: string;
  readonly optionTwo?: string;
  readonly oneType?: string;
  readonly twoType?: string;
  readonly onePoint?: number;
  readonly twoPoint?: number;
  readonly simplified?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Question>);
  static copyOf(source: Question, mutator: (draft: MutableModel<Question>) => MutableModel<Question> | void): Question;
}