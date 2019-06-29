import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import * as Utils from '../utils';
import InvoiceForm from './InvoiceForm';
import { addInvoice, updateInvoice } from '../actions';

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

  handleInvoiceEdit = event => {
    const tr = event.target.parentElement;
    const { invoices } = this.props;
    if (tr && tr.tagName === 'TR' && tr.id) {
      this.openInvoiceModal(invoices[tr.rowIndex - 1]);
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

    return (
      <div className={clz}>
        <header className='has-background-success'>
          <h4 className='title is-4 has-text-white is-clearfix'>
            Invoices
            <span
              className='button is-primary is-inverted is-pulled-right is-outlined'
              onClick={this.openInvoiceModal}
            >
              Add an Invoice
            </span>
          </h4>
        </header>
        <table className='table is-fullwidth is-striped'>
          <thead className='has-background-success'>
            <tr>
              <th className='has-text-white'>Date</th>
              <th className='has-text-white'>Id</th>
              <th className='has-text-white'>Client Name</th>
              <th className='has-text-white'>Amount</th>
              <th className='has-text-white has-text-centered'>Status</th>
            </tr>
          </thead>
          <tbody onClick={this.handleInvoiceEdit}>
            {invoices.map(inv => (
              <tr key={inv.id} id={inv.id}>
                <td>{Utils.printDate(inv.created)}</td>
                <td>{inv.id}</td>
                <td>{inv.clientName}</td>
                <td className='has-text-right'>
                  {Utils.printAmount(inv.amount)}
                </td>
                <td className='has-text-centered'>
                  {inv.amount === paidInvoicesMap[inv.id] ? 'PAID' : 'NOT PAID'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

function mapStateToProps({ invoices, bankTxns }) {
  return { invoices, bankTxns };
}

export default connect(
  mapStateToProps,
  { addInvoice, updateInvoice }
)(InvoicesList);
