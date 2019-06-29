import React from 'react';
import Header from './components/Header';
import BankTransactions from './components/BankTransactions';
import FinancialSummary from './components/FinancialSummary';
import InvoicesList from './components/InvoicesList';

const Home = () => (
  <div>
    <Header />
    <div className='container'>
      <section className='section'>
        <FinancialSummary />
      </section>

      <section className='columns'>
        <BankTransactions clz='widget column is-half' />
        <InvoicesList clz='widget column is-half' />
      </section>
    </div>
  </div>
);

export default Home;
