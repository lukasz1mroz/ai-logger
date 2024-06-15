import React from 'react'
import {Layout} from 'antd'

import './Help.css'

const About: React.FC = () => (
  <Layout>
    <Layout.Content className="about">
      <h1>Easy to use starting code base for React application.</h1>
      <h2>Features</h2>
      <p>
        This boilerplate was bootstrapped with{' '}
        <a
          href="https://github.com/facebook/create-react-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Create React App
        </a>
        . On top of that, it contains:
      </p>
      <ul>
        <li>
          ESLint setup and rules
          <ul>
            <li>
              We think that sharing coding standards is a good practice. There
              are some rules which should be followed by all, while some can be
              specific for each team.
            </li>
          </ul>
        </li>
        <li>
          React Components
          <ul>
            <li>
              Who would like to code design from scratch all the time. You can
              reuse our existing react components which are already styled to
              fit colors and style guides and it also provides rich set of
              Ant.design components.
            </li>
          </ul>
        </li>
        <li>
          React Router
          <ul>
            <li>
              React Router is a de-facto standard for routing in React
              applications so why not to have it in the Starter Repo.
            </li>
          </ul>
        </li>
        <li>
          TypeScript
          <ul>
            <li>
              We believe using TypeScript can in the long term speed up and ease
              the development process and prevent bugs in a runtime. This repo
              supports both JavaScript files and TypeScript files, though we
              strongly recommend to use types.
            </li>
          </ul>
        </li>
        <li>
          DCS in markdown
          <ul>
            <li>
              Technical documentation of the project should stay close to the
              code and be updated together with it. There are SDLC Community
              Tools in place which uploads DCS from &apos;sdlc/dcs/&apos; folder
              to Confluence and also export a Word document for upload to Midas
            </li>
          </ul>
        </li>
      </ul>
    </Layout.Content>
  </Layout>
)
export default About
