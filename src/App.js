import React, 
  {
    useState, 
    useEffect,
    useCallback
  } from 'react'

import axios from 'axios';
import {Layout, AccountsTable } from './components';
import Modal from '@material-ui/core/Modal';
import Button from './components/Button'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import './App.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: 150,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  textField: {
    marginTop: '20px',
    marginBottom: '30px'
  },
  button: {
    padding: '0px 220px'
  }


}));


function App() {
  const classes = useStyles();

  const [accounts, setAccounts] = useState([]);
  const [totalBalance, setTotalBalance] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [amountVal, setAmountVal] = React.useState('');
  const [activeAccount, setActiveAccount] = React.useState({}); 
  
  useEffect(() => {
    makeRequest();
  }, []);

  async function makeRequest() {
    try {
      const response = await axios.get("http://localhost:8080/api/accounts");
      
      if(response.data) {
        setAccounts(response.data);
      }

    } catch (error) {
      alert(error);
    }
  }

  const calculateTotalBalance = useCallback(() => {
    if(accounts.length) {
      const total = accounts.reduce((accumulator, account) => accumulator + parseFloat(account.balance), 0);
      setTotalBalance(total);
    }

  }, [accounts])

  useEffect(() => {
    calculateTotalBalance()
  }, [ calculateTotalBalance])
  
  const openModal = account => {
    setActiveAccount(account)
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const makeWithdrawal = ()  => {
    const accountType = activeAccount.account_type;
    const availableAmount = parseFloat(activeAccount.balance);
    const withdrawalAmount = parseFloat(amountVal);

    if(accountType === 'savings' && withdrawalAmount > availableAmount) {
      alert(`Unsuccessful: You can not withdraw ${availableAmount} or more from savings account`)
      return;
    }

    if(accountType === 'cheque' && withdrawalAmount > (availableAmount + 500)) {
      alert(`Unsuccessful: You can not withdraw ${withdrawalAmount} or more from check account`)
      return;
    }

    const newBalance = totalBalance - withdrawalAmount;
    setTotalBalance(newBalance);
    alert(`Successful: withdrawn ${withdrawalAmount}`);
    updateAvailableBalance(withdrawalAmount)
    setOpen(false)
  }

  const updateAvailableBalance = withdrawalAmount => {
    const newAccountBalance = parseFloat(activeAccount.balance) - withdrawalAmount
    const foundIndex = accounts.findIndex(acc => acc.account_type === activeAccount.account_type);
    const tempAccounts = accounts;

    const updatedAccount = {...activeAccount, balance: newAccountBalance.toString()};

    tempAccounts[foundIndex] = updatedAccount;

    setAccounts(tempAccounts);
  }
  
  // @TODO, move modal to it's own component.
  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  function handleInputChange (event) {
    setAmountVal(event.target.value)
  }

  return (
    <div className="App">
      <Layout>

        <AccountsTable 
          accounts={accounts} 
          totalBalance={totalBalance} 
          handleClick={openModal}/>
        
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        >
          <div style={modalStyle} className={classes.paper}>
            <h4>Add amount to withdraw</h4>
            <form 
              noValidate 
              autoComplete="off" 
              className={classes.form}>
              <TextField 
                id="accountBtn" 
                label="amount" 
                variant="outlined" 
                className={classes.textField}
                onChange={handleInputChange}
                />
                

              <Button 
                title="Withdraw amount" 
                onClick={makeWithdrawal} 
                className={classes.button}/>
            </form>
          
          </div>

        </Modal>

      </Layout> 

    </div>
  );
}

export default App;
