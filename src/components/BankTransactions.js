import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as Utils from '../utils';
import ReactModal from 'react-modal';

import { addBankTxn } from '../actions';
import BankTransactionForm from './BankTransactionForm';

class BankTransactions extends Component {
  constructor(props) {
    super(props);
    this.openTxnModal = this.openTxnModal.bind(this);
    this.closeTxnModal = this.closeTxnModal.bind(this);
    ReactModal.setAppElement('#root');
  }

  state = {
    isModalOpen: false
  };

  openTxnModal() {
    this.setState({ isModalOpen: true });
  }

  closeTxnModal() {
    this.setState({ isModalOpen: false });
  }

  onAddTxn = txn => {
    const { addBankTxn } = this.props;
    addBankTxn(txn);
    this.closeTxnModal();
  };

  render() {
    const { bankTxns, clz, invoices } = this.props;
    const { isModalOpen } = this.state;
    return (
      <div className={clz}>
        <header className='has-background-success'>
          <h4 className='title is-4 has-text-white is-clearfix'>
            Bank Transactions
            <span
              className='button is-primary is-inverted is-pulled-right is-outlined'
              onClick={this.openTxnModal}
            >
              Add a Bank Transaction
            </span>
          </h4>
        </header>
        <table className='table is-striped is-fullwidth'>
          <thead className='has-background-success'>
            <tr>
              <th className='has-text-white'>Date</th>
              <th className='has-text-white'>Invoice Id</th>
              <th className='has-text-white'>Description</th>
              <th className='has-text-white'>Amount</th>
            </tr>
          </thead>
          <tbody>
            {bankTxns.map(txn => (
              <tr key={txn.id}>
                <td>{Utils.printDate(txn.created)}</td>
                <td>{txn.invoiceId}</td>
                <td>{txn.description}</td>
                <td className='has-text-right'>
                  {Utils.printAmount(txn.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReactModal
          className='Modal'
          overlayClassName='Overlay'
          isOpen={isModalOpen}
          onRequestClose={this.closeTxnModal}
          contentLabel='Modal'
        >
          {isModalOpen && (
            <BankTransactionForm
              invoices={invoices}
              onSubmit={this.onAddTxn}
              onClose={this.closeTxnModal}
            />
          )}
        </ReactModal>
      </div>
    );
  }
}

function mapStateToProps({ bankTxns, invoices }) {
  return { bankTxns, invoices };
}

export default connect(
  mapStateToProps,
  { addBankTxn }
)(BankTransactions);
