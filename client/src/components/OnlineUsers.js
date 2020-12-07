import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ScrollToBottom from 'react-scroll-to-bottom'
import {Paper,ListSubheader, Icon, Grid, Modal, List, ListItem, Divider, ListItemText, ListItemAvatar, Card, CardContent, CardHeader, Button, Avatar, CssBaseline, TextField, Typography, Container } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    height:'80vh'
  },
  gridList: {
    width: 500,
    height: 450,
  },
  status:{
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor:'#BDBDBD',
    padding:'10px'
  }
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function ImageGridList(props) {
  const {users}=props
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.status}>
        <Typography>Online</Typography>
      </div>
      <List >
          <ScrollToBottom className={classes.chat} >
          {
              users.map(user =>{
                  return(
                      <>
                      <ListItem key={user} alignItems="center">
                          <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                          </ListItemAvatar>
                          <ListItemText
                          primary={user.name}
                          secondary={
                              <React.Fragment>
                              <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                              >
                                  {/* {message.text} */}
                              </Typography>

                              </React.Fragment>
                          }
                          />
                      </ListItem>
                      </>
                  )
              })
          }
          </ScrollToBottom>
      </List>
      {/* <GridList cellHeight={160} className={classes.gridList} cols={1}>
        <p>Online</p>
        {users.map((tile) => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </GridListTile>
        ))}
      </GridList> */}
    </div>
  );
}