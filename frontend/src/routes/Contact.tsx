import React from 'react'
import {Button} from 'antd'

import './Contact.css'

const Contact: React.FC = () => (
  <div className="contact">
    <p>If you have any questions or comments, feel free to contact us.</p>
    <a href="mailto:lukasz1mroz@gmail.com">
      <Button
        block={false}
        ghost={false}
        htmlType="button"
        loading={false}
        type="primary"
      >
        Contact The Owners
      </Button>
    </a>
  </div>
)

export default Contact
