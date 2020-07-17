import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getTodo: Todo;
  getWcifById: Wcif;
  getMyUpcomingCompetitions: Array<Wcif>;
  getWcifByCompetitionId: Maybe<Wcif>;
  getOpenRounds: Round;
  getAllWcifs: Array<Wcif>;
  getTopCompetitors: Array<Person>;
  getUser: Maybe<User>;
  /** Returns the current logged in User. If no user is logged in, returns Null */
  getMe: Maybe<User>;
  findMyManagableCompetitions: Array<WcifFetch>;
};


export type QueryGetTodoArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetWcifByIdArgs = {
  _id: Scalars['ObjectId'];
};


export type QueryGetWcifByCompetitionIdArgs = {
  competitionId: Scalars['String'];
};


export type QueryGetOpenRoundsArgs = {
  competitionId: Scalars['String'];
};


export type QueryGetTopCompetitorsArgs = {
  top: Scalars['Float'];
  competitionId: Scalars['String'];
};


export type QueryGetUserArgs = {
  id: Scalars['ObjectId'];
};

export type Todo = {
  __typename?: 'Todo';
  _id: Scalars['ObjectId'];
  createdAt: Maybe<Scalars['DateTime']>;
  updatedAt: Scalars['DateTime'];
  content: Scalars['String'];
  isDone: Scalars['Boolean'];
};



export type Wcif = {
  __typename?: 'Wcif';
  _id: Scalars['ObjectId'];
  competitionId: Scalars['String'];
  name: Scalars['String'];
  shortName: Scalars['String'];
  persons: Array<Person>;
  events: Array<Event>;
  schedule: Schedule;
  competitorLimit: Scalars['Int'];
  extensions: Array<Extension>;
  locationName: Scalars['String'];
  registrationOpen: Scalars['String'];
  registrationClose: Scalars['String'];
  settings: Setting;
};

export type Person = {
  __typename?: 'Person';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  wcaUserId: Scalars['Int'];
  wcaId: Maybe<Scalars['String']>;
  registrationId: Scalars['Int'];
  countryIso2: Scalars['String'];
  gender: Scalars['String'];
  birthdate: Maybe<Scalars['String']>;
  email: Maybe<Scalars['String']>;
  registration: Registration;
  avatar: Avatar;
  roles: Array<Scalars['String']>;
  assignments: Array<Assignment>;
  personalBests: Array<PersonalBest>;
};

export type Registration = {
  __typename?: 'Registration';
  _id: Scalars['ObjectId'];
  eventIds: Array<Scalars['String']>;
  status: Scalars['String'];
  comments: Scalars['String'];
  wcaRegistrationId: Scalars['Int'];
  guests: Scalars['Int'];
};

export type Avatar = {
  __typename?: 'Avatar';
  _id: Scalars['ObjectId'];
  url: Scalars['String'];
  thumbUrl: Scalars['String'];
};

export type Assignment = {
  __typename?: 'Assignment';
  _id: Scalars['ObjectId'];
  assignmentCode: Scalars['String'];
  activityId: Array<Scalars['Int']>;
  stationNumber: Array<Scalars['Int']>;
};

export type PersonalBest = {
  __typename?: 'PersonalBest';
  _id: Scalars['ObjectId'];
  eventId: Scalars['String'];
  best: Scalars['Int'];
  worldRanking: Scalars['Int'];
  continentalRanking: Scalars['Int'];
  nationalRanking: Scalars['Int'];
  type: Scalars['String'];
};

export type Event = {
  __typename?: 'Event';
  _id: Scalars['ObjectId'];
  rounds: Array<Round>;
  extensions: Array<Extension>;
  competitorLimit: Scalars['Int'];
  qualification: Qualification;
};

export type Round = {
  __typename?: 'Round';
  _id: Scalars['ObjectId'];
  id: Scalars['String'];
  format: Scalars['String'];
  timeLimit: Array<TimeLimit>;
  cutoff: Cutoff;
  advancementCondition: AdvancementCondition;
  scrambleSetCount: Scalars['Int'];
  scrambleSets: Array<ScrambleSet>;
  results: Array<Result>;
  extensions: Array<Extension>;
};

export type TimeLimit = {
  __typename?: 'TimeLimit';
  _id: Scalars['ObjectId'];
  centiseconds: Scalars['Int'];
  cumulativeRoundIds: Array<Scalars['String']>;
};

