  
import { WCA_ORIGIN } from './wca-env';
import { wcaAccessToken} from './auth'

export const getWcif = (competitionId) =>
  wcaApiFetch( `/competitions/${competitionId}/wcif`);

const wcaApiFetch = ( path, fetchOptions = {}) => {
    const baseApiUrl = `${WCA_ORIGIN}/api/v0`;
    console.log(path)
    return fetch(
      `${baseApiUrl}${path}`,
      Object.assign({}, fetchOptions, {
        headers: new Headers({
          Authorization: `Bearer ${wcaAccessToken}`,
          'Content-Type': 'application/json',
        }),
      })
    )
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        return response;
      })
      .then(response => response.json());
  };