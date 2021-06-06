import { Button } from 'antd'
import React, { Component } from 'react'
import DrawUpload from '../../publicComponents/inputStyleUploadFile.jsx'

class DrawingUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  //上一步
  prev = () => {
    this.props.prev()
  }

  //取消创建
  cancle = () => {
    this.props.history.push('/app/drawing_manage')
  }


  render() {
    return (
      <div>
        <DrawUpload />
        <div className="steps-buttons">
          <Button type="primary">确定</Button>
          <Button style={{marginLeft:'20px'}} onClick={ this.prev }>上一步</Button>
          <Button style={{marginLeft:'20px'}} onClick={ this.cancle }>取消</Button>
        </div>
      </div>
    )
  }
}
 
export default DrawingUpload