export type Cutoff = {
  __typename?: 'Cutoff';
  _id: Scalars['ObjectId'];
  numberOfAttempts: Scalars['Int'];
  attemptResult: Array<Scalars['Int']>;
};

export type AdvancementCondition = {
  __typename?: 'AdvancementCondition';
  _id: Scalars['ObjectId'];
  type: Scalars['String'];
  level: Array<Scalars['Int']>;
};

export type ScrambleSet = {
  __typename?: 'ScrambleSet';
  _id: Scalars['ObjectId'];
  id: Scalars['String'];
  scrambles: Array<Scalars['String']>;
  extraScrambles: Array<Scalars['String']>;
};

export type Result = {
  __typename?: 'Result';
  _id: Scalars['ObjectId'];
  personId: Scalars['String'];
  ranking: Scalars['Int'];
  best: Scalars['Int'];
  average: Scalars['Int'];
  attempts: Array<Attempt>;
};

export type Attempt = {
  __typename?: 'Attempt';
  _id: Scalars['ObjectId'];
  result: Scalars['Int'];
  reconstruction: Scalars['String'];
};

export type Extension = {
  __typename?: 'Extension';
  _id: Scalars['ObjectId'];
  id: Scalars['String'];
  specUrl: Scalars['String'];
  data: Scalars['String'];
};

export type Qualification = {
  __typename?: 'Qualification';
  _id: Scalars['ObjectId'];
  when: Scalars['String'];
  type: Scalars['String'];
  attemptResult: Array<Scalars['Int']>;
};

export type Schedule = {
  __typename?: 'Schedule';
  _id: Scalars['ObjectId'];
  startDate: Scalars['String'];
  numberOfDays: Scalars['Int'];
  venues: Array<Venue>;
};

export type Venue = {
  __typename?: 'Venue';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  countryIso2: Scalars['String'];
  timezone: Scalars['String'];
  id: Scalars['Int'];
  latitudeMicrodegrees: Scalars['Int'];
  longitudeMicrodegrees: Scalars['Int'];
  rooms: Array<Room>;
  extension: Array<Extension>;
};

export type Room = {
  __typename?: 'Room';
  _id: Scalars['ObjectId'];
  id: Scalars['Int'];
  name: Scalars['String'];
  color: Scalars['String'];
  activities: Array<Activtiy>;
  extensions: Array<Extension>;
};

export type Activtiy = {
  __typename?: 'Activtiy';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  activityCode: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  scrambleSetId: Scalars['Int'];
  id: Scalars['Int'];
  childActivities: Array<ChildActivity>;
  extensions: Array<Extension>;
};

export type ChildActivity = {
  __typename?: 'ChildActivity';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  activityCode: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  scrambleSetId: Scalars['Int'];
  id: Scalars['Int'];
  extensions: Array<Extension>;
};

export type Setting = {
  __typename?: 'Setting';
  _id: Scalars['ObjectId'];
  imageUrl: Scalars['String'];
  message: Scalars['String'];
  colorTheme: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  username: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  primaryAuthenticationType: Scalars['String'];
  competitions: Array<Competition>;
  connections: Array<ExternalConnection>;
};

export type Competition = {
  __typename?: 'Competition';
  competitionId: Scalars['String'];
  competitionType: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  roles: Array<Scalars['String']>;
};

export type ExternalConnection = {
  __typename?: 'ExternalConnection';
  connectionType: Scalars['String'];
  accessToken: Scalars['String'];
  content: Scalars['String'];
};

