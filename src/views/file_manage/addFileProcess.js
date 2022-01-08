import React, { Component } from 'react'
import { Steps, PageHeader, message  } from 'antd'
import './style.less'

import AddFiles from './add_file'
import FilesUpload from '../../publicComponents/upload.jsx'

import { connect } from 'react-redux'
import { creatNewFiles } from '../store/actionCreaters'

import reqwest from 'reqwest';

import { originalUrl, uploadFilesUrl,createDocumentUrl } from '../../dataModule/UrlList'
import { Model } from '../../../src/dataModule/testBone'

const { Step } = Steps
const model = new Model();

class AddFilesProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
      preStepVisible: false,
    };
  }

  next = (params) => {
    const current = this.state.current + 1;
    this.setState({ current });
    console.log(params)
    this.props.creatNewFiles(params)
    this.setState({
      preStepVisible: true
    })
  }

  prev = () => {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  //返回按钮
  comeBack = () => {
    const initData = {
      name: '',
      document_type: '',
      part_code: '',
      project_code: '',
      zss_id: '',
      tag:'',
      dss_type: ''
    }
    this.props.creatNewFiles(initData)
    this.props.history.push('/app/file_manage')
  }

  //发送文档
  sentFilesDocuemnts = (fileId, formData) => {
    const me = this
  //   for (var value of params.values()) {
  //     console.log(value);
  //  }
    console.log('formData', formData)
    formData.append('fileId', fileId) 
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
          message.success('文件上传成功');
          me.props.history.push('/app/file_manage')
        }
      },
      error: () => {
        message.error('文件上传失败');
      },
    });
  }

   //创建文档描述信息
  createDocument = (data, formData) => {
    const me = this
    // console.log('newDocument', data)
    // for (let i in newDraw) {
    // // if (newDraw[i] === '' || newDraw[i] === undefined) {
    // //     message.error('信息未填写完整！')
    // //     return
    // // }
    // }
    model.fetch(
      data,
      createDocumentUrl,
      'post',
      function (res) {
        // console.log(222, res)
        message.success('创建文档成功！')
        me.sentFilesDocuemnts(res.data, formData)
      },
      function (error) {
          message.error('创建文档失败！')
      },
      false
    )
  }

  //完成创建
  finishCreate = (formData) => {
    this.createDocument(this.props.newFilesData, formData)
    // this.props.history.push('/app/file_manage')
  }

  render() {
    const folderData = this.props
    const { current, preStepVisible } = this.state
    const steps = [
      {
        title: '文档信息填写',
        content: <AddFiles
                  next={this.next}
                  history={this.props.history}
                />
      },
      {
        title: '文件上传',
        content: <FilesUpload
                    visible={preStepVisible}
                    prev={this.prev}
                    beginUpload={this.finishCreate}
                  />
      }
    ]
    return (
      <div>
        { current === 0  && folderData['folderData'] !== 'folder' ? 
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
    newFilesData: state.get('viewsReducer').get('newFilesData').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    creatNewFiles: data => dispatch(creatNewFiles(data)),
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(AddFilesProcess)
