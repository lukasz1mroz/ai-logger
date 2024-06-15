import React from 'react'
import { Layout } from 'antd'
const { Header } = Layout
import './Page.css'
import Navigation from './Navigation'

type Props = {
  children: React.ReactNode
}

const Page: React.FC<Props> = ({children}) => (
  <div className="page">
    <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'space-between', color: 'white' }}>
        <img src={process.env.PUBLIC_URL + '/logo.svg'} style={{ marginRight: '10px' }} alt="logo" />
        <p style={{ fontFamily: 'Arial', fontSize: '20px' }}>Log Analyzer</p>
      </div>
      <Navigation />
    </Header>
    <div className="page__content">{children}</div>
  </div>
)

export default Page
