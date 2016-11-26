/** @flow */

import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Icon } from '../components/icons/FontAwesome'

import type { State } from '../reducers'
import type { IconType } from '../components/icons/FontAwesome'

const HeaderLink = ({to, icon, label}: {to: string, label: string, icon: IconType}) => (
  <span>
    <Icon type={icon}/>
    {' '}
    <Link to={to}>{label}</Link>
  </span>
)

const LoggedHeader = [
  <li key="/draft"><HeaderLink to="/draft" label="NEW ARTICLE" icon="plus"/></li>,
  <li key="/me"><HeaderLink to="/me" label="MY PROFILE" icon="user-circle"/></li>,
  <li key="/signout"><HeaderLink to="/signout" label="SIGN OUT" icon="sign-out"/></li>,
]

const GuestHeader = [
  <li key="/signup"><HeaderLink to="/signup" label="SIGN UP" icon="user-plus"/></li>,
  <li key="/signin"><HeaderLink to="/signin" label="SIGN IN" icon="sign-in"/></li>,
]

const Header = ({logged}: {logged: boolean}) => (
  <header className='header'>
    <div className='header-wrap'>
      <h1 className='logo'>SciMS</h1>

      <nav className='nav'>
        <ul>
          <li><HeaderLink to="/" label="HOME" icon="home"/></li>
          <li><HeaderLink to="/" label="CATEGORIES" icon="database"/></li>
          <li><HeaderLink to="/" label="ARCHIVES" icon="archive"/></li>

          { logged ? LoggedHeader : GuestHeader }
        </ul>
      </nav>

      <div className='clear-float'></div>
    </div>
  </header>
)

function mapStateToProps(state: State) {
  return {
    logged: !!state.account.currentUser,
  }
}

export default connect(mapStateToProps)(Header)
