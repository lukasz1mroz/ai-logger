import {Spin, Tabs} from 'antd'
import React from 'react'
const {TabPane} = Tabs

interface Tab {
  title: string;
  label: string;
  content: string;
}

interface ResultWrapperProps {
  tabs: Tab[];
  isLoading: boolean;
  loadError: boolean;
}

const ResultWrapper: React.FC<ResultWrapperProps> = ({tabs, isLoading, loadError}) => {
  if (isLoading) {
    return <Spin />
  } else if (tabs.length > 0) {
    const headers = /^(Error Description|Traffic Data|Log Snippets|Suggested Next Steps):$/
    return (
      <Tabs>
        {tabs.map((tab: Tab) => (
          <TabPane tab={tab.title} key={tab.title}>
            <div style={{overflow: 'auto', maxHeight: '550px', textAlign: 'left'}}>
              {tab.content.split('\n').map((str, idx) => {
                if (headers.test(str)) {
                  return <h3 key={`${str.slice(0, 3)}-${idx}}`}>{str}</h3>
                }
                return <p key={`${str.slice(0, 3)}-${idx}}`}>{str}</p>
              })}
            </div>
          </TabPane>
        ))}
      </Tabs>
    )
  } else if (loadError) {
    return <p>Error</p>
  }
  return <p>Start page</p>
}

export default ResultWrapper
