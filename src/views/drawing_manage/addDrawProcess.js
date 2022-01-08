import React, { Component } from 'react'
import { Steps, PageHeader, message  } from 'antd'
import './style.less'

import AddDrawings from './add_drawing'
import DrawsUpload from '../../publicComponents/upload.jsx'

import { connect } from 'react-redux'
import { creatNewDrawing } from '../store/actionCreaters'

import { originalUrl, uploadFilesUrl,createDrawUrl } from '../../dataModule/UrlList'
import { Model } from '../../../src/dataModule/testBone'

import reqwest from 'reqwest';

const model = new Model();
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
    // console.log(params)
    this.props.creatNewDrawing(params)
    this.setState({
      preStepVisible: true
    })
  }

  prev= () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

 
  //返回按钮
  comeBack = () => {
    const initData = {
      name: '',
      product_group: '',
      standard: '',
      part_code: '',
      project_code: '',
      substance: '',
      weight: '',
      weight_unit: '',
      tag:'',
      dss_type: ''
    }
    this.props.creatNewDrawing(initData)
    this.props.history.push('/app/drawing_manage')
  }



   //创建新图纸描述信息
  createNewDrawing = (data, formData) => {
    let me = this
    // console.log('newDraw', data)
    // for (let i in newDraw) {
    // // if (newDraw[i] === '' || newDraw[i] === undefined) {
    // //     message.error('信息未填写完整！')
    // //     return
    // // }
    // }
    model.fetch(
      data,
      createDrawUrl,
      'post',
      function (res) {
        // console.log(6666, res.data)
        message.success('创建图纸成功！')
        me.sentFilesDocuemnts(res.data, formData)
      },
      function (error) {
          message.error('创建图纸失败！')
      },
      false
    )
  }

  //上传文件
  sentFilesDocuemnts = (drawId, formData) => {
  //   for (var value of params.values()) {
  //     console.log(value);
  //  }
  let me = this
    formData.append('fileId', drawId) 
    reqwest({
      url: originalUrl + uploadFilesUrl,
      method: 'post',
      processData: false,
      data: formData,
      success: (res) => {
        // console.log(res)
        if (res.message === '上传成功') {
          this.setState({
            fileList: []
          });
          message.success('图纸文件上传成功');
          me.props.history.push('/app/drawing_manage')
        }
      },
      error: () => {
        message.error('图纸文件上传失败');
      },
    });
  }

 

  //完成创建
  finishCreate = (formData) => {
    this.createNewDrawing(this.props.newDrawingData, formData)
    // this.props.history.push('/app/drawing_manage')
  }

  render() {
    const folderData = this.props
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
                    beginUpload={this.finishCreate}
                  />
      }
    ]
    return (
      <div>
        { current === 0 && folderData['folderData'] !== 'folder' ? 
          <PageHeader
             onBack={() => this.comeBack()}
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

const mapStateToProps = (state) => {
  return {
    newDrawingData: state.get('viewsReducer').get('newDrawingData').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    creatNewDrawing: data => dispatch(creatNewDrawing(data)),
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(AddDrawingProcess)
