import React, { Component } from 'react'
import { Steps, PageHeader  } from 'antd'
import './style.less'

import AddDrawings from './add_drawing'
import DrawsUpload from '../../publicComponents/upload.jsx'

import { connect } from 'react-redux'
import { creatNewDrawing } from '../store/actionCreaters'


const { Step } = Steps

class AddDrawingProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      preStepVisible: false
    };
  }

  next = (params) => {
    const current = this.state.current + 1;
    this.setState({ current });
    this.props.creatNewDrawing(params)
    this.setState({
      preStepVisible: true
    })
  }

  prev= () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  //取消按钮
  comeBack = () => {
    this.props.history.push('/app/drawing_manage')
  }

  //发送图纸文档
  sentDrawDocuemnts = (params) => {
    console.log(params)
  }

  //完成创建
  finishCreate = () => {
    this.props.history.push('/app/drawing_manage')
  }

  render() {
    const { current, preStepVisible } = this.state
    const steps = [
      {
        title: '图纸信息填写',
        content: <AddDrawings
                  next={this.next}
                  history={this.props.history}
                />
      },
      {
        title: '图纸文件上传',
        content: <DrawsUpload
                    visible={preStepVisible}
                    prev={this.prev}
                    beginUpload={this.sentDrawDocuemnts}
                    finish={this.finishCreate}
                  />
      }
    ]
    return (
      <div>
        { current === 0 ? 
          <PageHeader
            onBack={() => this.props.history.push('/app/drawing_manage')}
            title="返回"
          />  : null
        }
        <div  className="stpes">
          <Steps current={current} size="small" className="steps-header">
            {steps.map(item => (
              <Step key={item.title} title={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
        </div>
       
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    creatNewDrawing: data => dispatch(creatNewDrawing(data)),
  }
}

export default  connect(null, mapDispatchToProps)(AddDrawingProcess)
