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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  getTodo: Todo;
  getWcifById: Wcif;
  getMyUpcomingCompetitions: Array<Wcif>;
  getWcifByCompetitionId?: Maybe<Wcif>;
  getOpenRounds: Round;
  getAllWcifs: Array<Wcif>;
  getTopCompetitors: Array<Person>;
  getUser?: Maybe<User>;
  /** Returns the current logged in User. If no user is logged in, returns Null */
  getMe?: Maybe<User>;
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
  createdAt?: Maybe<Scalars['DateTime']>;
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
  updateUser?: Maybe<User>;
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


export const ContextGetCompetitionDocument = gql`
    query ContextGetCompetition($competitionId: String!) {
  getWcifByCompetitionId(competitionId: $competitionId) {
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
export type ContextGetCompetitionQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type ContextGetCompetitionQuery = { __typename?: 'Query', getWcifByCompetitionId?: Maybe<{ __typename?: 'Wcif', name: string, shortName: string, _id: any, competitionId: string, settings: { __typename?: 'Setting', colorTheme: string }, persons: Array<{ __typename?: 'Person', _id: any, wcaUserId: number, registrantId?: Maybe<number> }>, schedule: { __typename?: 'Schedule', _id: any, startDate: string, numberOfDays: number, venues: Array<{ __typename?: 'Venue', _id: any, timezone: string, name: string, rooms: Array<{ __typename?: 'Room', _id: any, id: number, name: string, color: string, activities: Array<{ __typename?: 'Activtiy', _id: any, id: number, name: string, activityCode: string, startTime: string, endTime: string, childActivities: Array<{ __typename?: 'ChildActivity', _id: any, id: number, name: string, activityCode: string, startTime: string, endTime: string }> }> }> }> } }> };

export type LandingAllUpcomingCompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type LandingAllUpcomingCompetitionsQuery = { __typename?: 'Query', getAllWcifs: Array<{ __typename?: 'Wcif', _id: any, name: string, competitionId: string, schedule: { __typename?: 'Schedule', _id: any, startDate: string, numberOfDays: number, venues: Array<{ __typename?: 'Venue', _id: any, countryIso2: string, name: string }> } }> };

export type LandingMyUpcomingCompetitionsQueryVariables = Exact<{ [key: string]: never; }>;


export type LandingMyUpcomingCompetitionsQuery = { __typename?: 'Query', getMyUpcomingCompetitions: Array<{ __typename?: 'Wcif', _id: any, name: string, competitionId: string, schedule: { __typename?: 'Schedule', _id: any, startDate: string, numberOfDays: number, venues: Array<{ __typename?: 'Venue', _id: any, countryIso2: string, name: string }> } }> };

export type RoutingFindByCompetitionIdQueryVariables = Exact<{
  competitionId: Scalars['String'];
}>;


export type RoutingFindByCompetitionIdQuery = { __typename?: 'Query', getWcifByCompetitionId?: Maybe<{ __typename?: 'Wcif', name: string, shortName: string, _id: any }> };
