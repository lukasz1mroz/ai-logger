import React from 'react'
import {Link} from 'react-router-dom'
import {Menu} from 'antd'
import type {MenuProps} from 'antd'

export enum Pages {
  home = '/',
  help = '/help',
  contact = '/contact',
}

const items: MenuProps['items'] = [
  {
    key: Pages.home,
    label: <Link to={Pages.home}>Home Page</Link>,
  },
  {
    key: Pages.help,
    label: <Link to={Pages.help}>Help</Link>,
  },
  {
    key: Pages.contact,
    label: <Link to={Pages.contact}>Contact</Link>,
  },
]

const Navigation: React.FC = () => (
  <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={['/']}
    items={items}
    style={{ flex: 1, minWidth: 0, display: 'flex', justifyContent: 'flex-end' }}
  />
)

export default Navigation
