import * as ACTION from '../actions/types';
import * as Utils from '../utils';

const invoicesReducer = (state = [], action) => {
  const { invoice } = action;
  switch (action.type) {
    case ACTION.ADD_INVOICE:
      return [
        {
          id: Utils.randomString(16),
          clientName: invoice.clientName,
          created: Date.now(),
          amount: parseInt(invoice.amount, 10)
        },
        ...state
      ];
    case ACTION.EDIT_INVOICE:
      return state.map(inv => {
        return inv.id === invoice.id
          ? { ...invoice }
          : { ...inv, updated: Date.now() };
      });
    case ACTION.DELETE_INVOICE:
      return state.filter(inv => {
        return inv.id !== invoice.id;
      });
    default:
      return state;
  }
};

export default invoicesReducer;
