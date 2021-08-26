import React, { Component, Fragment } from 'react';
import { Input, DatePicker, Button, PageHeader, Form, message,Select } from 'antd';
import { Model } from '../../../src/dataModule/testBone'
import { createProjectUrl } from '../../../src/dataModule/UrlList'
import { getUserName } from '../../../src/publicFunction'

const model = new Model();
const { Option } = Select;
const { TextArea } = Input;

class ProgramCreat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',   //项目名称
      description: '',  //项目描述
      planning_start_date: '',    //计划项目开始时间
      planning_end_date: '',     //计划项目结束时间
      sourcing: '',     //项目来源
      planning_period: '',    //计划项目周期
      admin: getUserName(),        //项目负责人
      project_group: '',
      type: 'project',
      status:'1'
    }
  }


  //获得创建新项目的各个数据
  handChange = (key, value) => {
    const newProjectData = this.state
    if (key === 'planning_start_date' || key === 'planning_end_date') {
      if (value !== null) {
        if (value._isAMomentObject) {
          newProjectData[key] = value.format('YYYY-MM-DD')
        }
      } else {
        newProjectData[key] = ""
      }  
    } else {
      newProjectData[key] = value
    } 
    // console.log(newDrawsData)
    this.setState(newProjectData)
  }

  //创建新项目
  createProject = (params) => {
    let me = this
    // for (let i in newDraw) {
    // // if (newDraw[i] === '' || newDraw[i] === undefined) {
    // //     message.error('信息未填写完整！')
    // //     return
    // // }
    // }
    model.fetch(
      params,
      createProjectUrl,
      'post',
      function (res) {
          message.success('创建项目成功！')
          me.comeBack()
      },
      function (error) {
          message.error('创建项目失败！')
      },
      false
    )
  }

  //恢复初始化 
  initState = () => {
    const initData = {}
    const newProject = this.state
    for (let i in newProject) {
        initData[i] = ''
    }
    initData['status'] = '1'
    initData['type'] = 'project'
    initData['created_by'] = getUserName()
    this.setState(initData)
  }


  //确定按钮
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err) => {
      if (!err) {
        const newProject = this.state
        // console.log('newProject', newProject)
        this.createProject(newProject)
      }
    })
  }

  //取消创建
  comeBack = () => {
    this.initState()
    this.props.history.push('/app/program_manage')
  }

  render() {
    const { getFieldDecorator } = this.props.form
    // const { ,name, description, sourcing, planning_period, admin,project_group } = this.state
    const groupNames = [{ group_name: '创课堂' }, { group_name: '群智空间' }, { group_name: '数字化车间' }]
    const sourcingNames = [{source_name: '校内'}, {source_name: '企业'}]

    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 14,
      },
    }

    return (
      <Fragment>
        <PageHeader
          onBack={() =>  this.props.history.push('/app/program_manage')}
          title="返回"
        />
        <Form onSubmit={this.handleSubmit} style={{marginTop:'30px'}} { ...formItemLayout }>
          <Form.Item
            label="项目名称"
            colon
          >
            {getFieldDecorator('name', {
                rules: [{ required: true, message: '输入相应的项目名称' }],
            })(
              <Input
                style={{ width: '300px'}}
                onChange={e => this.handChange('name', e.target.value)}
                allowClear
              />
            )}
          </Form.Item>

          <Form.Item
            label="描述"
            colon
          >
            <TextArea style={{ width: '300px'}} rows={3}
              onChange={e => this.handChange('description', e.target.value)} />
          </Form.Item>

          <Form.Item
            label="项目组"
            colon
          >
            {getFieldDecorator('project_group', {
                rules: [{ required: true, message: '请选择所在项目组' }],
            })(
              <Select style={{ width: '300px' }}
                onChange={(e) => this.handChange('project_group', e)} allowClear>
                {groupNames.map((item, index) => {
                  return <Option
                          value={item.group_name}
                          key={index}
                          onClick={() => {this.setState({project_group: item.group_name})}}
                      >{item.group_name}</Option>
                }) }
            </Select>
            )}
          </Form.Item>

          <Form.Item
             label="项目计划开始时间"
             colon
          >
            {getFieldDecorator('planning_start_date', {
                rules: [{ required: true, message: '输入项目的计划开始时间' }],
            })(
              <DatePicker
                style={{ width: '300px' }}
                onChange={dateString => this.handChange('planning_start_date', dateString)}
                allowClear
              />
            )}
          </Form.Item>

          <Form.Item
            label="项目计划结束时间"
            colon
          >
             {getFieldDecorator('planning_end_date', {
                rules: [{ required: true, message: '输入项目的计划结束时间' }],
            })(
              <DatePicker
                style={{ width: '300px' }}
                onChange={dateString => this.handChange('planning_end_date', dateString)}
                allowClear
              />
            )}
          </Form.Item>

          <Form.Item
             label="项目计划周期"
             colon
          >
            {getFieldDecorator('planning_period', {
                rules: [{ required: true, message: '输入项目的计划周期' }],
            })(
              <Input
                style={{ width: '300px' }}
                onChange={e => this.handChange('planning_period', e.target.value)}
                allowClear
              />
            )}
          </Form.Item>

          <Form.Item
             label="项目来源"
             colon
          >
            {getFieldDecorator('sourcing', {
                rules: [{ required: true, message: '输入项目来源' }],
            })(
              <Select style={{ width: '300px' }}
                onChange={(e) => this.handChange('sourcing', e)} allowClear>
                {sourcingNames.map((item, index) => {
                  return <Option
                          value={item.source_name}
                          key={index}
                          onClick={() => {this.setState({sourcing: item.source_name})}}
                  >{item.source_name}
                  </Option>
                }) }
              </Select>
            )}
          </Form.Item>

          <Form.Item>
            <div style={{margin:'30px 300px',width:'200px',}}>
              <Button type='primary' htmlType="submit">确定</Button>
              <Button style={{marginLeft:'20px'}} onClick={this.comeBack}>取消</Button>
            </div>
          </Form.Item>
        </Form>
      </Fragment>
    )
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'create_program' })(ProgramCreat);

export default WrappedNormalLoginForm;