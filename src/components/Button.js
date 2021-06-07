import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {Button as MatButton} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  button: {
    background: "#4bb745",
    color:"#FFFFFF",
    fontWeight: '500'
  }, 
}));

const Button = ({onClick, title, account_type, balance}) => {
  const classes = useStyles();  
  
  return (
    <MatButton 
      onClick={onClick}
      className={classes.button}
      disabled={account_type === 'savings' && balance < 0}
    >
      {title}
    </MatButton>
  )
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
  title: PropTypes.string,
  account_type: PropTypes.string,
  balance: PropTypes.string,
};