import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Mongo object id scalar type */
  ObjectId: any;
};

export type Query = {
  __typename?: 'Query';
  getUser?: Maybe<User>;
  /** Returns the current logged in User. If no user is logged in, returns Null */
  getMe?: Maybe<User>;
  getMyNotifications: Array<Notification>;
  findMyManagableCompetitions: Array<WcifFetch>;
  getWcifById: Wcif;
  getWcifByCompetitionId?: Maybe<Wcif>;
  getOpenRounds: Array<Round>;
  getAllWcifs: Array<Wcif>;
  getTopCompetitors: Array<Person>;
  getOngoingGroups: Array<ActivityWithPerons>;
  getMyUpcomingCompetitions: Array<Wcif>;
};


export type QueryGetUserArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetMyNotificationsArgs = {
  competitionId: Scalars['String'];
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
  competitionId: Scalars['String'];
  top: Scalars['Int'];
};


export type QueryGetOngoingGroupsArgs = {
  competitionId: Scalars['String'];
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
  subscriptions: Array<UserPushSubscriptionInput>;
};


export type Competition = {
  __typename?: 'Competition';
  competitionId: Scalars['String'];
  competitionType: Scalars['String'];
  startDate: Scalars['String'];
  endDate: Scalars['String'];
  roles: Array<Scalars['String']>;
  notifications?: Maybe<Array<Notification>>;
};

export type Notification = {
  __typename?: 'Notification';
  _id: Scalars['ObjectId'];
  body?: Maybe<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  badge?: Maybe<Scalars['String']>;
  vibrate?: Maybe<Array<Scalars['Int']>>;
  actions?: Maybe<Array<Scalars['String']>>;
  url?: Maybe<Scalars['String']>;
  timestamp: Scalars['Float'];
};

export type ExternalConnection = {
  __typename?: 'ExternalConnection';
  connectionType: Scalars['String'];
  accessToken: Scalars['String'];
  content: WcaContent;
};

export type WcaContent = {
  __typename?: 'WCAContent';
  id: Scalars['Int'];
  delegateStatus: Scalars['String'];
  birthdate: Scalars['String'];
  teams: Array<WcaTeams>;
  photos: Array<Scalars['String']>;
  wcaId?: Maybe<Scalars['String']>;
};

export type WcaTeams = {
  __typename?: 'WCATeams';
  friendlyId: Scalars['String'];
  leader: Scalars['Boolean'];
};

export type UserPushSubscriptionInput = {
  __typename?: 'UserPushSubscriptionInput';
  endpoint: Scalars['String'];
  keys: Keys;
  device?: Maybe<Scalars['String']>;
  browser?: Maybe<Scalars['String']>;
};

export type Keys = {
  __typename?: 'Keys';
  p256dh: Scalars['String'];
  auth: Scalars['String'];
};

export type WcifFetch = {
  __typename?: 'WcifFetch';
  name: Scalars['String'];
  start_date: Scalars['String'];
  end_date: Scalars['String'];
  country_iso2: Scalars['String'];
  competitionId: Scalars['String'];
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
  synchronizedAt: Scalars['Float'];
};

export type Person = {
  __typename?: 'Person';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  wcaUserId: Scalars['Int'];
  wcaId?: Maybe<Scalars['String']>;
  registrantId?: Maybe<Scalars['Int']>;
  countryIso2: Scalars['String'];
  gender: Scalars['String'];
  birthdate?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  registration: Registration;
  avatar: Avatar;
  roles: Array<Scalars['String']>;
  assignments: Array<Assignment>;
  personalBests: Array<PersonalBest>;
  subscribers: Array<UserSubscription>;
};

