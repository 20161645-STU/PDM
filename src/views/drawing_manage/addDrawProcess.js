import React, { Component } from 'react'
import { Steps, PageHeader, Button, message  } from 'antd'
import './style.less'

import AddDrawings from './add_drawing'
import DrawsUpload from './drawingUpload'

const { Step } = Steps

const steps = [
  {
    title: '图纸信息填写',
    content: <AddDrawings />
  },
  {
    title: '图纸文件上传',
    content: <DrawsUpload/>,
  }
];

class AddDrawingProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  //取消按钮
  comeBack = () => {
    this.props.history.push('/app/drawing_manage')
  }

  render() {
    const { current } = this.state
    return (
      <div>
         <PageHeader
          onBack={() => this.props.history.push('/app/drawing_manage')}
          title="返回"
        />
        <div  className="stpes">
          <Steps current={current} size="small" className="steps-header">
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-buttons">
            <div className="steps-action">
              {current < steps.length - 1 && (
                <Button type="primary" onClick={() => this.next()}>
                  下一步
                </Button>
              )}
              {current === steps.length - 1 && (
                <Button type="primary" onClick={() => message.success('Processing complete!')}>
                  确定
                </Button>
              )}
              {current > 0 && (
                <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                  上一步
                </Button>
              )}
            </div>
            <Button onClick={this.comeBack}>取消</Button>
            </div>
        </div>
       
      </div>
    )
  }
}

export default AddDrawingProcess
