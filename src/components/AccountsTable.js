import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableFooter from '@material-ui/core/TableFooter';
import Button from './Button'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  
  tableContainer: {
    width: '60%',
  },
  tableHeader: {
    fontWeight: '600'
  },
  tableTitle: {
    fontSize: '22px',
    color: '#b53131',
    fontWeight: '600'
  },
  tableFooter: {
    fontSize: '16px',
    fontWeight: '600'
  }
});

export default function AccountsTable({accounts, totalBalance, handleClick}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className={classes.tableContainer}>
      <Table className={classes.table} aria-label="customized table">
        
        <TableHead>
          <TableRow>

            <StyledTableCell 
              component="th" 
              scope="column" 
              className={classes.tableTitle}
            >
              Account List
            </StyledTableCell>
            
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
 
          <TableRow>

            <StyledTableCell 
              component="th" 
              scope="column" 
              className={classes.tableHeader}>
                Account Number
            </StyledTableCell>
            
            <StyledTableCell 
              component="th" 
              scope="column" 
              className={classes.tableHeader}>
                Account Type
            </StyledTableCell>
            
            <StyledTableCell 
              component="th" 
              scope="column" 
              className={classes.tableHeader}>
                Balance
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>

          </TableRow>
        </TableHead>

        <TableBody>

          {accounts.map(account => (
            <StyledTableRow key={account.account_number}>
        
              <StyledTableCell>{account.account_number}</StyledTableCell>
              <StyledTableCell>{account.account_type}</StyledTableCell>
              <StyledTableCell>{`ZAR ${parseFloat(account.balance)}`}</StyledTableCell>
            
              <StyledTableCell>
                <Button 
                  title="Withdraw" 
                  account_type={account.account_type} 
                  balance={account.balance} 
                  onClick={() => handleClick(account)}/>
              </StyledTableCell>

            </StyledTableRow>
          ))}

        </TableBody>

        <TableFooter>
          <TableRow>

            <StyledTableCell className={classes.tableFooter}> 
              Balance
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell className={classes.tableFooter}>
              ZAR {totalBalance}
            </StyledTableCell>
          
          </TableRow>
        </TableFooter>

      </Table>
    </TableContainer>
  );
}

AccountsTable.propTypes = {
  accounts: PropTypes.array,
  totalBalance: PropTypes.number,
  openModal: PropTypes.func
}