import React from 'react'
import { NavLink as RouterLink } from 'react-router-dom'

import './Link.scss'

const Link = ({
  to: propsTo,
  href: propsHref,
  children,
  type,
  params,
  search,
  exact,
  ...otherProps
}) => {
  const to = propsTo || propsHref

  let LinkComponent = RouterLink
  let extraProps = {
    to,
  }

  if (!to && type === 'submit') {
    LinkComponent = 'button'
    extraProps = {
      type,
    }
  } else if (!to) {
    LinkComponent = 'a'
    extraProps = {
      href: null,
    }
  } else if (to && (
    to.startsWith('http://')
    || to.startsWith('https://')
    || to.startsWith('//')
    || to.startsWith('mailto:')
    || to.startsWith('tel:')
  )) {
    LinkComponent = 'a'
    extraProps = {
      href: to,
      target: '_blank',
    }
  } else {
    LinkComponent = RouterLink
    extraProps = {
      to: {
        pathname: to,
      },
      exact,
    }
  }

  if (extraProps.target === '_blank' || otherProps.target === '_blank') {
    extraProps.rel = 'noopener noreferrer'
  }

  return (
    <LinkComponent {...extraProps} {...otherProps}>
      {children}
    </LinkComponent>
  )
}

export default Link
