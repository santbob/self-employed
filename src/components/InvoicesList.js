import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import InvoiceForm from './InvoiceForm';
import { addInvoice, updateInvoice } from '../actions';
import DataTable from './DataTable';

class InvoicesList extends Component {
  constructor(props) {
    super(props);
    this.openInvoiceModal = this.openInvoiceModal.bind(this);
    this.closeInvoiceModal = this.closeInvoiceModal.bind(this);
    ReactModal.setAppElement('#root');
  }

  state = {
    isModalOpen: false,
    selectedInvoice: null
  };

  handleInvoiceEdit = inv => {
    if (inv) {
      this.openInvoiceModal(inv);
    }
  };

  openInvoiceModal(inv) {
    this.setState({ isModalOpen: true, selectedInvoice: inv });
  }

  closeInvoiceModal() {
    this.setState({ isModalOpen: false, selectedInvoice: null });
  }

  onAddInvoice = inv => {
    const { addInvoice, updateInvoice } = this.props;
    if (inv && inv.id) {
      updateInvoice(inv);
    } else {
      addInvoice(inv);
    }
    this.closeInvoiceModal();
  };

  render() {
    const { invoices, bankTxns, clz } = this.props;
    const { isModalOpen, selectedInvoice } = this.state;

    const paidInvoicesMap = {};
    bankTxns.forEach(txn => {
      if (!paidInvoicesMap[txn.invoiceId]) {
        paidInvoicesMap[txn.invoiceId] = txn.amount;
      } else {
        paidInvoicesMap[txn.invoiceId] += txn.amount;
      }
    });
    // column configuration for the DataTable
    const columns = [
      {
        title: 'Date',
        type: 'date',
        key: 'created'
      },
      {
        title: 'Id',
        key: 'id'
      },
      {
        title: 'Client Name',
        key: 'clientName'
      },
      {
        title: 'Amount',
        type: 'money',
        key: 'amount'
      },
      {
        title: 'Status',
        key: 'status',
        colCallback: row => {
          return row.amount === paidInvoicesMap[row.id] ? 'PAID' : 'NOT PAID';
        },
        clz: 'has-text-centered'
      }
    ];
    return (
      <div className={clz}>
        <header className='has-background-grey-dark'>
          <h4 className='title is-4 has-text-white is-clearfix'>
            Invoices
            <span
              className='button is-link is-inverted is-pulled-right is-outlined'
              onClick={this.openInvoiceModal}
            >
              Add an Invoice
            </span>
          </h4>
        </header>
        <DataTable
          columns={columns}
          rows={invoices}
          onRowClick={this.handleInvoiceEdit}
          tableClz='has-background-grey-dark'
          tableKey='inv'
        />
        <ReactModal
          className='Modal'
          overlayClassName='Overlay'
          isOpen={isModalOpen}
          onRequestClose={this.closeInvoiceModal}
          contentLabel='Modal'
        >
          {isModalOpen && (
            <InvoiceForm
              invoice={selectedInvoice}
              onSubmit={this.onAddInvoice}
              onClose={this.closeInvoiceModal}
            />
          )}
        </ReactModal>
      </div>
    );
  }
}

// function used by connect below, will be called with redux state, take the required fields from the state and return them to be used as props by the component
function mapStateToProps({ invoices, bankTxns }) {
  return { invoices, bankTxns };
}

//wrapping the BankTransactions components with React Redux connect with maps the state as props for the components
export default connect(
  mapStateToProps,
  { addInvoice, updateInvoice }
)(InvoicesList);
