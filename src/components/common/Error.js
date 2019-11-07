import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import {makeStyles, createStyles} from '@material-ui/core/styles'
import ErrorIcon from '@material-ui/icons/Error';

export default function Error({message}) {
    const useStyles = makeStyles((theme) =>
        createStyles({
            root: {
                width: '100%',
                height: '100%',
                textAlign: 'center',
            },
        }),
        );
    const classes = useStyles()
    return (
        <Container>
            <div className={classes.root}>
                <ErrorIcon style={{fontSize:50}}/>
                <Typography variant="h1">ERROR</Typography>
                <Typography variant="subtitle1">{message}</Typography>
            </div>
        </Container>
        )
}
