import React, { useState } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import GroupsUser from './GroupsUser'
import TextField from '@material-ui/core/TextField'
import { Grid } from '@material-ui/core'

export default function GroupsGeneral({ wcif }) {
  const persons = wcif.persons
  const [person, setPerson] = useState(persons[0])
  const handleChange = (event, values) => {
    setPerson(values)
  }
  return (
    <Grid container direction='column' alignItems='center'>
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
              label='Competitor'
              variant='outlined'
              fullWidth
            />
          )}
        />
      </Grid>
      <Grid item>
        <GroupsUser
          WCAID={person.wcaId ? person.wcaId : person.wcaUserId}
          userInfo={person}
          wcif={wcif}
        />
      </Grid>
    </Grid>
  )
}
