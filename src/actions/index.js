import * as ACTION from './types';

// Note - move related actions into its own file, if its becomes complex
// invoices related actions
export function addInvoice(invoice) {
  return { type: ACTION.ADD_INVOICE, invoice };
}

export function updateInvoice(invoice) {
  return { type: ACTION.EDIT_INVOICE, invoice };
}

export function deleteInvoice(invoice) {
  return { type: ACTION.DELETE_INVOICE, invoice };
}

export function loadInvoices() {
  return { type: ACTION.LIST_INVOICES };
}

// Bank txn related actions
export function addBankTxn(txn) {
  return { type: ACTION.ADD_BANK_TXN, txn };
}

export function updateBankTxn(txn) {
  return { type: ACTION.EDIT_BANK_TXN, txn };
}

export function loadBankTransactions() {
  return { type: ACTION.LIST_BANK_TXNS };
}
