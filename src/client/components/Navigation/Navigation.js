import React from 'react'

import Link from 'components/Link'

import cx from './Navigation.scss'

const Navigation = ({ className }) => (
  <ul className={cx('base', className)} role='navigation'>
    <li className={cx('item')}>
      <Link className={cx('link')} activeClassName={cx('link--isActive')} to='/sessions'>Sessions</Link>
    </li>
  </ul>
)

export default Navigation
