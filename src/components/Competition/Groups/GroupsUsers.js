import React, { useState } from 'react'
import Link from '@material-ui/core/Link'
import Autocomplete from '@material-ui/lab/Autocomplete'
import GroupsUser from './GroupsUser'
import CompetitorList from './CompetitorList'
import CompetitionStatus from '../Status/CompetitionStatus'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { isHappening } from '../../../server/tools'

export default function GroupsUsers({ history, wcif, match }) {
  const persons = wcif.persons
  const getUserLink = user => (user.wcaId ? user.wcaId : user.wcaUserId)
  const getUser = id =>
    isNaN(id)
      ? persons.find(person => person.wcaId === id)
      : persons.find(person => person.wcaUserId === parseInt(id))
  const [person, setPerson] = useState(
    match.params.wcaId ? getUser(match.params.wcaId) : persons[0]
  )
  const handleChange = (event, values) => {
    setPerson(values)
    history.push(
      `/competitions/${wcif.id}/groups/competitors/${getUserLink(values)}`
    )
  }
  return (
    <Grid spacing={4} container direction='column' alignItems='center'>
      {isHappening(wcif.schedule) && <CompetitionStatus wcif={wcif} />}
      <Grid item>
        <Breadcrumbs style={{ fontSize: '5vmin' }}>
          <Link
            color='inherit'
            href={`/competitions/${wcif.id}/groups/competitors`}
          >
            Competitors
          </Link>
          {person && (
            <Link
              color='inherit'
              href={`/competitions/${wcif.id}/groups/competitors/${getUserLink(
                person
              )}`}
            >
              {person.name}
            </Link>
          )}
        </Breadcrumbs>
      </Grid>
      {person && (
        <Grid item>
          <Autocomplete
            onChange={handleChange}
            options={persons}
            getOptionLabel={person =>
              `${person.name} ${person.wcaId ? `- ${person.wcaId}` : ''}`
            }
            style={{ width: 300 }}
            value={person}
            renderInput={params => (
              <TextField
                {...params}
                label='Select Competitor'
                variant='outlined'
                fullWidth
              />
            )}
          />
        </Grid>
      )}
      {person ? (
        <GroupsUser
          wcaId={person.wcaId ? person.wcaId : person.wcaUserId}
          userInfo={person}
          wcif={wcif}
        />
      ) : (
        <CompetitorList onClick={handleChange} competitors={persons} />
      )}
    </Grid>
  )
}