export type Registration = {
  __typename?: 'Registration';
  _id: Scalars['ObjectId'];
  eventIds: Array<Scalars['String']>;
  status: Scalars['String'];
  comments?: Maybe<Scalars['String']>;
  wcaRegistrationId: Scalars['Int'];
  guests?: Maybe<Scalars['Int']>;
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
  activityId: Scalars['Int'];
  stationNumber?: Maybe<Scalars['Int']>;
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

export type UserSubscription = {
  __typename?: 'UserSubscription';
  name: Scalars['String'];
  username: Scalars['String'];
  _id: Scalars['ObjectId'];
  connections: Array<ExternalConnection>;
  subscriptions: Array<UserPushSubscriptionInput>;
};

export type Event = {
  __typename?: 'Event';
  _id: Scalars['ObjectId'];
  id: Scalars['String'];
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
  extensions: Array<Extension>;
  activities: Array<Activity>;
};

export type Activity = {
  __typename?: 'Activity';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  activityCode: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  scrambleSetId: Scalars['Int'];
  id: Scalars['Int'];
  childActivities: Array<ChildActivity>;
  extensions: Array<Extension>;
  ongoing?: Maybe<Scalars['Boolean']>;
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
  ongoing?: Maybe<Scalars['Boolean']>;
};

export type Setting = {
  __typename?: 'Setting';
  _id: Scalars['ObjectId'];
  imageUrl: Scalars['String'];
  message: Scalars['String'];
  colorTheme: Scalars['String'];
};

export type ActivityWithPerons = {
  __typename?: 'ActivityWithPerons';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  activityCode: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  scrambleSetId: Scalars['Int'];
  id: Scalars['Int'];
  childActivities: Array<ChildActivityWithPersons>;
  extensions: Array<Extension>;
  ongoing?: Maybe<Scalars['Boolean']>;
  room: RoomWithoutActivties;
};

export type ChildActivityWithPersons = {
  __typename?: 'ChildActivityWithPersons';
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  activityCode: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  scrambleSetId: Scalars['Int'];
  id: Scalars['Int'];
  extensions: Array<Extension>;
  ongoing?: Maybe<Scalars['Boolean']>;
  persons: Array<Person>;
  next?: Maybe<ChildActivity>;
};

export type RoomWithoutActivties = {
  __typename?: 'RoomWithoutActivties';
  _id: Scalars['ObjectId'];
  id: Scalars['Int'];
  name: Scalars['String'];
  color: Scalars['String'];
  extensions: Array<Extension>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateUser?: Maybe<User>;
  subscribeMe: Scalars['Boolean'];
  createWcif: Wcif;
  deleteWcif: Wcif;
  updateWcifInfo: Wcif;
  updateWcifSchedule: Wcif;
  updateWcifCompetitors: Wcif;
  updateWcifEvents: Wcif;
  updateWcifSettings: Wcif;
  /** Clears the database. Only works in development when server is running locally. */
  clearDatabase: Scalars['Boolean'];
  updateOngoingGroups: Array<ActivityWithPerons>;
  synchronize?: Maybe<Wcif>;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};


export type MutationSubscribeMeArgs = {
  subscription: UserPushSubscription;
};


export type MutationCreateWcifArgs = {
  competitionId: Scalars['String'];
};


export type MutationDeleteWcifArgs = {
  competitionId: Scalars['String'];
};


export type MutationUpdateWcifInfoArgs = {
  competitionId: Scalars['String'];
  newName: Scalars['String'];
  newShortName: Scalars['String'];
  newCompetitorLimit: Scalars['Int'];
};


export type MutationUpdateWcifScheduleArgs = {
  schedule: ScheduleInput;
  competitionId: Scalars['String'];
};


export type MutationUpdateWcifCompetitorsArgs = {
  competitionId: Scalars['String'];
  competitors: Array<NewPersonInput>;
};


export type MutationUpdateWcifEventsArgs = {
  competitionId: Scalars['String'];
  events: Array<UpdateEventInput>;
};


export type MutationUpdateWcifSettingsArgs = {
  settings: SettingInput;
  competitionId: Scalars['String'];
};


export type MutationUpdateOngoingGroupsArgs = {
  competitionId: Scalars['String'];
  newGroups?: Maybe<Array<GroupInfo>>;
  closeGroups?: Maybe<Array<GroupInfo>>;
};


export type MutationSynchronizeArgs = {
  competitionId: Scalars['String'];
};

export type UpdateUserInput = {
  _id: Scalars['ObjectId'];
  newName: Scalars['String'];
  newEmail: Scalars['String'];
  newUsername: Scalars['String'];
};

export type UserPushSubscription = {
  endpoint: Scalars['String'];
  keys: KeysInput;
  device?: Maybe<Scalars['String']>;
  browser?: Maybe<Scalars['String']>;
};

export type KeysInput = {
  p256dh: Scalars['String'];
  auth: Scalars['String'];
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
  extensions: Array<ExtensionInput>;
  activities: Array<ActivityInput>;
};

export type ExtensionInput = {
  _id: Scalars['ObjectId'];
  id: Scalars['String'];
  specUrl: Scalars['String'];
  data: Scalars['String'];
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
  ongoing?: Maybe<Scalars['Boolean']>;
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
  ongoing?: Maybe<Scalars['Boolean']>;
};

export type NewPersonInput = {
  _id: Scalars['ObjectId'];
  name: Scalars['String'];
  wcaUserId: Scalars['Int'];
  wcaId?: Maybe<Scalars['String']>;
  registrantId?: Maybe<Scalars['Int']>;
  countryIso2: Scalars['String'];
  gender: Scalars['String'];
  birthdate: Scalars['String'];
  email: Scalars['String'];
};

export type UpdateEventInput = {
  id: Scalars['String'];
  competitorLimit: Scalars['Int'];
  rounds: Array<UpdateRoundInput>;
  qualification: QualificationInput;
};

export type UpdateRoundInput = {
  id: Scalars['String'];
  format: Scalars['String'];
  scrambleSetCount: Scalars['Int'];
  advancementCondition: AdvancementConditionInput;
  timeLimit: Array<TimeLimitInput>;
  cutoff: CutoffInput;
};

export type AdvancementConditionInput = {
  _id: Scalars['ObjectId'];
  type: Scalars['String'];
  level: Array<Scalars['Int']>;
};

export type TimeLimitInput = {
  _id: Scalars['ObjectId'];
  centiseconds: Scalars['Int'];
  cumulativeRoundIds: Array<Scalars['String']>;
};

export type CutoffInput = {
  _id: Scalars['ObjectId'];
  numberOfAttempts: Scalars['Int'];
  attemptResult: Array<Scalars['Int']>;
};

export type QualificationInput = {
  _id: Scalars['ObjectId'];
  when: Scalars['String'];
  type: Scalars['String'];
  attemptResult: Array<Scalars['Int']>;
};

export type SettingInput = {
  _id: Scalars['ObjectId'];
  imageUrl: Scalars['String'];
  message: Scalars['String'];
  colorTheme: Scalars['String'];
};

export type GroupInfo = {
  id: Scalars['Int'];
  activityCode?: Maybe<Scalars['String']>;
  parentId?: Maybe<Scalars['Int']>;
};


export const SettingsUpdateUserDocument = gql`
    mutation SettingsUpdateUser($data: UpdateUserInput!) {
  updateUser(data: $data) {
    _id
  }
}
    `;
export type SettingsUpdateUserMutationFn = ApolloReactCommon.MutationFunction<SettingsUpdateUserMutation, SettingsUpdateUserMutationVariables>;

/**
 * __useSettingsUpdateUserMutation__
 *
 * To run a mutation, you first call `useSettingsUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSettingsUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [settingsUpdateUserMutation, { data, loading, error }] = useSettingsUpdateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSettingsUpdateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SettingsUpdateUserMutation, SettingsUpdateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<SettingsUpdateUserMutation, SettingsUpdateUserMutationVariables>(SettingsUpdateUserDocument, baseOptions);
      }
export type SettingsUpdateUserMutationHookResult = ReturnType<typeof useSettingsUpdateUserMutation>;
export type SettingsUpdateUserMutationResult = ApolloReactCommon.MutationResult<SettingsUpdateUserMutation>;
export type SettingsUpdateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<SettingsUpdateUserMutation, SettingsUpdateUserMutationVariables>;
export const SubscribeUserDocument = gql`
    mutation SubscribeUser($subscription: UserPushSubscription!) {
  subscribeMe(subscription: $subscription)
}
    `;
export type SubscribeUserMutationFn = ApolloReactCommon.MutationFunction<SubscribeUserMutation, SubscribeUserMutationVariables>;

/**
 * __useSubscribeUserMutation__
 *
 * To run a mutation, you first call `useSubscribeUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeUserMutation, { data, loading, error }] = useSubscribeUserMutation({
 *   variables: {
 *      subscription: // value for 'subscription'
 *   },
 * });
 */
export function useSubscribeUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SubscribeUserMutation, SubscribeUserMutationVariables>) {
        return ApolloReactHooks.useMutation<SubscribeUserMutation, SubscribeUserMutationVariables>(SubscribeUserDocument, baseOptions);
      }
export type SubscribeUserMutationHookResult = ReturnType<typeof useSubscribeUserMutation>;
export type SubscribeUserMutationResult = ApolloReactCommon.MutationResult<SubscribeUserMutation>;
export type SubscribeUserMutationOptions = ApolloReactCommon.BaseMutationOptions<SubscribeUserMutation, SubscribeUserMutationVariables>;
export const ContextGetMeDocument = gql`
    query ContextGetMe {
  getMe {
    _id
    username
    email
    name
    primaryAuthenticationType
    connections {
      connectionType
      content {
        id
        wcaId
        teams {
          friendlyId
          leader
        }
        photos
        birthdate
        delegateStatus
      }
    }
    competitions {
      competitionType
      competitionId
      roles
    }
    subscriptions {
      endpoint
      browser
      device
    }
  }
}
    `;

