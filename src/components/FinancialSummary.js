import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Utils from '../utils';

const N_DAYS = 30;
const BALANCE_THRESHOLD = 15000;
class FinancialSummary extends Component {
  componentDidMount() {}
  render() {
    const { bankTxns } = this.props;

    //calculate the bank balance
    const balance = bankTxns.reduce((accumulator, txn) => {
      return accumulator + txn.amount;
    }, 0);

    //calculate the total invoices created within the last 30days.
    const epochNDaysBack = Utils.getDateNDaysFromToday(N_DAYS).getTime();
    const bankTxnsCountInPastNDays = bankTxns.reduce((count, txn) => {
      if (txn.created > epochNDaysBack) {
        count += 1;
      }
      return count;
    }, 0);

    // Balance Threshold class
    const thresh_clz =
      balance > BALANCE_THRESHOLD
        ? 'is-success'
        : balance < 0
        ? 'is-danger'
        : 'is-warning';

    return (
      <div className='tile'>
        <div className='tile is-parent'>
          <article className={'tile is-child notification ' + thresh_clz}>
            <p className='title'>{Utils.printAmount(balance)}</p>
            <p className='subtitle'>Available bank balance</p>
          </article>
        </div>
        <div className='tile is-parent'>
          <article className='tile is-child notification is-info'>
            <p className='title'>{bankTxnsCountInPastNDays}</p>
            <p className='subtitle'>Bank transactions (Last 30days)</p>
          </article>
        </div>
      </div>
    );
  }
}
// function used by connect below, will be called with redux state, take the required fields from the state and return them to be used as props by the component
function mapStateToProps({ invoices, bankTxns }) {
  return { invoices, bankTxns };
}

//wrapping the BankTransactions components with React Redux connect with maps the state as props for the components
export default connect(mapStateToProps)(FinancialSummary);
