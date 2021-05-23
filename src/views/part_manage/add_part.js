import React, { Component } from 'react';
import { Icon, Form, Input,  Select, Button } from 'antd';

const { Option } = Select;
class AddPart extends Component {
    comeBack = () => {
        this.props.history.push('/app/drawing_manage')
    }
    render() {
        const { getFieldDecorator } = this.props.form;


        return (
            <div>
                <div onClick={this.comeBack}>
                    <Icon type="arrow-left" />
                    <span>返回</span>
                </div>
                <Form onSubmit={this.handleSubmit} style={{marginTop:'30px', width:'400px',marginLeft:"30px"}}>
                    <Form.Item>
                        {getFieldDecorator('draw_number', {
                            rules: [{ required: true, message: '请输入相应的零件编号' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>零件编号:</span>
                                <Input style={{ width: '300px' }}/>
                            </div>    
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('draw_name', {
                            rules: [{ required: true, message: '输入相应的零件名称' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>零件名称:</span>
                                <Input style={{width:'300px',marginLeft:'30px'}}/>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('draw_type', {
                            rules: [{ required: true, message: '请选择相应的零件类型' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>零件分类:</span>
                                <Select defaultValue="lucy" style={{ width:'300px' }} >
                                    <Option value="jack">装配体</Option>
                                    <Option value="lucy">部件</Option>
                                    <Option value="Yiminghe">零件</Option>
                                </Select>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('part_name', {
                            rules: [{ required: true, message: '请选择所属零件' }],
                        })(
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>所属零件:</span>
                                <Select defaultValue="lucy" style={{ width:'300px'}} >
                                    <Option value="jack">机械臂</Option>
                                    <Option value="lucy">机械手</Option>
                                    <Option value="Yiminghe">机械爪</Option>
                                </Select>
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item>
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
                        {getFieldDecorator('draw_standard', {
                            rules: [{ required: true, message: '请选择零件标准' }],
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
                    </Form.Item>
                    <Form.Item>
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <span style={{lineHeight:'30px'}}>零件描述:</span>
                                <Input style={{width:'300px',marginLeft:'30px'}}/>
                            </div>
                    </Form.Item>
                </Form>
                <div style={{display:'flex',flexDirection:'column',width:'180px',marginLeft:'60px'}}>
                    <Button  icon="file-pdf" style={{marginBottom:'20px'}}>PDF上传</Button>
                    <Button  icon="codepen" style={{marginBottom:'20px'}}>数模上传</Button>
                    <Button  icon="file-text" >tiff上传</Button>
                </div>
                <div style={{margin:'30px 300px',width:'200px',}}>
                    <Button type='primary'>确定</Button>
                    <Button style={{marginLeft:'20px'}} onClick={this.comeBack}>取消</Button>
                </div>
            </div>
        )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'create_draws' })(AddPart);

export default WrappedNormalLoginForm