/**
 * __useContextGetMeQuery__
 *
 * To run a query within a React component, call `useContextGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useContextGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContextGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useContextGetMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ContextGetMeQuery, ContextGetMeQueryVariables>) {
        return ApolloReactHooks.useQuery<ContextGetMeQuery, ContextGetMeQueryVariables>(ContextGetMeDocument, baseOptions);
      }
export function useContextGetMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContextGetMeQuery, ContextGetMeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ContextGetMeQuery, ContextGetMeQueryVariables>(ContextGetMeDocument, baseOptions);
        }
export type ContextGetMeQueryHookResult = ReturnType<typeof useContextGetMeQuery>;
export type ContextGetMeLazyQueryHookResult = ReturnType<typeof useContextGetMeLazyQuery>;
export type ContextGetMeQueryResult = ApolloReactCommon.QueryResult<ContextGetMeQuery, ContextGetMeQueryVariables>;
export const GetMyNotificationsDocument = gql`
    query GetMyNotifications($competitionId: String!) {
  getMyNotifications(competitionId: $competitionId) {
    _id
    body
    title
    icon
    url
    image
  }
}
    `;

/**
 * __useGetMyNotificationsQuery__
 *
 * To run a query within a React component, call `useGetMyNotificationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyNotificationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyNotificationsQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useGetMyNotificationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>(GetMyNotificationsDocument, baseOptions);
      }
export function useGetMyNotificationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>(GetMyNotificationsDocument, baseOptions);
        }
export type GetMyNotificationsQueryHookResult = ReturnType<typeof useGetMyNotificationsQuery>;
export type GetMyNotificationsLazyQueryHookResult = ReturnType<typeof useGetMyNotificationsLazyQuery>;
export type GetMyNotificationsQueryResult = ApolloReactCommon.QueryResult<GetMyNotificationsQuery, GetMyNotificationsQueryVariables>;
export const AdminSynchronizeDocument = gql`
    mutation AdminSynchronize($competitionId: String!) {
  synchronize(competitionId: $competitionId) {
    synchronizedAt
  }
}
    `;
export type AdminSynchronizeMutationFn = ApolloReactCommon.MutationFunction<AdminSynchronizeMutation, AdminSynchronizeMutationVariables>;

/**
 * __useAdminSynchronizeMutation__
 *
 * To run a mutation, you first call `useAdminSynchronizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminSynchronizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminSynchronizeMutation, { data, loading, error }] = useAdminSynchronizeMutation({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useAdminSynchronizeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminSynchronizeMutation, AdminSynchronizeMutationVariables>) {
        return ApolloReactHooks.useMutation<AdminSynchronizeMutation, AdminSynchronizeMutationVariables>(AdminSynchronizeDocument, baseOptions);
      }
export type AdminSynchronizeMutationHookResult = ReturnType<typeof useAdminSynchronizeMutation>;
export type AdminSynchronizeMutationResult = ApolloReactCommon.MutationResult<AdminSynchronizeMutation>;
export type AdminSynchronizeMutationOptions = ApolloReactCommon.BaseMutationOptions<AdminSynchronizeMutation, AdminSynchronizeMutationVariables>;
export const ControlCenterUpdateOngoingGroupsDocument = gql`
    mutation ControlCenterUpdateOngoingGroups($competitionId: String!, $newGroups: [GroupInfo!], $closeGroups: [GroupInfo!]) {
  updateOngoingGroups(competitionId: $competitionId, newGroups: $newGroups, closeGroups: $closeGroups) {
    name
    activityCode
    startTime
    endTime
    id
    room {
      name
      color
    }
    childActivities {
      name
      activityCode
      startTime
      endTime
      id
      persons {
        name
        wcaUserId
        wcaId
        registrantId
        countryIso2
        roles
        assignments {
          assignmentCode
          activityId
        }
      }
      next {
        name
        startTime
        endTime
        id
        activityCode
      }
    }
  }
}
    `;
export type ControlCenterUpdateOngoingGroupsMutationFn = ApolloReactCommon.MutationFunction<ControlCenterUpdateOngoingGroupsMutation, ControlCenterUpdateOngoingGroupsMutationVariables>;

/**
 * __useControlCenterUpdateOngoingGroupsMutation__
 *
 * To run a mutation, you first call `useControlCenterUpdateOngoingGroupsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useControlCenterUpdateOngoingGroupsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [controlCenterUpdateOngoingGroupsMutation, { data, loading, error }] = useControlCenterUpdateOngoingGroupsMutation({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *      newGroups: // value for 'newGroups'
 *      closeGroups: // value for 'closeGroups'
 *   },
 * });
 */
export function useControlCenterUpdateOngoingGroupsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ControlCenterUpdateOngoingGroupsMutation, ControlCenterUpdateOngoingGroupsMutationVariables>) {
        return ApolloReactHooks.useMutation<ControlCenterUpdateOngoingGroupsMutation, ControlCenterUpdateOngoingGroupsMutationVariables>(ControlCenterUpdateOngoingGroupsDocument, baseOptions);
      }
export type ControlCenterUpdateOngoingGroupsMutationHookResult = ReturnType<typeof useControlCenterUpdateOngoingGroupsMutation>;
export type ControlCenterUpdateOngoingGroupsMutationResult = ApolloReactCommon.MutationResult<ControlCenterUpdateOngoingGroupsMutation>;
export type ControlCenterUpdateOngoingGroupsMutationOptions = ApolloReactCommon.BaseMutationOptions<ControlCenterUpdateOngoingGroupsMutation, ControlCenterUpdateOngoingGroupsMutationVariables>;
export const NewCreateWcifDocument = gql`
    mutation NewCreateWcif($competitionId: String!) {
  createWcif(competitionId: $competitionId) {
    competitionId
  }
}
    `;
export type NewCreateWcifMutationFn = ApolloReactCommon.MutationFunction<NewCreateWcifMutation, NewCreateWcifMutationVariables>;

/**
 * __useNewCreateWcifMutation__
 *
 * To run a mutation, you first call `useNewCreateWcifMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useNewCreateWcifMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [newCreateWcifMutation, { data, loading, error }] = useNewCreateWcifMutation({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useNewCreateWcifMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<NewCreateWcifMutation, NewCreateWcifMutationVariables>) {
        return ApolloReactHooks.useMutation<NewCreateWcifMutation, NewCreateWcifMutationVariables>(NewCreateWcifDocument, baseOptions);
      }
export type NewCreateWcifMutationHookResult = ReturnType<typeof useNewCreateWcifMutation>;
export type NewCreateWcifMutationResult = ApolloReactCommon.MutationResult<NewCreateWcifMutation>;
export type NewCreateWcifMutationOptions = ApolloReactCommon.BaseMutationOptions<NewCreateWcifMutation, NewCreateWcifMutationVariables>;
export const UpdateWcifCompetitorsDocument = gql`
    mutation updateWcifCompetitors($competitionId: String!, $updatedCompetitors: [NewPersonInput!]!) {
  updateWcifCompetitors(competitionId: $competitionId, competitors: $updatedCompetitors) {
    _id
    competitionId
    name
  }
}
    `;
export type UpdateWcifCompetitorsMutationFn = ApolloReactCommon.MutationFunction<UpdateWcifCompetitorsMutation, UpdateWcifCompetitorsMutationVariables>;

/**
 * __useUpdateWcifCompetitorsMutation__
 *
 * To run a mutation, you first call `useUpdateWcifCompetitorsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWcifCompetitorsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWcifCompetitorsMutation, { data, loading, error }] = useUpdateWcifCompetitorsMutation({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *      updatedCompetitors: // value for 'updatedCompetitors'
 *   },
 * });
 */
export function useUpdateWcifCompetitorsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateWcifCompetitorsMutation, UpdateWcifCompetitorsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateWcifCompetitorsMutation, UpdateWcifCompetitorsMutationVariables>(UpdateWcifCompetitorsDocument, baseOptions);
      }
export type UpdateWcifCompetitorsMutationHookResult = ReturnType<typeof useUpdateWcifCompetitorsMutation>;
export type UpdateWcifCompetitorsMutationResult = ApolloReactCommon.MutationResult<UpdateWcifCompetitorsMutation>;
export type UpdateWcifCompetitorsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateWcifCompetitorsMutation, UpdateWcifCompetitorsMutationVariables>;
export const UpdateWcifEventsDocument = gql`
    mutation UpdateWcifEvents($competitionId: String!, $events: [UpdateEventInput!]!) {
  updateWcifEvents(competitionId: $competitionId, events: $events) {
    _id
    competitionId
    name
  }
}
    `;
export type UpdateWcifEventsMutationFn = ApolloReactCommon.MutationFunction<UpdateWcifEventsMutation, UpdateWcifEventsMutationVariables>;

