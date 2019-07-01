import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { addBankTxn } from '../actions';
import BankTransactionForm from './BankTransactionForm';
import DataTable from './DataTable';

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

  // utility function to open the modal
  openTxnModal() {
    this.setState({ isModalOpen: true });
  }
  // utility function to close the modal
  closeTxnModal() {
    this.setState({ isModalOpen: false });
  }

  // this fn is called when the modal is submitted with txn details to create a bank transaction
  onAddTxn = txn => {
    const { addBankTxn } = this.props;
    addBankTxn(txn);
    this.closeTxnModal();
  };

  render() {
    const { bankTxns, clz, invoices } = this.props;
    const { isModalOpen } = this.state;

    const columns = [
      {
        title: 'Date',
        type: 'date',
        key: 'created'
      },
      {
        title: 'Invoice',
        key: 'invoiceId'
      },
      {
        title: 'Description',
        key: 'description'
      },
      {
        title: 'Amount',
        type: 'money',
        key: 'amount'
      }
    ];
    return (
      <div className={clz}>
        <header className='has-background-grey'>
          <h4 className='title is-4 has-text-white is-clearfix'>
            Bank Transactions
            <span
              className='button is-link is-inverted is-pulled-right is-outlined'
              onClick={this.openTxnModal}
            >
              Add a Bank Transaction
            </span>
          </h4>
        </header>
        <DataTable
          columns={columns}
          rows={bankTxns}
          onRowClick={this.onRowClick}
          tableClz='has-background-grey'
          tableKey='bnkTxn'
        />
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

// function used by connect below, will be called with redux state, take the required fields from the state and return them to be used as props by the component
function mapStateToProps({ bankTxns, invoices }) {
  return { bankTxns, invoices };
}

//wrapping the BankTransactions components with React Redux connect with maps the state as props for the components
export default connect(
  mapStateToProps,
  { addBankTxn }
)(BankTransactions);
