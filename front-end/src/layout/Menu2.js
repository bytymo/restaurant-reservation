import React from 'react'

import { Link } from 'react-router-dom'

import logo from '../images/logo.png'

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu2() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark align-items-start p-0 mr-0'>
      <div className='container-fluid d-flex flex-column p-0'>
        <Link
          className='navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0'
          to='/'
        >
          <div className='sidebar-brand-text mx-3'>
            <div className='text-center my-3 mx-0'>
              <img src={logo} alt='periodic tables logo' />
            </div>{' '}
            <span>Periodic Tables</span>
          </div>
        </Link>
        <button
          class='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span class='navbar-toggler-icon'></span>
        </button>
        <hr className='sidebar-divider my-0' />
        <div class='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='nav navbar-nav text-light' id='accordionSidebar'>
            <li className='nav-item'>
              <Link className='nav-link' to='/dashboard'>
                <span className='oi oi-dashboard' />
                &nbsp;Dashboard
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/search'>
                <span className='oi oi-magnifying-glass' />
                &nbsp;Search
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/reservations/new'>
                <span className='oi oi-plus' />
                &nbsp;New Reservation
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' to='/tables/new'>
                <span className='oi oi-layers' />
                &nbsp;New Table
              </Link>
            </li>
          </ul>
        </div>

        <div className='text-center d-none d-md-inline'>
          <button
            className='btn rounded-circle border-0'
            id='sidebarToggle'
            type='button'
          />
        </div>
      </div>
    </nav>
  )
}

export default Menu2