export type WcifFetch = {
  __typename?: 'WcifFetch';
  name: Scalars['String'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
  id: Scalars['String'];
  country_iso2: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTodo: Todo;
  createWcif: Wcif;
  deleteWcif: Wcif;
  updateWcifInfo: Wcif;
  updateWcifSchedule: Wcif;
  updateWcifCompetitors: Wcif;
  updateWcifEvents: Wcif;
  updateWcifSettings: Wcif;
  /** Clears the database. Only works in development when server is running locally. */
  clearDatabase: Scalars['Boolean'];
  updateUser: Maybe<User>;
};


export type MutationCreateTodoArgs = {
  createTodoData: NewTodoInput;
};


export type MutationCreateWcifArgs = {
  competitionId: Scalars['String'];
};


export type MutationDeleteWcifArgs = {
  competitionId: Scalars['String'];
};


export type MutationUpdateWcifInfoArgs = {
  newCompetitorLimit: Scalars['Float'];
  newShortName: Scalars['String'];
  newName: Scalars['String'];
  competitionId: Scalars['String'];
};


export type MutationUpdateWcifScheduleArgs = {
  schedule: ScheduleInput;
  competitionId: Scalars['String'];
};


export type MutationUpdateWcifSettingsArgs = {
  settings: SettingInput;
  competitionId: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type NewTodoInput = {
  content: Scalars['String'];
};

export type ScheduleInput = {
  _id: Scalars['ObjectId'];
  startDate: Scalars['String'];
  numberOfDays: Scalars['Int'];
  venues: Array<VenueInput>;
};

export type VenueInput = {
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  countryIso2: Scalars['String'];
  timezone: Scalars['String'];
  id: Scalars['Int'];
  latitudeMicrodegrees: Scalars['Int'];
  longitudeMicrodegrees: Scalars['Int'];
  rooms: Array<RoomInput>;
  extension: Array<ExtensionInput>;
};

export type RoomInput = {
  _id: Scalars['ObjectId'];
  id: Scalars['Int'];
  name: Scalars['String'];
  color: Scalars['String'];
  activities: Array<ActivityInput>;
  extensions: Array<ExtensionInput>;
};

export type ActivityInput = {
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  activityCode: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  scrambleSetId: Scalars['Int'];
  id: Scalars['Int'];
  childActivities: Array<ChildActivityInput>;
  extensions: Array<ExtensionInput>;
};

export type ChildActivityInput = {
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  activityCode: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  scrambleSetId: Scalars['Int'];
  id: Scalars['Int'];
  extensions: Array<ExtensionInput>;
};

export type ExtensionInput = {
  _id: Scalars['ObjectId'];
  id: Scalars['String'];
  specUrl: Scalars['String'];
  data: Scalars['String'];
};

export type SettingInput = {
  _id: Scalars['ObjectId'];
  imageUrl: Scalars['String'];
  message: Scalars['String'];
  colorTheme: Scalars['String'];
};

export type UpdateUserInput = {
  _id: Scalars['ObjectId'];
  newName: Scalars['String'];
  newEmail: Scalars['String'];
  newUsername: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Query: ResolverTypeWrapper<{}>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Todo: ResolverTypeWrapper<Todo>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Wcif: ResolverTypeWrapper<Wcif>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Person: ResolverTypeWrapper<Person>;
  Registration: ResolverTypeWrapper<Registration>;
  Avatar: ResolverTypeWrapper<Avatar>;
  Assignment: ResolverTypeWrapper<Assignment>;
  PersonalBest: ResolverTypeWrapper<PersonalBest>;
  Event: ResolverTypeWrapper<Event>;
  Round: ResolverTypeWrapper<Round>;
  TimeLimit: ResolverTypeWrapper<TimeLimit>;
  Cutoff: ResolverTypeWrapper<Cutoff>;
  AdvancementCondition: ResolverTypeWrapper<AdvancementCondition>;
  ScrambleSet: ResolverTypeWrapper<ScrambleSet>;
  Result: ResolverTypeWrapper<Result>;
  Attempt: ResolverTypeWrapper<Attempt>;
  Extension: ResolverTypeWrapper<Extension>;
  Qualification: ResolverTypeWrapper<Qualification>;
  Schedule: ResolverTypeWrapper<Schedule>;
  Venue: ResolverTypeWrapper<Venue>;
  Room: ResolverTypeWrapper<Room>;
  Activtiy: ResolverTypeWrapper<Activtiy>;
  ChildActivity: ResolverTypeWrapper<ChildActivity>;
  Setting: ResolverTypeWrapper<Setting>;
  User: ResolverTypeWrapper<User>;
  Competition: ResolverTypeWrapper<Competition>;
  ExternalConnection: ResolverTypeWrapper<ExternalConnection>;
  WcifFetch: ResolverTypeWrapper<WcifFetch>;
  Mutation: ResolverTypeWrapper<{}>;
  NewTodoInput: NewTodoInput;
  ScheduleInput: ScheduleInput;
  VenueInput: VenueInput;
  RoomInput: RoomInput;
  ActivityInput: ActivityInput;
  ChildActivityInput: ChildActivityInput;
  ExtensionInput: ExtensionInput;
  SettingInput: SettingInput;
  UpdateUserInput: UpdateUserInput;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Query: {};
  Float: Scalars['Float'];
  Todo: Todo;
  ObjectId: Scalars['ObjectId'];
  DateTime: Scalars['DateTime'];
  Wcif: Wcif;
  Int: Scalars['Int'];
  Person: Person;
  Registration: Registration;
  Avatar: Avatar;
  Assignment: Assignment;
  PersonalBest: PersonalBest;
  Event: Event;
  Round: Round;
  TimeLimit: TimeLimit;
  Cutoff: Cutoff;
  AdvancementCondition: AdvancementCondition;
  ScrambleSet: ScrambleSet;
  Result: Result;
  Attempt: Attempt;
  Extension: Extension;
  Qualification: Qualification;
  Schedule: Schedule;
  Venue: Venue;
  Room: Room;
  Activtiy: Activtiy;
  ChildActivity: ChildActivity;
  Setting: Setting;
  User: User;
  Competition: Competition;
  ExternalConnection: ExternalConnection;
  WcifFetch: WcifFetch;
  Mutation: {};
  NewTodoInput: NewTodoInput;
  ScheduleInput: ScheduleInput;
  VenueInput: VenueInput;
  RoomInput: RoomInput;
  ActivityInput: ActivityInput;
  ChildActivityInput: ChildActivityInput;
  ExtensionInput: ExtensionInput;
  SettingInput: SettingInput;
  UpdateUserInput: UpdateUserInput;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getTodo: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<QueryGetTodoArgs, 'id'>>;
  getWcifById: Resolver<ResolversTypes['Wcif'], ParentType, ContextType, RequireFields<QueryGetWcifByIdArgs, '_id'>>;
  getMyUpcomingCompetitions: Resolver<Array<ResolversTypes['Wcif']>, ParentType, ContextType>;
  getWcifByCompetitionId: Resolver<Maybe<ResolversTypes['Wcif']>, ParentType, ContextType, RequireFields<QueryGetWcifByCompetitionIdArgs, 'competitionId'>>;
  getOpenRounds: Resolver<ResolversTypes['Round'], ParentType, ContextType, RequireFields<QueryGetOpenRoundsArgs, 'competitionId'>>;
  getAllWcifs: Resolver<Array<ResolversTypes['Wcif']>, ParentType, ContextType>;
  getTopCompetitors: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType, RequireFields<QueryGetTopCompetitorsArgs, 'top' | 'competitionId'>>;
  getUser: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  getMe: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  findMyManagableCompetitions: Resolver<Array<ResolversTypes['WcifFetch']>, ParentType, ContextType>;
};

export type TodoResolvers<ContextType = any, ParentType extends ResolversParentTypes['Todo'] = ResolversParentTypes['Todo']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  createdAt: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  content: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isDone: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type WcifResolvers<ContextType = any, ParentType extends ResolversParentTypes['Wcif'] = ResolversParentTypes['Wcif']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  competitionId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  persons: Resolver<Array<ResolversTypes['Person']>, ParentType, ContextType>;
  events: Resolver<Array<ResolversTypes['Event']>, ParentType, ContextType>;
  schedule: Resolver<ResolversTypes['Schedule'], ParentType, ContextType>;
  competitorLimit: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  extensions: Resolver<Array<ResolversTypes['Extension']>, ParentType, ContextType>;
  locationName: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registrationOpen: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  registrationClose: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  settings: Resolver<ResolversTypes['Setting'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PersonResolvers<ContextType = any, ParentType extends ResolversParentTypes['Person'] = ResolversParentTypes['Person']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wcaUserId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  wcaId: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registrationId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  countryIso2: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  gender: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  birthdate: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  email: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  registration: Resolver<ResolversTypes['Registration'], ParentType, ContextType>;
  avatar: Resolver<ResolversTypes['Avatar'], ParentType, ContextType>;
  roles: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  assignments: Resolver<Array<ResolversTypes['Assignment']>, ParentType, ContextType>;
  personalBests: Resolver<Array<ResolversTypes['PersonalBest']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type RegistrationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Registration'] = ResolversParentTypes['Registration']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  eventIds: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  status: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  comments: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wcaRegistrationId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  guests: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AvatarResolvers<ContextType = any, ParentType extends ResolversParentTypes['Avatar'] = ResolversParentTypes['Avatar']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  url: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbUrl: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AssignmentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Assignment'] = ResolversParentTypes['Assignment']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  assignmentCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  activityId: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  stationNumber: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PersonalBestResolvers<ContextType = any, ParentType extends ResolversParentTypes['PersonalBest'] = ResolversParentTypes['PersonalBest']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  eventId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  best: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  worldRanking: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  continentalRanking: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  nationalRanking: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type EventResolvers<ContextType = any, ParentType extends ResolversParentTypes['Event'] = ResolversParentTypes['Event']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  rounds: Resolver<Array<ResolversTypes['Round']>, ParentType, ContextType>;
  extensions: Resolver<Array<ResolversTypes['Extension']>, ParentType, ContextType>;
  competitorLimit: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  qualification: Resolver<ResolversTypes['Qualification'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type RoundResolvers<ContextType = any, ParentType extends ResolversParentTypes['Round'] = ResolversParentTypes['Round']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  format: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timeLimit: Resolver<Array<ResolversTypes['TimeLimit']>, ParentType, ContextType>;
  cutoff: Resolver<ResolversTypes['Cutoff'], ParentType, ContextType>;
  advancementCondition: Resolver<ResolversTypes['AdvancementCondition'], ParentType, ContextType>;
  scrambleSetCount: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  scrambleSets: Resolver<Array<ResolversTypes['ScrambleSet']>, ParentType, ContextType>;
  results: Resolver<Array<ResolversTypes['Result']>, ParentType, ContextType>;
  extensions: Resolver<Array<ResolversTypes['Extension']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type TimeLimitResolvers<ContextType = any, ParentType extends ResolversParentTypes['TimeLimit'] = ResolversParentTypes['TimeLimit']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  centiseconds: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cumulativeRoundIds: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CutoffResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cutoff'] = ResolversParentTypes['Cutoff']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  numberOfAttempts: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  attemptResult: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AdvancementConditionResolvers<ContextType = any, ParentType extends ResolversParentTypes['AdvancementCondition'] = ResolversParentTypes['AdvancementCondition']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  level: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ScrambleSetResolvers<ContextType = any, ParentType extends ResolversParentTypes['ScrambleSet'] = ResolversParentTypes['ScrambleSet']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scrambles: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  extraScrambles: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['Result'] = ResolversParentTypes['Result']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  personId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ranking: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  best: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  average: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  attempts: Resolver<Array<ResolversTypes['Attempt']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type AttemptResolvers<ContextType = any, ParentType extends ResolversParentTypes['Attempt'] = ResolversParentTypes['Attempt']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  result: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  reconstruction: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ExtensionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Extension'] = ResolversParentTypes['Extension']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  specUrl: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  data: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QualificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Qualification'] = ResolversParentTypes['Qualification']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  when: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  attemptResult: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ScheduleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Schedule'] = ResolversParentTypes['Schedule']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  startDate: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  numberOfDays: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  venues: Resolver<Array<ResolversTypes['Venue']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type VenueResolvers<ContextType = any, ParentType extends ResolversParentTypes['Venue'] = ResolversParentTypes['Venue']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  countryIso2: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timezone: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitudeMicrodegrees: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  longitudeMicrodegrees: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rooms: Resolver<Array<ResolversTypes['Room']>, ParentType, ContextType>;
  extension: Resolver<Array<ResolversTypes['Extension']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type RoomResolvers<ContextType = any, ParentType extends ResolversParentTypes['Room'] = ResolversParentTypes['Room']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  color: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  activities: Resolver<Array<ResolversTypes['Activtiy']>, ParentType, ContextType>;
  extensions: Resolver<Array<ResolversTypes['Extension']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ActivtiyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Activtiy'] = ResolversParentTypes['Activtiy']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  activityCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startTime: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endTime: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scrambleSetId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  childActivities: Resolver<Array<ResolversTypes['ChildActivity']>, ParentType, ContextType>;
  extensions: Resolver<Array<ResolversTypes['Extension']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ChildActivityResolvers<ContextType = any, ParentType extends ResolversParentTypes['ChildActivity'] = ResolversParentTypes['ChildActivity']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  activityCode: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startTime: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endTime: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  scrambleSetId: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  extensions: Resolver<Array<ResolversTypes['Extension']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SettingResolvers<ContextType = any, ParentType extends ResolversParentTypes['Setting'] = ResolversParentTypes['Setting']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  imageUrl: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  colorTheme: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  _id: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  username: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  primaryAuthenticationType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  competitions: Resolver<Array<ResolversTypes['Competition']>, ParentType, ContextType>;
  connections: Resolver<Array<ResolversTypes['ExternalConnection']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type CompetitionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Competition'] = ResolversParentTypes['Competition']> = {
  competitionId: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  competitionType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  startDate: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roles: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ExternalConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExternalConnection'] = ResolversParentTypes['ExternalConnection']> = {
  connectionType: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  accessToken: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  content: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type WcifFetchResolvers<ContextType = any, ParentType extends ResolversParentTypes['WcifFetch'] = ResolversParentTypes['WcifFetch']> = {
  name: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  start_date: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  end_date: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  country_iso2: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createTodo: Resolver<ResolversTypes['Todo'], ParentType, ContextType, RequireFields<MutationCreateTodoArgs, 'createTodoData'>>;
  createWcif: Resolver<ResolversTypes['Wcif'], ParentType, ContextType, RequireFields<MutationCreateWcifArgs, 'competitionId'>>;
  deleteWcif: Resolver<ResolversTypes['Wcif'], ParentType, ContextType, RequireFields<MutationDeleteWcifArgs, 'competitionId'>>;
  updateWcifInfo: Resolver<ResolversTypes['Wcif'], ParentType, ContextType, RequireFields<MutationUpdateWcifInfoArgs, 'newCompetitorLimit' | 'newShortName' | 'newName' | 'competitionId'>>;
  updateWcifSchedule: Resolver<ResolversTypes['Wcif'], ParentType, ContextType, RequireFields<MutationUpdateWcifScheduleArgs, 'schedule' | 'competitionId'>>;
  updateWcifCompetitors: Resolver<ResolversTypes['Wcif'], ParentType, ContextType>;
  updateWcifEvents: Resolver<ResolversTypes['Wcif'], ParentType, ContextType>;
  updateWcifSettings: Resolver<ResolversTypes['Wcif'], ParentType, ContextType, RequireFields<MutationUpdateWcifSettingsArgs, 'settings' | 'competitionId'>>;
  clearDatabase: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  updateUser: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'data'>>;
};

export type Resolvers<ContextType = any> = {
  Query: QueryResolvers<ContextType>;
  Todo: TodoResolvers<ContextType>;
  ObjectId: GraphQLScalarType;
  DateTime: GraphQLScalarType;
  Wcif: WcifResolvers<ContextType>;
  Person: PersonResolvers<ContextType>;
  Registration: RegistrationResolvers<ContextType>;
  Avatar: AvatarResolvers<ContextType>;
  Assignment: AssignmentResolvers<ContextType>;
  PersonalBest: PersonalBestResolvers<ContextType>;
  Event: EventResolvers<ContextType>;
  Round: RoundResolvers<ContextType>;
  TimeLimit: TimeLimitResolvers<ContextType>;
  Cutoff: CutoffResolvers<ContextType>;
  AdvancementCondition: AdvancementConditionResolvers<ContextType>;
  ScrambleSet: ScrambleSetResolvers<ContextType>;
  Result: ResultResolvers<ContextType>;
  Attempt: AttemptResolvers<ContextType>;
  Extension: ExtensionResolvers<ContextType>;
  Qualification: QualificationResolvers<ContextType>;
  Schedule: ScheduleResolvers<ContextType>;
  Venue: VenueResolvers<ContextType>;
  Room: RoomResolvers<ContextType>;
  Activtiy: ActivtiyResolvers<ContextType>;
  ChildActivity: ChildActivityResolvers<ContextType>;
  Setting: SettingResolvers<ContextType>;
  User: UserResolvers<ContextType>;
  Competition: CompetitionResolvers<ContextType>;
  ExternalConnection: ExternalConnectionResolvers<ContextType>;
  WcifFetch: WcifFetchResolvers<ContextType>;
  Mutation: MutationResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
