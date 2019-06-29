import * as ACTION from '../actions/types';
import * as Utils from '../utils';

const bankTxnsReducer = (state = [], action) => {
  const { txn } = action;
  switch (action.type) {
    case ACTION.ADD_BANK_TXN:
      return [
        {
          id: Utils.randomString(16),
          description: txn.description,
          invoiceId: txn.invoiceId,
          created: Date.now(),
          amount: parseInt(txn.amount, 10)
        },
        ...state
      ];
    case ACTION.EDIT_BANK_TXN:
      return state.map(t => {
        return t.id === txn.id ? { ...txn } : t;
      });
    default:
      return state;
  }
};

export default bankTxnsReducer;
