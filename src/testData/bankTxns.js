import * as Utils from '../utils';

const bankTxnsTestDataHelper = function(invoices) {
  var result = [];
  for (let i = 0; i < invoices.length - 5; i++) {
    const inv = invoices[i];
    var txn = {
      id: `b_${Utils.randomString(10)}`,
      description:
        inv.amount >= 0
          ? `Invoice payment by ${inv.clientName}`
          : `Refund to ${inv.clientName}`,
      invoiceId: inv.id,
      amount: inv.amount
    };

    var d = new Date(inv.created);
    d.setHours(d.getHours() + Utils.getRandomInt(1, 2));
    txn.created = d.getTime();
    result.push(txn);
  }
  // sort by date in descending order
  return result.sort((a, b) => (a.created < b.created ? 1 : -1));
};

export default bankTxnsTestDataHelper;
