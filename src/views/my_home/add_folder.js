import React, { Component } from 'react';
import { PageHeader, Form, Input, Button, message } from 'antd';

import { getUserId } from '../../publicFunction/index'

import { Model } from '../../dataModule/testBone'
import { creatFolderUrl } from '../../../src/dataModule/UrlList'

const { TextArea } = Input;
const model = new Model()

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      tag: '',
      is_frozen: '0',
      user_id: getUserId(),
      category_index: '',
      is_reviewed: '0',
      language: '中文',
      check_out_workspace_vault: '',
      code_generator: '',
      created_by: '',
      folder_type: '',
      process_status: '',
      project_code: '',
      workspace_vault: '',
      part_no: '',
      version:''
    }
  }

  //确定按钮
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err) => {
      if (!err) {
        const newFolder = this.state
        this.createFolder(newFolder)
      }
    })
  }

  //创建文件夹
  createFolder = (params) => {
    let me = this
    model.fetch(
      params,
      creatFolderUrl,
      'post',
      function () {
        message.success('文件夹创建成功')
        me.comeBack()
      },
      function (error) {
        message.error('文件夹失败！')
      },
      false
    )
  }

  //取消创建
  comeBack = () => {
    this.props.history.push('/app/my_home')
  }

  //获取输入信息
  handChange = (key, value) => {
    const newFolderData = this.state
    newFolderData[key] = value
    // console.log(newFolderData)
    this.setState(newFolderData)
  }
    
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        span: 6
      },
      wrapperCol: {
        span: 18,
      },
    };
      return(
        <div>
          <PageHeader
            onBack={() => this.props.history.push('/app/my_home')}
            title="返回"
          />
            <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}}  { ...formItemLayout }>
              <Form.Item
                label="文件夹名称"
                colon
              >
                {getFieldDecorator('name', {
                  rules: [{ required: true, message: '输入相应的文件夹名称' }],
                })(
                    <Input style={{ width: '300px', marginLeft: '30px' }}
                      onChange={e => this.handChange('name', e.target.value)} allowClear
                    />
                )}
              </Form.Item>
              <Form.Item
                 label="文件夹描述"
                 colon
              >
                <TextArea style={{ width: '300px', marginLeft: '30px' }} rows={3}
                  onChange={e => this.handChange('tag', e.target.value)} 
                />
            </Form.Item>
            <Form.Item>
              <div style={{margin:'30px 300px',width:'200px',}}>
                <Button type='primary' htmlType="submit">确定</Button>
                <Button style={{marginLeft:'20px'}} onClick={this.comeBack}>取消</Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'add_folder' })(AddFolder);

export default WrappedNormalLoginForm

