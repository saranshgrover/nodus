  import { WCA_ORIGIN } from './wca-env';
import { wcaAccessToken} from './auth'
import moment from 'moment';

export const getWcif = (competitionId) =>
  wcaApiFetch( `/competitions/${competitionId}/wcif`);

export let myComps = []
const ifMyComp = (comp) => {
  getMe().then(user => {
    const id = user.me.id
    wcaApiFetch(`/competitions/${comp.id}/wcif/public`).then(resp => {
      const persons = resp.persons
      persons.forEach(function(person) {
        if(person.wcaUserId === id) {
          console.log("true")
          return true
        }
      })
      return false
    })
  })
}
export const getMyUpcomingComps = () => {
  let i = 0;
  while(i<50) {
    getAllUpcomingComps(i).then(comps => {
      console.log(comps.filter(ifMyComp))
    })
    i++
  }
}

export const getAllUpcomingComps = (pageNum) => {
  let today = moment().startOf('day');
  let nextWeek = moment().add(19,'days').startOf('day')
  const params = new URLSearchParams({
    start: today.toISOString(),
    end: nextWeek.toISOString(),
    page : pageNum
  })
    return wcaApiFetch(`/competitions?${params.toString()}`)
  }

  export const getMyManagableComps = () => {
    const today = moment().startOf('day');
    const params = new URLSearchParams({
      managed_by_me: true,
      start: today.toISOString()
    });
    return wcaApiFetch(`/competitions?${params.toString()}`);
  };

  export const getMe = () => wcaApiFetch( `/me`);


  const wcaApiFetch = (path, fetchOptions = {}) => {
    const baseApiUrl = `${WCA_ORIGIN}/api/v0`;
  
    return fetch(
      `${baseApiUrl}${path}`,
      Object.assign({}, fetchOptions, {
        headers: new Headers({
          Authorization: `Bearer ${wcaAccessToken()}`,
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