/**
 * __useUpdateWcifEventsMutation__
 *
 * To run a mutation, you first call `useUpdateWcifEventsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWcifEventsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWcifEventsMutation, { data, loading, error }] = useUpdateWcifEventsMutation({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *      events: // value for 'events'
 *   },
 * });
 */
export function useUpdateWcifEventsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateWcifEventsMutation, UpdateWcifEventsMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateWcifEventsMutation, UpdateWcifEventsMutationVariables>(UpdateWcifEventsDocument, baseOptions);
      }
export type UpdateWcifEventsMutationHookResult = ReturnType<typeof useUpdateWcifEventsMutation>;
export type UpdateWcifEventsMutationResult = ApolloReactCommon.MutationResult<UpdateWcifEventsMutation>;
export type UpdateWcifEventsMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateWcifEventsMutation, UpdateWcifEventsMutationVariables>;
export const UpdateWcifInfoDocument = gql`
    mutation updateWcifInfo($competitionId: String!, $name: String!, $shortName: String!, $competitorLimit: Int!) {
  updateWcifInfo(competitionId: $competitionId, newName: $name, newShortName: $shortName, newCompetitorLimit: $competitorLimit) {
    competitionId
    _id
  }
}
    `;
export type UpdateWcifInfoMutationFn = ApolloReactCommon.MutationFunction<UpdateWcifInfoMutation, UpdateWcifInfoMutationVariables>;

/**
 * __useUpdateWcifInfoMutation__
 *
 * To run a mutation, you first call `useUpdateWcifInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWcifInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWcifInfoMutation, { data, loading, error }] = useUpdateWcifInfoMutation({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *      name: // value for 'name'
 *      shortName: // value for 'shortName'
 *      competitorLimit: // value for 'competitorLimit'
 *   },
 * });
 */
export function useUpdateWcifInfoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateWcifInfoMutation, UpdateWcifInfoMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateWcifInfoMutation, UpdateWcifInfoMutationVariables>(UpdateWcifInfoDocument, baseOptions);
      }
export type UpdateWcifInfoMutationHookResult = ReturnType<typeof useUpdateWcifInfoMutation>;
export type UpdateWcifInfoMutationResult = ApolloReactCommon.MutationResult<UpdateWcifInfoMutation>;
export type UpdateWcifInfoMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateWcifInfoMutation, UpdateWcifInfoMutationVariables>;
export const CompetitionGroupsDocument = gql`
    query CompetitionGroups($competitionId: String!) {
  getWcifByCompetitionId(competitionId: $competitionId) {
    name
    shortName
    competitionId
    _id
    events {
      id
      _id
      rounds {
        id
      }
    }
    persons {
      _id
      name
      wcaUserId
      wcaId
      roles
      registration {
        _id
        eventIds
      }
      assignments {
        _id
        activityId
        assignmentCode
        stationNumber
      }
      personalBests {
        _id
        eventId
        best
        worldRanking
        type
      }
    }
    schedule {
      _id
      startDate
      numberOfDays
      venues {
        _id
        timezone
        name
        rooms {
          _id
          id
          name
          color
          activities {
            _id
            id
            name
            activityCode
            startTime
            endTime
            childActivities {
              _id
              id
              name
              activityCode
              startTime
              endTime
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useCompetitionGroupsQuery__
 *
 * To run a query within a React component, call `useCompetitionGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompetitionGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompetitionGroupsQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useCompetitionGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CompetitionGroupsQuery, CompetitionGroupsQueryVariables>) {
        return ApolloReactHooks.useQuery<CompetitionGroupsQuery, CompetitionGroupsQueryVariables>(CompetitionGroupsDocument, baseOptions);
      }
export function useCompetitionGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompetitionGroupsQuery, CompetitionGroupsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CompetitionGroupsQuery, CompetitionGroupsQueryVariables>(CompetitionGroupsDocument, baseOptions);
        }
export type CompetitionGroupsQueryHookResult = ReturnType<typeof useCompetitionGroupsQuery>;
export type CompetitionGroupsLazyQueryHookResult = ReturnType<typeof useCompetitionGroupsLazyQuery>;
export type CompetitionGroupsQueryResult = ApolloReactCommon.QueryResult<CompetitionGroupsQuery, CompetitionGroupsQueryVariables>;
export const CompetitionInformationDocument = gql`
    query CompetitionInformation($competitionId: String!, $top: Int!) {
  getWcifByCompetitionId(competitionId: $competitionId) {
    _id
    name
    locationName
    registrationOpen
    registrationClose
    settings {
      imageUrl
      message
      colorTheme
    }
    schedule {
      _id
      startDate
      numberOfDays
    }
    events {
      _id
      id
    }
  }
  getTopCompetitors(top: $top, competitionId: $competitionId) {
    _id
    name
    wcaUserId
    personalBests {
      _id
      eventId
      best
      type
      worldRanking
    }
    avatar {
      thumbUrl
    }
  }
}
    `;

/**
 * __useCompetitionInformationQuery__
 *
 * To run a query within a React component, call `useCompetitionInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompetitionInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompetitionInformationQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *      top: // value for 'top'
 *   },
 * });
 */
export function useCompetitionInformationQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CompetitionInformationQuery, CompetitionInformationQueryVariables>) {
        return ApolloReactHooks.useQuery<CompetitionInformationQuery, CompetitionInformationQueryVariables>(CompetitionInformationDocument, baseOptions);
      }
export function useCompetitionInformationLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompetitionInformationQuery, CompetitionInformationQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CompetitionInformationQuery, CompetitionInformationQueryVariables>(CompetitionInformationDocument, baseOptions);
        }
export type CompetitionInformationQueryHookResult = ReturnType<typeof useCompetitionInformationQuery>;
export type CompetitionInformationLazyQueryHookResult = ReturnType<typeof useCompetitionInformationLazyQuery>;
export type CompetitionInformationQueryResult = ApolloReactCommon.QueryResult<CompetitionInformationQuery, CompetitionInformationQueryVariables>;
export const CompetitionOverviewDocument = gql`
    query CompetitionOverview($competitionId: String!) {
  getWcifByCompetitionId(competitionId: $competitionId) {
    name
    shortName
    _id
    persons {
      _id
      name
      wcaUserId
      wcaId
      roles
      registration {
        _id
        eventIds
      }
      assignments {
        _id
        activityId
        assignmentCode
        stationNumber
      }
    }
    schedule {
      _id
      startDate
      numberOfDays
      venues {
        _id
        name
        rooms {
          _id
          id
          name
          color
          activities {
            _id
            id
            name
            activityCode
            startTime
            endTime
            childActivities {
              _id
              id
              name
              activityCode
              startTime
              endTime
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useCompetitionOverviewQuery__
 *
 * To run a query within a React component, call `useCompetitionOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompetitionOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompetitionOverviewQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useCompetitionOverviewQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CompetitionOverviewQuery, CompetitionOverviewQueryVariables>) {
        return ApolloReactHooks.useQuery<CompetitionOverviewQuery, CompetitionOverviewQueryVariables>(CompetitionOverviewDocument, baseOptions);
      }
export function useCompetitionOverviewLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompetitionOverviewQuery, CompetitionOverviewQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CompetitionOverviewQuery, CompetitionOverviewQueryVariables>(CompetitionOverviewDocument, baseOptions);
        }
