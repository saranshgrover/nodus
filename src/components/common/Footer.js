import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
// import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { makeStyles } from '@material-ui/core/styles';
import GitHubIcon from '@material-ui/icons/GitHub';
import { version } from '../../../package.json';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    bottom: "0",
    width: "100%",
  },
  grow: {
    flexGrow: 1,
  },
  link: {
    verticalAlign: 'middle',
    fontWeight: 500,
    color: grey[50],
    '&:hover': {
      textDecoration: 'none',
      opacity: 0.7,
    },
  },
}));

const links = [
  {
    text: 'Guide',
    url: 'https://github.com/saranshgrover/WCAProjector/wiki/',
  },
  { text: 'GitHub', url: 'https://github.com/saranshgrover/WCAProjector' },
  { text: 'Contact', url: 'mailto:ycubiksrube@gmail.com@gmail.com' },
  {
    text: `v${version}`,
    url: 'https://github.com/saranshgrover/WCAProjector',
  },
];

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <Grid item>
      </Grid>
      <Grid item className={classes.grow} />
      <Grid item>
        <Grid container spacing={1}>
          {links.map(({ text, url }) => (
            <Grid item key={text}>
              <Link
                className={classes.link}
                variant="body2"
                href={url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {text}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;