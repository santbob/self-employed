import React from 'react';

const Header = () => (
  <nav
    className='navbar is-success'
    role='navigation'
    aria-label='main navigation'
  >
    <div className='navbar-brand'>
      <a className='navbar-item' href='/'>
        <img
          src='/self-employed-logo.png'
          alt='Self Employed - A Financial App'
          width='50'
          height='50'
        />
        <p className='title is-4'>Self Employed</p>
      </a>
    </div>
  </nav>
);

export default Header;
