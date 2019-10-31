  
import { WCA_ORIGIN } from './wca-env';
import { wcaAccessToken} from './auth'
import moment from 'moment';

export const getWcif = (competitionId) =>
  wcaApiFetch( `/competitions/${competitionId}/wcif`);

  export const getMyUpcomingCompetitions = () => {
    const today = moment().startOf('day');
    const params = new URLSearchParams({
      managed_by_me: true,
      start: today.toISOString(),
    });
    return wcaApiFetch(`/competitions?${params.toString()}`);
  };

  export const getMe = () => wcaApiFetch( `/me`);
  

const wcaApiFetch = async ( path, fetchOptions = {}) => {
    const baseApiUrl = `${WCA_ORIGIN}/api/v0`
    const response = await fetch(`${baseApiUrl}${path}`, Object.assign({}, fetchOptions, {
        headers: new Headers({
            Authorization: `Bearer ${wcaAccessToken()}`,
            'Content-Type': 'application/json',
        }),
    }));
    if (!response.ok)
        throw new Error(response.statusText);
    const response_1 = response;
    return await response_1.json();
  };