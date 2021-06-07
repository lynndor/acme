import React from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  appBar: {
    background: 'linear-gradient(335deg, rgba(54,2,2,1) 0%, rgba(210,60,60,1) 100%)',
    color: '#FFF'
  },
  title: {
    flexGrow: 1,
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100vh',
  }
}));

const Layout = ({children}) => {

  const classes = useStyles();  

  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Acme Bank
          </Typography>
        </Toolbar>
      </AppBar>

      <section className={classes.wrapper}>
        {children}
      </section>
    </>
  )
}

export default Layout;