import invoicesTestDataHelper from './invoices';
import bankTxnsTestDataHelper from './bankTxns';

const generateTestData = function() {
  const invoices = invoicesTestDataHelper();
  const bankTxns = bankTxnsTestDataHelper(invoices);
  return {
    invoices,
    bankTxns
  };
};

export default generateTestData;
