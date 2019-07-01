import PropTypes from 'prop-types';

export const BankTxnShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  invoiceId: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  created: PropTypes.number.isRequired
});

export const InvoiceShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  clientName: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  created: PropTypes.number.isRequired
});