export type CompetitionOverviewQueryHookResult = ReturnType<typeof useCompetitionOverviewQuery>;
export type CompetitionOverviewLazyQueryHookResult = ReturnType<typeof useCompetitionOverviewLazyQuery>;
export type CompetitionOverviewQueryResult = ApolloReactCommon.QueryResult<CompetitionOverviewQuery, CompetitionOverviewQueryVariables>;
export const ContextGetCompetitionDocument = gql`
    query ContextGetCompetition($competitionId: String!) {
  getWcifByCompetitionId(competitionId: $competitionId) {
    synchronizedAt
    name
    shortName
    _id
    competitionId
    settings {
      colorTheme
    }
    persons {
      _id
      wcaUserId
      registrantId
    }
    schedule {
      _id
      startDate
      numberOfDays
      venues {
        _id
        timezone
        name
        rooms {
          _id
          id
          name
          color
          activities {
            _id
            id
            name
            activityCode
            startTime
            endTime
            ongoing
            childActivities {
              _id
              id
              name
              activityCode
              startTime
              endTime
              ongoing
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useContextGetCompetitionQuery__
 *
 * To run a query within a React component, call `useContextGetCompetitionQuery` and pass it any options that fit your needs.
 * When your component renders, `useContextGetCompetitionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContextGetCompetitionQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useContextGetCompetitionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ContextGetCompetitionQuery, ContextGetCompetitionQueryVariables>) {
        return ApolloReactHooks.useQuery<ContextGetCompetitionQuery, ContextGetCompetitionQueryVariables>(ContextGetCompetitionDocument, baseOptions);
      }
export function useContextGetCompetitionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ContextGetCompetitionQuery, ContextGetCompetitionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ContextGetCompetitionQuery, ContextGetCompetitionQueryVariables>(ContextGetCompetitionDocument, baseOptions);
        }
export type ContextGetCompetitionQueryHookResult = ReturnType<typeof useContextGetCompetitionQuery>;
export type ContextGetCompetitionLazyQueryHookResult = ReturnType<typeof useContextGetCompetitionLazyQuery>;
export type ContextGetCompetitionQueryResult = ApolloReactCommon.QueryResult<ContextGetCompetitionQuery, ContextGetCompetitionQueryVariables>;
export const ControlCenterGetOpenGroupsDocument = gql`
    query ControlCenterGetOpenGroups($competitionId: String!) {
  getOngoingGroups(competitionId: $competitionId) {
    name
    activityCode
    startTime
    endTime
    id
    room {
      name
      color
    }
    childActivities {
      name
      activityCode
      startTime
      endTime
      id
      persons {
        name
        wcaUserId
        wcaId
        registrantId
        countryIso2
        roles
        assignments {
          assignmentCode
          activityId
        }
      }
      next {
        name
        startTime
        endTime
        id
        activityCode
      }
    }
  }
}
    `;

