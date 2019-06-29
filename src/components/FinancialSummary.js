import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Utils from '../utils';

const N_DAYS = 30;
const BALANCE_THRESHOLD = 100;
class FinancialSummary extends Component {
  componentDidMount() {}
  render() {
    const { invoices, bankTxns } = this.props;

    //calculate the bank balance
    const balance = bankTxns.reduce((accumulator, txn) => {
      return accumulator + txn.amount;
    }, 0);

    //calculate the total invoices created within the last 30days.
    const epochNDaysBack = Utils.getDateNDaysFromToday(N_DAYS).getTime();
    const invoicesCount = invoices.reduce((count, inv) => {
      if (inv.created > epochNDaysBack) {
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
            <p className='subtitle'>Bank balance</p>
          </article>
        </div>
        <div className='tile is-parent'>
          <article className='tile is-child notification is-info'>
            <p className='title'>{invoicesCount}</p>
            <p className='subtitle'>Invoices (Last 30days)</p>
          </article>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ invoices, bankTxns }) {
  return { invoices, bankTxns };
}

export default connect(mapStateToProps)(FinancialSummary);
