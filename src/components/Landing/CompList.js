import React from "react";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
// eslint-disable-next-line no-unused-vars
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import FlagIconFactory from "react-flag-icon-css";
import { compDatesToString } from "../../server/tools";
const FlagIcon = FlagIconFactory(React, { useCssModules: false });

export default function CompList({ myUpcomingComps }) {
  return (
    <Paper>
      <List subheader={<ListSubheader>Upcoming Competitions</ListSubheader>}>
        {myUpcomingComps.map(comp => {
          return (
            <ListItem
              alignItems='flex-start'
              key={comp.id}
              button
              component={Link}
              to={`/competitions/${comp.id}/overview`}
            >
              <ListItemIcon
                children={
                  <FlagIcon
                    size={"2x"}
                    code={comp.country_iso2.toLowerCase()}
                  />
                }
              />
              <ListItemText
                key={comp.id + "-about"}
                primary={comp.name}
                secondary={
                  <React.Fragment key={comp.id + "-fragment"}>
                    <Typography
                      key={comp.id + "date"}
                      component='span'
                      variant='body2'
                      color='textPrimary'
                    >
                      {compDatesToString(comp.start_date, comp.end_date)}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
}
