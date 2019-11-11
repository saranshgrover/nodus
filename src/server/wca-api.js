import { WCA_ORIGIN } from './wca-env'
import { wcaAccessToken } from './auth'
import { pick } from './tools'
import moment from 'moment'

export const getWcifPublic = competitionId =>
  wcaApiFetch(`/competitions/${competitionId}/wcif/public`)

export const getWcif = competitionId =>
  wcaApiFetch(`/competitions/${competitionId}/wcif`)

export const getMyUpcomingComps = userId => {
  return wcaApiFetch(`/users/${userId}?upcoming_competitions=true`)
}

export const getAllUpcomingComps = pageNum => {
  let today = moment().startOf('day')
  let nextWeek = moment()
    .add(7, 'days')
    .startOf('day')
  const params = new URLSearchParams({
    start: today.toISOString(),
    end: nextWeek.toISOString(),
    page: pageNum
  })
  return wcaApiFetch(`/competitions?${params.toString()}`)
}

export const getMyManagableComps = () => {
  const today = moment().startOf('day')
  const params = new URLSearchParams({
    managed_by_me: true,
    start: today.toISOString()
  })
  return wcaApiFetch(`/competitions?${params.toString()}`)
}

export const getMe = () => wcaApiFetch(`/me`)

const wcaApiFetch = (path, fetchOptions = {}) => {
  const baseApiUrl = `${WCA_ORIGIN}/api/v0`

  return fetch(
    `${baseApiUrl}${path}`,
    Object.assign({}, fetchOptions, {
      headers: new Headers({
        Authorization: `Bearer ${wcaAccessToken()}`,
        'Content-Type': 'application/json'
      })
    })
  )
    .then(response => {
      if (!response.ok) throw new Error(response.statusText)
      return response
    })
    .then(response => response.json())
}

const updateWcif = (competitionId, wcif) =>
  wcaApiFetch(`/competitions/${competitionId}/wcif`, {
    method: 'PATCH',
    body: JSON.stringify(wcif)
  })

export const saveWcifChanges = (previousWcif, newWcif) => {
  const keysDiff = Object.keys(newWcif).filter(
    key => previousWcif[key] !== newWcif[key]
  )
  if (keysDiff.length === 0) return Promise.resolve()
  return updateWcif(newWcif.id, pick(newWcif, keysDiff))
}
