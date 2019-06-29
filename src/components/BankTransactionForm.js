import React, { Component } from 'react';

class BankTransactionForm extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  // the form state
  state = {
    description: '',
    invoiceId: '',
    amount: 0
  };

  // event handler for form submission
  onFormSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { description, invoiceId, amount } = this.state;

    if (onSubmit && description && invoiceId && amount) {
      onSubmit({
        description,
        invoiceId,
        amount: amount * 100
      });
    }
  }
  // event handler for cancel button click
  onCancel(event) {
    event.preventDefault();
    const { onClose } = this.props;
    if (onClose) {
      onClose();
    }
  }
  // manages the state of the input elements and keeps the state upto date.
  handleInputChange(event) {
    const { invoices } = this.props;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    // read the name and updated value from the input element and create and update obj to update the state
    const update = {
      [name]: value
    };
    // when the changed field is invoiceId, fetch the invoice amount and update the amount value in the state to ease of use
    if (name === 'invoiceId') {
      update.amount = invoices[target.selectedIndex - 1].amount / 100;
    }
    this.setState(update);
  }

  render() {
    const { invoices } = this.props;
    const { description, invoiceId, amount } = this.state;

    return (
      <form onSubmit={this.onFormSubmit} className='section'>
        <h3 className='title is-3'>Add a bank transaction</h3>
        <div className='field'>
          <label className='label'>Description</label>
          <div className='control'>
            <input
              name='description'
              className='input'
              type='text'
              placeholder='e.g Payment for work'
              value={description}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Invoice</label>
          <div className='control'>
            <div className='select'>
              <select
                value={invoiceId}
                onChange={this.handleInputChange}
                name='invoiceId'
              >
                <option key=''>Select a client</option>
                {invoices &&
                  invoices.map(inv => (
                    <option key={inv.id} value={inv.id}>
                      {inv.clientName}
                    </option>
                  ))}
              </select>
            </div>
          </div>
        </div>
        <div className='field'>
          <label className='label'>Amount</label>
          <div className='control'>
            <input
              name='amount'
              className='input'
              type='number'
              placeholder='100.50'
              value={amount}
              step='0.50'
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className='field is-grouped is-grouped-centered'>
          <p className='control'>
            <button className='button is-success' type='submit'>
              Submit
            </button>
          </p>
          <p className='control'>
            <button className='button is-black' onClick={this.onCancel}>
              Cancel
            </button>
          </p>
        </div>
      </form>
    );
  }
}

export default BankTransactionForm;
