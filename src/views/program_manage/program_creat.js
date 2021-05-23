import React, { Component, Fragment } from 'react';
import { Input, DatePicker, Button, Icon, Form, message } from 'antd';
import { Model } from '../../../src/dataModule/testBone'
import { createProjectUrl  } from '../../../src/dataModule/UrlList'

const model = new Model();

class ProgramCreat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',   //项目名称
            description: '',  //项目描述
            planning_start_date: '',    //计划项目开始时间
            planning_end_date: '',     //计划项目结束时间
            sourcing: '',     //项目来源
            status: 0,       //项目状态
            planning_period: '',    //计划项目周期
            actual_start_date: '',
            actual_period:'',
            actual_end_date: '',
            admin: '',        //项目负责人
            project_group: ''
        }
    }


    //获得创建新项目的各个数据
    handChange = (key, value) => {
        const newDrawsData = this.state
        newDrawsData[key] = value
        // console.log(newDrawsData)
        this.setState(newDrawsData)
    }

    //创建新图纸
    createProject = () => {
        const me = this
        const newProject = this.state
        console.log('newProject', newProject)
        // for (let i in newDraw) {
        // // if (newDraw[i] === '' || newDraw[i] === undefined) {
        // //     message.error('信息未填写完整！')
        // //     return
        // // }
        // }
        model.fetch(
            newProject,
            createProjectUrl,
            'post',
            function (res) {
                message.success('创建项目成功！')
                me.initState()
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
        initData['status'] = '0'
        this.setState(initData)
        // this.comeBack()
    }

    //返回
    comeBack = () => {
        this.props.history.push('/app/program_manage')
    }


    render() {
        const { getFieldDecorator } = this.props.form
        const { name, description, sourcing, planning_period, admin } = this.state
        return (
            <Fragment>
                 <div onClick={this.comeBack}>
                    <Icon type="arrow-left" />
                    <span>返回</span>
                </div>
                 <Form onSubmit={this.handleSubmit} style={{marginTop:'30px', width:'460px',marginLeft:"10px"}}>
                    {/* <Form.Item>
                        {getFieldDecorator('programNumber', {
                            rules: [{ required: true, message: '请输入相应的项目编号' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>项目编号:</span>
                                <Input style={{ width: '340px' }} value={programNumber} onChange={ e => this.handChange('programNumber', e.target.value) } allowClear/>
                            </div>    
                        )}
                    </Form.Item> */}
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '输入相应的项目名称' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>项目名称:</span>
                                <Input style={{width:'340px',marginLeft:'30px'}} value={name} onChange={ e => this.handChange('name', e.target.value) } allowClear/>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('description', {
                            rules: [{ required: true, message: '输入项目说明' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>项目说明:</span>
                                <Input style={{ width: '340px', marginLeft: '30px' }} value={description} onChange={e => this.handChange('description', e.target.value)} allowClear/>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('proBeginDate', {
                            rules: [{ required: true, message: '输入项目的开始时间' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>项目开始时间:</span>
                                <DatePicker  style={{width:'340px',marginLeft:'30px'}}  onChange={dateString => this.handChange('planning_start_date', dateString.format('YYYY/MM/DD'))}  allowClear/>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>项目结束时间:</span>
                                <DatePicker  style={{width:'340px',marginLeft:'10px'}}  onChange={dateString => this.handChange('planning_end_date', dateString.format('YYYY/MM/DD'))}  allowClear/>
                            </div>
                    </Form.Item>
                    <Form.Item>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>项目周期:</span>
                                <Input style={{ width: '340px', marginLeft: '30px' }} value={planning_period} onChange={e => this.handChange('planning_period', e.target.value)} allowClear/>
                            </div>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('sourcing', {
                            rules: [{ required: true, message: '输入项目来源' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>项目来源:</span>
                                <Input  style={{width:'340px',marginLeft:'30px'}} value={sourcing} onChange={e => this.handChange('sourcing', e.target.value)}  allowClear/>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>项目负责人:</span>
                                <Input  style={{width:'340px',marginLeft:'10px'}} value={admin} onChange={e => this.handChange('admin', e.target.value)}  allowClear/>
                            </div>
                    </Form.Item>
                </Form>
                <div style={{margin:'30px 300px',width:'200px',}}>
                    <Button type='primary' onClick={this.createProject}>确定</Button>
                    <Button style={{marginLeft:'20px'}} onClick={this.comeBack}>取消</Button>
                </div>
            </Fragment>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'create_program' })(ProgramCreat);

export default WrappedNormalLoginForm;