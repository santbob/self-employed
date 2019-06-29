import React, { Component } from 'react';
import * as Utils from '../utils';

// The component used to create or edit an invoice.
class InvoiceForm extends Component {
  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  // the form state
  state = {
    clientName: '',
    amount: 0,
    id: '',
    created: 0
  };

  componentDidMount() {
    let { clientName, amount, created = Date.now(), id } = this.props.invoice;
    amount = amount / 100;
    this.setState({ clientName, amount, id, created });
  }

  // event handler for form submission, validates the input and call back the onSubmit fn props with the entered values
  onFormSubmit(event) {
    event.preventDefault();
    const { onSubmit } = this.props;
    const { clientName, amount, id, created } = this.state;

    if (onSubmit && clientName && amount) {
      onSubmit({
        id,
        created,
        clientName,
        amount: amount * 100 // convert to cents
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

  // keep the state updated by listening for changes in the input elements
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { clientName, amount, created, id } = this.state;
    return (
      <form onSubmit={this.onFormSubmit} className='section'>
        <h3 className='title is-3'>
          {id ? 'Edit the Invoice' : 'Add an Invoice'}
        </h3>
        <div className='field'>
          <label className='label'>Invoice Date</label>
          <div className='control'>{Utils.printDate(created)}</div>
        </div>
        <div className='field'>
          <label className='label'>Client Name</label>
          <div className='control'>
            <input
              name='clientName'
              className='input'
              type='text'
              placeholder='e.g John Doe'
              value={clientName}
              onChange={this.handleInputChange}
            />
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
              onChange={this.handleInputChange}
            />
          </div>
        </div>

        <div className='field is-grouped is-grouped-centered'>
          <p className='control'>
            <button className='button is-success' type='submit'>
              {id ? 'Edit Invoice' : 'Add Invoice'}
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

export default InvoiceForm;
