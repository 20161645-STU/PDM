import React, { Component } from 'react';
import { PageHeader, Form, Input, Select, Button,message } from 'antd';

import { getUserName } from '../../../src/publicFunction'

import { Model } from '../../../src/dataModule/testBone'
import { createDocumentUrl } from '../../../src/dataModule/UrlList'


const { Option } = Select;
const { TextArea } = Input;
const model = new Model();

class AddFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            document_no: '',        //文档编号
            name: '',
            document_type: '',
            document_group: '',
            tag: '',
            created_by: getUserName(),
            is_frozen: '0',
            is_reviewed: '0',
            version: 'AA',
            language: '中文',
        }
    }

    //创建新图纸
    createDocument = () => {
        const me = this
        const newDocument = this.state
        // console.log('newDraw', newDraw)
        // for (let i in newDraw) {
        // // if (newDraw[i] === '' || newDraw[i] === undefined) {
        // //     message.error('信息未填写完整！')
        // //     return
        // // }
        // }
        model.fetch(
            newDocument,
            createDocumentUrl,
            'post',
            function (res) {
                message.success('创建文档成功！')
                me.initState()
            },
            function (error) {
                message.error('创建文档失败！')
            },
            false
            )
    }

    //恢复初始化 
    initState = () => {
        const initData = {}
        const newDocument = this.state
        for (let i in newDocument) {
            initData[i] = ''
        }
        initData['is_frozen'] = '0'
        initData['is_reviewed'] = '0'
        initData['version'] = 'AA'
        initData['language'] = '中文'
        initData['version'] = 'AA'
        initData['created_by'] = getUserName()
        this.setState(initData)
        // this.comeBack()
    }

    //获得创建新文档的各个数据
    handChange = (key, value) => {
        const newDrawsData = this.state
        newDrawsData[key] = value
        // console.log(newDrawsData)
        this.setState(newDrawsData)
    }

    //取消创建
    comeBack = () => {
        this.initState()
        this.props.history.push('/app/file_manage')
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { document_no, name, tag } = this.state
        return(
            <div>
                <PageHeader
                    onBack={() => this.props.history.push('/app/file_manage')}
                    title="返回"
                />
                <Form onSubmit={this.handleSubmit} style={{marginTop:'30px', width:'400px',marginLeft:"30px"}} >
                    <Form.Item>
                        <div style={{display:'flex',justifyContent:'space-between'}}>
                            <span style={{lineHeight:'30px'}}>文件编号:</span>
                            <Input style={{ width: '300px' }} value={document_no} onChange={ e => this.handChange('document_no', e.target.value) }/>
                        </div>    
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('name', {
                            rules: [{ required: true, message: '输入相应的文件名称' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>文件名称:</span>
                                <Input style={{width:'300px',marginLeft:'30px'}}  value={name} onChange={ e => this.handChange('name', e.target.value) } allowClear/>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('document_type', {
                            rules: [{ required: true, message: '请选择相应的文件类型' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>文件分类:</span>
                                <Select defaultValue="" style={{ width:'300px' }}  onChange={ value => this.handChange('document_type', value) } allowClear>
                                    <Option value="PPT">PPT文件</Option>
                                    <Option value="EXCEL">EXCEL文件</Option>
                                    <Option value="WORD">WORD文件</Option>
                                    <Option value="PDF">PDF文件</Option>
                                </Select>
                            </div>
                        )}
                    </Form.Item>
                    {/* <Form.Item>
                        {getFieldDecorator('product_group', {
                            rules: [{ required: true, message: '请选择所在产品组' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>产品组:</span>
                                <Select defaultValue="lucy" style={{ width:'300px' }} >
                                    <Option value="jack">机械臂</Option>
                                    <Option value="lucy">机械手</Option>
                                    <Option value="Yiminghe">机械爪</Option>
                                </Select>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('file_standard', {
                            rules: [{ required: true, message: '请选择文件标准' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>标准:</span>
                                <Select defaultValue="jack" style={{ width:'300px' }} >
                                    <Option value="jack">GB</Option>
                                    <Option value="lucy">机械手</Option>
                                    <Option value="Yiminghe">机械爪</Option>
                                </Select>
                            </div>
                        )}
                    </Form.Item> */}
                    <Form.Item>
                        {getFieldDecorator('tag', {
                            rules: [{ required: true, message: '请输入文档描述' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>文档描述:</span>
                                <TextArea style={{ width: '300px', marginLeft: '30px' }} rows={3} value={tag} onChange={e => this.handChange('tag', e.target.value)}/>
                            </div>   
                        )}
                    </Form.Item>
                </Form>
                <div style={{display:'flex',flexDirection:'column',width:'180px',marginLeft:'60px'}}>
                    <Button  icon="file-text" style={{marginBottom:'20px'}}>文件上传</Button>
                </div>
                <div style={{margin:'30px 300px',width:'200px',}}>
                    <Button type='primary' onClick={this.createDocument}>确定</Button>
                    <Button style={{marginLeft:'20px'}} onClick={this.comeBack}>取消</Button>
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'add_file' })(AddFile);

export default WrappedNormalLoginForm

