import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {Pages} from './components/Navigation'
import Page from './components/Page'
import Home from './routes/Home'
import Help from './routes/Help'
import Contact from './routes/Contact'

import { ConfigProvider } from 'antd';

import './index.css'

const App: React.FC = () => (
  <BrowserRouter>
    <ConfigProvider>
      <Page>
        <Routes>
          <Route path={Pages.home} element={<Home />} />
          <Route path={Pages.help} element={<Help />} />
          <Route path={Pages.contact} element={<Contact />} />
        </Routes>
      </Page>
    </ConfigProvider>
  </BrowserRouter>
)

export default App
