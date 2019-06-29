import React from 'react';

//constructor the page header to be used in all pages.
const Header = () => (
  <nav
    className='navbar has-background-info'
    role='navigation'
    aria-label='main navigation'
  >
    <div className='navbar-brand'>
      <a className='navbar-item' href='/'>
        {/* <img
          src='/self-employed-logo.png'
          alt='Self Employed - A Financial App'
          width='50'
          height='50'
        /> */}
        <p className='title is-4 has-text-white'>Self Employed</p>
      </a>
    </div>
  </nav>
);

export default Header;
