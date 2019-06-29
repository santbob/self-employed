import { combineReducers } from 'redux';
import invoicesReducer from './invoices';
import bankTxnsReducer from './bankTxns';

export default combineReducers({
  invoices: invoicesReducer,
  bankTxns: bankTxnsReducer
});
