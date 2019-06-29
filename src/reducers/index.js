import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import invoicesReducer from './invoices';
import bankTxnsReducer from './bankTxns';

const rootReducer = history =>
  combineReducers({
    invoices: invoicesReducer,
    bankTxns: bankTxnsReducer,
    router: connectRouter(history)
  });

export default rootReducer;