/**
 * __useControlCenterGetOpenGroupsQuery__
 *
 * To run a query within a React component, call `useControlCenterGetOpenGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useControlCenterGetOpenGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useControlCenterGetOpenGroupsQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useControlCenterGetOpenGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ControlCenterGetOpenGroupsQuery, ControlCenterGetOpenGroupsQueryVariables>) {
        return ApolloReactHooks.useQuery<ControlCenterGetOpenGroupsQuery, ControlCenterGetOpenGroupsQueryVariables>(ControlCenterGetOpenGroupsDocument, baseOptions);
      }
export function useControlCenterGetOpenGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ControlCenterGetOpenGroupsQuery, ControlCenterGetOpenGroupsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ControlCenterGetOpenGroupsQuery, ControlCenterGetOpenGroupsQueryVariables>(ControlCenterGetOpenGroupsDocument, baseOptions);
        }
export type ControlCenterGetOpenGroupsQueryHookResult = ReturnType<typeof useControlCenterGetOpenGroupsQuery>;
export type ControlCenterGetOpenGroupsLazyQueryHookResult = ReturnType<typeof useControlCenterGetOpenGroupsLazyQuery>;
export type ControlCenterGetOpenGroupsQueryResult = ApolloReactCommon.QueryResult<ControlCenterGetOpenGroupsQuery, ControlCenterGetOpenGroupsQueryVariables>;
export const LandingAllUpcomingCompetitionsDocument = gql`
    query LandingAllUpcomingCompetitions {
  getAllWcifs {
    _id
    name
    competitionId
    schedule {
      _id
      startDate
      numberOfDays
      venues {
        _id
        countryIso2
        name
      }
    }
  }
}
    `;

/**
 * __useLandingAllUpcomingCompetitionsQuery__
 *
 * To run a query within a React component, call `useLandingAllUpcomingCompetitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingAllUpcomingCompetitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingAllUpcomingCompetitionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLandingAllUpcomingCompetitionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LandingAllUpcomingCompetitionsQuery, LandingAllUpcomingCompetitionsQueryVariables>) {
        return ApolloReactHooks.useQuery<LandingAllUpcomingCompetitionsQuery, LandingAllUpcomingCompetitionsQueryVariables>(LandingAllUpcomingCompetitionsDocument, baseOptions);
      }
export function useLandingAllUpcomingCompetitionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LandingAllUpcomingCompetitionsQuery, LandingAllUpcomingCompetitionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LandingAllUpcomingCompetitionsQuery, LandingAllUpcomingCompetitionsQueryVariables>(LandingAllUpcomingCompetitionsDocument, baseOptions);
        }
export type LandingAllUpcomingCompetitionsQueryHookResult = ReturnType<typeof useLandingAllUpcomingCompetitionsQuery>;
export type LandingAllUpcomingCompetitionsLazyQueryHookResult = ReturnType<typeof useLandingAllUpcomingCompetitionsLazyQuery>;
export type LandingAllUpcomingCompetitionsQueryResult = ApolloReactCommon.QueryResult<LandingAllUpcomingCompetitionsQuery, LandingAllUpcomingCompetitionsQueryVariables>;
export const LandingMyUpcomingCompetitionsDocument = gql`
    query LandingMyUpcomingCompetitions {
  getMyUpcomingCompetitions {
    _id
    name
    competitionId
    schedule {
      _id
      startDate
      numberOfDays
      venues {
        _id
        countryIso2
        name
      }
    }
  }
}
    `;

/**
 * __useLandingMyUpcomingCompetitionsQuery__
 *
 * To run a query within a React component, call `useLandingMyUpcomingCompetitionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLandingMyUpcomingCompetitionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLandingMyUpcomingCompetitionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLandingMyUpcomingCompetitionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<LandingMyUpcomingCompetitionsQuery, LandingMyUpcomingCompetitionsQueryVariables>) {
        return ApolloReactHooks.useQuery<LandingMyUpcomingCompetitionsQuery, LandingMyUpcomingCompetitionsQueryVariables>(LandingMyUpcomingCompetitionsDocument, baseOptions);
      }
export function useLandingMyUpcomingCompetitionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<LandingMyUpcomingCompetitionsQuery, LandingMyUpcomingCompetitionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<LandingMyUpcomingCompetitionsQuery, LandingMyUpcomingCompetitionsQueryVariables>(LandingMyUpcomingCompetitionsDocument, baseOptions);
        }
export type LandingMyUpcomingCompetitionsQueryHookResult = ReturnType<typeof useLandingMyUpcomingCompetitionsQuery>;
export type LandingMyUpcomingCompetitionsLazyQueryHookResult = ReturnType<typeof useLandingMyUpcomingCompetitionsLazyQuery>;
export type LandingMyUpcomingCompetitionsQueryResult = ApolloReactCommon.QueryResult<LandingMyUpcomingCompetitionsQuery, LandingMyUpcomingCompetitionsQueryVariables>;
export const NewFindMyManagableCompetitionDocument = gql`
    query NewFindMyManagableCompetition {
  findMyManagableCompetitions {
    name
    start_date
    end_date
    competitionId
    country_iso2
  }
}
    `;

/**
 * __useNewFindMyManagableCompetitionQuery__
 *
 * To run a query within a React component, call `useNewFindMyManagableCompetitionQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewFindMyManagableCompetitionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewFindMyManagableCompetitionQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewFindMyManagableCompetitionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NewFindMyManagableCompetitionQuery, NewFindMyManagableCompetitionQueryVariables>) {
        return ApolloReactHooks.useQuery<NewFindMyManagableCompetitionQuery, NewFindMyManagableCompetitionQueryVariables>(NewFindMyManagableCompetitionDocument, baseOptions);
      }
export function useNewFindMyManagableCompetitionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NewFindMyManagableCompetitionQuery, NewFindMyManagableCompetitionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NewFindMyManagableCompetitionQuery, NewFindMyManagableCompetitionQueryVariables>(NewFindMyManagableCompetitionDocument, baseOptions);
        }
export type NewFindMyManagableCompetitionQueryHookResult = ReturnType<typeof useNewFindMyManagableCompetitionQuery>;
export type NewFindMyManagableCompetitionLazyQueryHookResult = ReturnType<typeof useNewFindMyManagableCompetitionLazyQuery>;
export type NewFindMyManagableCompetitionQueryResult = ApolloReactCommon.QueryResult<NewFindMyManagableCompetitionQuery, NewFindMyManagableCompetitionQueryVariables>;
export const ResultsGetOpenRoundsDocument = gql`
    query ResultsGetOpenRounds($competitionId: String!) {
  getOpenRounds(competitionId: $competitionId) {
    _id
    id
  }
}
    `;

/**
 * __useResultsGetOpenRoundsQuery__
 *
 * To run a query within a React component, call `useResultsGetOpenRoundsQuery` and pass it any options that fit your needs.
 * When your component renders, `useResultsGetOpenRoundsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useResultsGetOpenRoundsQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useResultsGetOpenRoundsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ResultsGetOpenRoundsQuery, ResultsGetOpenRoundsQueryVariables>) {
        return ApolloReactHooks.useQuery<ResultsGetOpenRoundsQuery, ResultsGetOpenRoundsQueryVariables>(ResultsGetOpenRoundsDocument, baseOptions);
      }
export function useResultsGetOpenRoundsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ResultsGetOpenRoundsQuery, ResultsGetOpenRoundsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ResultsGetOpenRoundsQuery, ResultsGetOpenRoundsQueryVariables>(ResultsGetOpenRoundsDocument, baseOptions);
        }
export type ResultsGetOpenRoundsQueryHookResult = ReturnType<typeof useResultsGetOpenRoundsQuery>;
export type ResultsGetOpenRoundsLazyQueryHookResult = ReturnType<typeof useResultsGetOpenRoundsLazyQuery>;
export type ResultsGetOpenRoundsQueryResult = ApolloReactCommon.QueryResult<ResultsGetOpenRoundsQuery, ResultsGetOpenRoundsQueryVariables>;
export const RoutingFindByCompetitionIdDocument = gql`
    query RoutingFindByCompetitionId($competitionId: String!) {
  getWcifByCompetitionId(competitionId: $competitionId) {
    name
    shortName
    _id
  }
}
    `;

/**
 * __useRoutingFindByCompetitionIdQuery__
 *
 * To run a query within a React component, call `useRoutingFindByCompetitionIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRoutingFindByCompetitionIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRoutingFindByCompetitionIdQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useRoutingFindByCompetitionIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RoutingFindByCompetitionIdQuery, RoutingFindByCompetitionIdQueryVariables>) {
        return ApolloReactHooks.useQuery<RoutingFindByCompetitionIdQuery, RoutingFindByCompetitionIdQueryVariables>(RoutingFindByCompetitionIdDocument, baseOptions);
      }
export function useRoutingFindByCompetitionIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RoutingFindByCompetitionIdQuery, RoutingFindByCompetitionIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RoutingFindByCompetitionIdQuery, RoutingFindByCompetitionIdQueryVariables>(RoutingFindByCompetitionIdDocument, baseOptions);
        }
export type RoutingFindByCompetitionIdQueryHookResult = ReturnType<typeof useRoutingFindByCompetitionIdQuery>;
export type RoutingFindByCompetitionIdLazyQueryHookResult = ReturnType<typeof useRoutingFindByCompetitionIdLazyQuery>;
export type RoutingFindByCompetitionIdQueryResult = ApolloReactCommon.QueryResult<RoutingFindByCompetitionIdQuery, RoutingFindByCompetitionIdQueryVariables>;
export const SetupCompetitionCompetitorsDocument = gql`
    query SetupCompetitionCompetitors($competitionId: String!) {
  getWcifByCompetitionId(competitionId: $competitionId) {
    _id
    persons {
      _id
      name
      wcaUserId
      wcaId
      registrantId
      countryIso2
      gender
      birthdate
      email
    }
  }
}
    `;

/**
 * __useSetupCompetitionCompetitorsQuery__
 *
 * To run a query within a React component, call `useSetupCompetitionCompetitorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetupCompetitionCompetitorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetupCompetitionCompetitorsQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useSetupCompetitionCompetitorsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SetupCompetitionCompetitorsQuery, SetupCompetitionCompetitorsQueryVariables>) {
        return ApolloReactHooks.useQuery<SetupCompetitionCompetitorsQuery, SetupCompetitionCompetitorsQueryVariables>(SetupCompetitionCompetitorsDocument, baseOptions);
      }
export function useSetupCompetitionCompetitorsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SetupCompetitionCompetitorsQuery, SetupCompetitionCompetitorsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SetupCompetitionCompetitorsQuery, SetupCompetitionCompetitorsQueryVariables>(SetupCompetitionCompetitorsDocument, baseOptions);
        }
export type SetupCompetitionCompetitorsQueryHookResult = ReturnType<typeof useSetupCompetitionCompetitorsQuery>;
export type SetupCompetitionCompetitorsLazyQueryHookResult = ReturnType<typeof useSetupCompetitionCompetitorsLazyQuery>;
export type SetupCompetitionCompetitorsQueryResult = ApolloReactCommon.QueryResult<SetupCompetitionCompetitorsQuery, SetupCompetitionCompetitorsQueryVariables>;
export const SetupCompetitionEventsDocument = gql`
    query SetupCompetitionEvents($competitionId: String!) {
  getWcifByCompetitionId(competitionId: $competitionId) {
    _id
    events {
      _id
      id
      rounds {
        _id
        id
        format
        advancementCondition {
          _id
          type
          level
        }
        timeLimit {
          _id
          centiseconds
          cumulativeRoundIds
        }
        cutoff {
          _id
          numberOfAttempts
          attemptResult
        }
        scrambleSetCount
      }
      competitorLimit
      qualification {
        _id
        when
        type
        attemptResult
        _id
      }
    }
  }
}
    `;

/**
 * __useSetupCompetitionEventsQuery__
 *
 * To run a query within a React component, call `useSetupCompetitionEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetupCompetitionEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetupCompetitionEventsQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useSetupCompetitionEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SetupCompetitionEventsQuery, SetupCompetitionEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<SetupCompetitionEventsQuery, SetupCompetitionEventsQueryVariables>(SetupCompetitionEventsDocument, baseOptions);
      }
export function useSetupCompetitionEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SetupCompetitionEventsQuery, SetupCompetitionEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SetupCompetitionEventsQuery, SetupCompetitionEventsQueryVariables>(SetupCompetitionEventsDocument, baseOptions);
        }
export type SetupCompetitionEventsQueryHookResult = ReturnType<typeof useSetupCompetitionEventsQuery>;
export type SetupCompetitionEventsLazyQueryHookResult = ReturnType<typeof useSetupCompetitionEventsLazyQuery>;
export type SetupCompetitionEventsQueryResult = ApolloReactCommon.QueryResult<SetupCompetitionEventsQuery, SetupCompetitionEventsQueryVariables>;
export const SetupCompetitionInfoDocument = gql`
    query SetupCompetitionInfo($competitionId: String!) {
  getWcifByCompetitionId(competitionId: $competitionId) {
    _id
    name
    shortName
    competitorLimit
  }
}
    `;

/**
 * __useSetupCompetitionInfoQuery__
 *
 * To run a query within a React component, call `useSetupCompetitionInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useSetupCompetitionInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSetupCompetitionInfoQuery({
 *   variables: {
 *      competitionId: // value for 'competitionId'
 *   },
 * });
 */
