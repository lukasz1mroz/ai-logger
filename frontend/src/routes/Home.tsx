import {Button, Card, Divider, Form, Input, Switch, Upload} from 'antd'
import {InfoCircleOutlined, UploadOutlined} from '@ant-design/icons'
import React, {useState} from 'react'
import {getFileReport} from '../utils/apiHandler'
import ResultWrapper from '../components/ResultWrapper'
import {SwitchStates} from '../types'
import './Home.css'

const App: React.FC = () => {
  const [activeTabKey, setActiveTabKey] = useState<string>('app')
  const [tabs, setTabs] = useState<any>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [switchStates, setSwitchStates] = useState<SwitchStates>({
    traffic: true,
    snippets: true,
    actionPlan: true,
  })

  const handleTabChange = (key: string) => {
    setActiveTabKey(key)
  }

  const handleOnClick = async (): Promise<any> => {
    try {
      setIsLoading(true)
      const aiResponse = await getFileReport(selectedFile as File, switchStates)
      setTabs(aiResponse.data)
    } catch (e) {
      setLoadError(true)
      console.log('Error: ', e)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwitchChange = (name: string) => {
    setSwitchStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }))
  }

  return (
    <div className="home">
      {/* Form */}
      <Form className="formWrapper" colon={false}>
        <Divider className="firstDivider">Data</Divider>
        <Form.Item
          className="upload-button"
          name="file" valuePropName="true">
          <Upload
            maxCount={1}
            beforeUpload={(file) => {
              setSelectedFile(file)
              return false
            }}
          >
            <Button icon={<UploadOutlined />}>
              Click here to upload file
            </Button>
          </Upload>
        </Form.Item>
        <Divider>Customization</Divider>
        <Form.Item
          label="Traffic" valuePropName="checked" tooltip={{
            title: 'Customize the report by providing additional filters',
            icon: <InfoCircleOutlined />,
          }}>
          <Switch checked={switchStates.traffic} onChange={() => handleSwitchChange('traffic')} style={{float: 'right'}} />
        </Form.Item>
        <Form.Item label="Snippets" valuePropName="checked">
          <Switch checked={switchStates.snippets} onChange={() => handleSwitchChange('snippets')} style={{float: 'right'}} />
        </Form.Item>
        <Form.Item
          label="Action plan"
          valuePropName="checked"
        >
          <Switch checked={switchStates.actionPlan} onChange={() => handleSwitchChange('actionPlan')} style={{float: 'right'}} />
        </Form.Item>
        {/* <Divider>Sharing</Divider>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ]}
        >
          <Input />
        </Form.Item> */}
        <Button
          block type="primary" htmlType="submit"
          disabled={isLoading}
          onClick={handleOnClick}>
          Generate report
        </Button>
      </Form>
      {/* Body */}
      <div className="reportWrapper">
        <Card
          title="Application report"
          bordered={false}
          style={{height: '90%'}}
          onTabChange={handleTabChange}
          activeTabKey={activeTabKey}
        >
          <ResultWrapper tabs={tabs} isLoading={isLoading} loadError={loadError} />
        </Card>
        <Divider style={{paddingTop: '1.5%'}}>
          2024
        </Divider>
      </div>
    </div>
  )
}

export default App