export function useSetupCompetitionInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SetupCompetitionInfoQuery, SetupCompetitionInfoQueryVariables>) {
        return ApolloReactHooks.useQuery<SetupCompetitionInfoQuery, SetupCompetitionInfoQueryVariables>(SetupCompetitionInfoDocument, baseOptions);
      }
export function useSetupCompetitionInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SetupCompetitionInfoQuery, SetupCompetitionInfoQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SetupCompetitionInfoQuery, SetupCompetitionInfoQueryVariables>(SetupCompetitionInfoDocument, baseOptions);
        }
export type SetupCompetitionInfoQueryHookResult = ReturnType<typeof useSetupCompetitionInfoQuery>;
export type SetupCompetitionInfoLazyQueryHookResult = ReturnType<typeof useSetupCompetitionInfoLazyQuery>;
export type SetupCompetitionInfoQueryResult = ApolloReactCommon.QueryResult<SetupCompetitionInfoQuery, SetupCompetitionInfoQueryVariables>;
export type SettingsUpdateUserMutationVariables = Exact<{
  data: UpdateUserInput;
}>;


export type SettingsUpdateUserMutation = { __typename?: 'Mutation', updateUser?: Maybe<{ __typename?: 'User', _id: any }> };

export type SubscribeUserMutationVariables = Exact<{
  subscription: UserPushSubscription;
}>;


export type SubscribeUserMutation = { __typename?: 'Mutation', subscribeMe: boolean };

export type ContextGetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type ContextGetMeQuery = { __typename?: 'Query', getMe?: Maybe<{ __typename?: 'User', _id: any, username: string, email: string, name: string, primaryAuthenticationType: string, connections: Array<{ __typename?: 'ExternalConnection', connectionType: string, content: { __typename?: 'WCAContent', id: number, wcaId?: Maybe<string>, photos: Array<string>, birthdate: string, delegateStatus: string, teams: Array<{ __typename?: 'WCATeams', friendlyId: string, leader: boolean }> } }>, competitions: Array<{ __typename?: 'Competition', competitionType: string, competitionId: string, roles: Array<string> }>, subscriptions: Array<{ __typename?: 'UserPushSubscriptionInput', endpoint: string, browser?: Maybe<string>, device?: Maybe<string> }> }> };

export type GetMyNotificationsQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type GetMyNotificationsQuery = { __typename?: 'Query', getMyNotifications: Array<{ __typename?: 'Notification', _id: any, body?: Maybe<string>, title?: Maybe<string>, icon?: Maybe<string>, url?: Maybe<string>, image?: Maybe<string> }> };

export type AdminSynchronizeMutationVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type AdminSynchronizeMutation = { __typename?: 'Mutation', synchronize?: Maybe<{ __typename?: 'Wcif', synchronizedAt: number }> };

export type ControlCenterUpdateOngoingGroupsMutationVariables = Exact<{
  competitionId: Scalars['String'];
  newGroups?: Maybe<Array<GroupInfo>>;
  closeGroups?: Maybe<Array<GroupInfo>>;
}>;


export type ControlCenterUpdateOngoingGroupsMutation = { __typename?: 'Mutation', updateOngoingGroups: Array<{ __typename?: 'ActivityWithPerons', name: string, activityCode: string, startTime: string, endTime: string, id: number, room: { __typename?: 'RoomWithoutActivties', name: string, color: string }, childActivities: Array<{ __typename?: 'ChildActivityWithPersons', name: string, activityCode: string, startTime: string, endTime: string, id: number, persons: Array<{ __typename?: 'Person', name: string, wcaUserId: number, wcaId?: Maybe<string>, registrantId?: Maybe<number>, countryIso2: string, roles: Array<string>, assignments: Array<{ __typename?: 'Assignment', assignmentCode: string, activityId: number }> }>, next?: Maybe<{ __typename?: 'ChildActivity', name: string, startTime: string, endTime: string, id: number, activityCode: string }> }> }> };

export type NewCreateWcifMutationVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type NewCreateWcifMutation = { __typename?: 'Mutation', createWcif: { __typename?: 'Wcif', competitionId: string } };

export type UpdateWcifCompetitorsMutationVariables = Exact<{
  competitionId: Scalars['String'];
  updatedCompetitors: Array<NewPersonInput>;
}>;


export type UpdateWcifCompetitorsMutation = { __typename?: 'Mutation', updateWcifCompetitors: { __typename?: 'Wcif', _id: any, competitionId: string, name: string } };

export type UpdateWcifEventsMutationVariables = Exact<{
  competitionId: Scalars['String'];
  events: Array<UpdateEventInput>;
}>;


export type UpdateWcifEventsMutation = { __typename?: 'Mutation', updateWcifEvents: { __typename?: 'Wcif', _id: any, competitionId: string, name: string } };

export type UpdateWcifInfoMutationVariables = Exact<{
  competitionId: Scalars['String'];
  name: Scalars['String'];
  shortName: Scalars['String'];
  competitorLimit: Scalars['Int'];
}>;


export type UpdateWcifInfoMutation = { __typename?: 'Mutation', updateWcifInfo: { __typename?: 'Wcif', competitionId: string, _id: any } };

export type CompetitionGroupsQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type CompetitionGroupsQuery = { __typename?: 'Query', getWcifByCompetitionId?: Maybe<{ __typename?: 'Wcif', name: string, shortName: string, competitionId: string, _id: any, events: Array<{ __typename?: 'Event', id: string, _id: any, rounds: Array<{ __typename?: 'Round', id: string }> }>, persons: Array<{ __typename?: 'Person', _id: any, name: string, wcaUserId: number, wcaId?: Maybe<string>, roles: Array<string>, registration: { __typename?: 'Registration', _id: any, eventIds: Array<string> }, assignments: Array<{ __typename?: 'Assignment', _id: any, activityId: number, assignmentCode: string, stationNumber?: Maybe<number> }>, personalBests: Array<{ __typename?: 'PersonalBest', _id: any, eventId: string, best: number, worldRanking: number, type: string }> }>, schedule: { __typename?: 'Schedule', _id: any, startDate: string, numberOfDays: number, venues: Array<{ __typename?: 'Venue', _id: any, timezone: string, name: string, rooms: Array<{ __typename?: 'Room', _id: any, id: number, name: string, color: string, activities: Array<{ __typename?: 'Activity', _id: any, id: number, name: string, activityCode: string, startTime: string, endTime: string, childActivities: Array<{ __typename?: 'ChildActivity', _id: any, id: number, name: string, activityCode: string, startTime: string, endTime: string }> }> }> }> } }> };

export type CompetitionInformationQueryVariables = Exact<{
  competitionId: Scalars['String'];
  top: Scalars['Int'];
}>;


export type CompetitionInformationQuery = { __typename?: 'Query', getWcifByCompetitionId?: Maybe<{ __typename?: 'Wcif', _id: any, name: string, locationName: string, registrationOpen: string, registrationClose: string, settings: { __typename?: 'Setting', imageUrl: string, message: string, colorTheme: string }, schedule: { __typename?: 'Schedule', _id: any, startDate: string, numberOfDays: number }, events: Array<{ __typename?: 'Event', _id: any, id: string }> }>, getTopCompetitors: Array<{ __typename?: 'Person', _id: any, name: string, wcaUserId: number, personalBests: Array<{ __typename?: 'PersonalBest', _id: any, eventId: string, best: number, type: string, worldRanking: number }>, avatar: { __typename?: 'Avatar', thumbUrl: string } }> };

export type CompetitionOverviewQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type CompetitionOverviewQuery = { __typename?: 'Query', getWcifByCompetitionId?: Maybe<{ __typename?: 'Wcif', name: string, shortName: string, _id: any, persons: Array<{ __typename?: 'Person', _id: any, name: string, wcaUserId: number, wcaId?: Maybe<string>, roles: Array<string>, registration: { __typename?: 'Registration', _id: any, eventIds: Array<string> }, assignments: Array<{ __typename?: 'Assignment', _id: any, activityId: number, assignmentCode: string, stationNumber?: Maybe<number> }> }>, schedule: { __typename?: 'Schedule', _id: any, startDate: string, numberOfDays: number, venues: Array<{ __typename?: 'Venue', _id: any, name: string, rooms: Array<{ __typename?: 'Room', _id: any, id: number, name: string, color: string, activities: Array<{ __typename?: 'Activity', _id: any, id: number, name: string, activityCode: string, startTime: string, endTime: string, childActivities: Array<{ __typename?: 'ChildActivity', _id: any, id: number, name: string, activityCode: string, startTime: string, endTime: string }> }> }> }> } }> };

export type ContextGetCompetitionQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type ContextGetCompetitionQuery = { __typename?: 'Query', getWcifByCompetitionId?: Maybe<{ __typename?: 'Wcif', synchronizedAt: number, name: string, shortName: string, _id: any, competitionId: string, settings: { __typename?: 'Setting', colorTheme: string }, persons: Array<{ __typename?: 'Person', _id: any, wcaUserId: number, registrantId?: Maybe<number> }>, schedule: { __typename?: 'Schedule', _id: any, startDate: string, numberOfDays: number, venues: Array<{ __typename?: 'Venue', _id: any, timezone: string, name: string, rooms: Array<{ __typename?: 'Room', _id: any, id: number, name: string, color: string, activities: Array<{ __typename?: 'Activity', _id: any, id: number, name: string, activityCode: string, startTime: string, endTime: string, ongoing?: Maybe<boolean>, childActivities: Array<{ __typename?: 'ChildActivity', _id: any, id: number, name: string, activityCode: string, startTime: string, endTime: string, ongoing?: Maybe<boolean> }> }> }> }> } }> };

export type ControlCenterGetOpenGroupsQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type ControlCenterGetOpenGroupsQuery = { __typename?: 'Query', getOngoingGroups: Array<{ __typename?: 'ActivityWithPerons', name: string, activityCode: string, startTime: string, endTime: string, id: number, room: { __typename?: 'RoomWithoutActivties', name: string, color: string }, childActivities: Array<{ __typename?: 'ChildActivityWithPersons', name: string, activityCode: string, startTime: string, endTime: string, id: number, persons: Array<{ __typename?: 'Person', name: string, wcaUserId: number, wcaId?: Maybe<string>, registrantId?: Maybe<number>, countryIso2: string, roles: Array<string>, assignments: Array<{ __typename?: 'Assignment', assignmentCode: string, activityId: number }> }>, next?: Maybe<{ __typename?: 'ChildActivity', name: string, startTime: string, endTime: string, id: number, activityCode: string }> }> }> };

export type LandingAllUpcomingCompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type LandingAllUpcomingCompetitionsQuery = { __typename?: 'Query', getAllWcifs: Array<{ __typename?: 'Wcif', _id: any, name: string, competitionId: string, schedule: { __typename?: 'Schedule', _id: any, startDate: string, numberOfDays: number, venues: Array<{ __typename?: 'Venue', _id: any, countryIso2: string, name: string }> } }> };

export type LandingMyUpcomingCompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type LandingMyUpcomingCompetitionsQuery = { __typename?: 'Query', getMyUpcomingCompetitions: Array<{ __typename?: 'Wcif', _id: any, name: string, competitionId: string, schedule: { __typename?: 'Schedule', _id: any, startDate: string, numberOfDays: number, venues: Array<{ __typename?: 'Venue', _id: any, countryIso2: string, name: string }> } }> };

export type NewFindMyManagableCompetitionQueryVariables = Exact<{ [key: string]: never; }>;


export type NewFindMyManagableCompetitionQuery = { __typename?: 'Query', findMyManagableCompetitions: Array<{ __typename?: 'WcifFetch', name: string, start_date: string, end_date: string, competitionId: string, country_iso2: string }> };

export type ResultsGetOpenRoundsQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type ResultsGetOpenRoundsQuery = { __typename?: 'Query', getOpenRounds: Array<{ __typename?: 'Round', _id: any, id: string }> };

export type RoutingFindByCompetitionIdQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type RoutingFindByCompetitionIdQuery = { __typename?: 'Query', getWcifByCompetitionId?: Maybe<{ __typename?: 'Wcif', name: string, shortName: string, _id: any }> };

export type SetupCompetitionCompetitorsQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type SetupCompetitionCompetitorsQuery = { __typename?: 'Query', getWcifByCompetitionId?: Maybe<{ __typename?: 'Wcif', _id: any, persons: Array<{ __typename?: 'Person', _id: any, name: string, wcaUserId: number, wcaId?: Maybe<string>, registrantId?: Maybe<number>, countryIso2: string, gender: string, birthdate?: Maybe<string>, email?: Maybe<string> }> }> };

export type SetupCompetitionEventsQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type SetupCompetitionEventsQuery = { __typename?: 'Query', getWcifByCompetitionId?: Maybe<{ __typename?: 'Wcif', _id: any, events: Array<{ __typename?: 'Event', _id: any, id: string, competitorLimit: number, rounds: Array<{ __typename?: 'Round', _id: any, id: string, format: string, scrambleSetCount: number, advancementCondition: { __typename?: 'AdvancementCondition', _id: any, type: string, level: Array<number> }, timeLimit: Array<{ __typename?: 'TimeLimit', _id: any, centiseconds: number, cumulativeRoundIds: Array<string> }>, cutoff: { __typename?: 'Cutoff', _id: any, numberOfAttempts: number, attemptResult: Array<number> } }>, qualification: { __typename?: 'Qualification', _id: any, when: string, type: string, attemptResult: Array<number> } }> }> };

export type SetupCompetitionInfoQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type SetupCompetitionInfoQuery = { __typename?: 'Query', getWcifByCompetitionId?: Maybe<{ __typename?: 'Wcif', _id: any, name: string, shortName: string, competitorLimit: number }> };
