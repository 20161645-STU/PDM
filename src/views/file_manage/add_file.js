import React, { Component } from 'react';
import { Icon, Form, Input,  Select, Button } from 'antd';


const { Option } = Select;
class AddFile extends Component {
    comeBack = () => {
        this.props.history.push('/app/file_manage')
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
        <div>
        <div onClick={this.comeBack}>
            <Icon type="arrow-left" />
            <span>返回</span>
        </div>
        <Form onSubmit={this.handleSubmit} style={{marginTop:'30px', width:'400px',marginLeft:"30px"}}>
            <Form.Item>
                {getFieldDecorator('file_number', {
                    rules: [{ required: true, message: '请输入相应的文件编号' }],
                })(
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{lineHeight:'30px'}}>文件编号:</span>
                        <Input style={{ width: '300px' }}/>
                    </div>    
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('file_name', {
                    rules: [{ required: true, message: '输入相应的文件名称' }],
                })(
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{lineHeight:'30px'}}>文件名称:</span>
                        <Input style={{width:'300px',marginLeft:'30px'}}/>
                    </div>
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('file_type', {
                    rules: [{ required: true, message: '请选择相应的文件类型' }],
                })(
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{lineHeight:'30px'}}>文件分类:</span>
                        <Select defaultValue="lucy" style={{ width:'300px' }} >
                            <Option value="jack">PPT文件</Option>
                            <Option value="lucy">EXCEL文件</Option>
                            <Option value="Yiminghe">WORD文件</Option>
                        </Select>
                    </div>
                )}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('part_name', {
                    rules: [{ required: true, message: '请选择所属零件' }],
                })(
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{lineHeight:'30px'}}>所属项目:</span>
                        <Select defaultValue="lucy" style={{ width:'300px'}} >
                            <Option value="jack">100001</Option>
                            <Option value="lucy">100002</Option>
                            <Option value="Yiminghe">100003</Option>
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
            </Form.Item>
            <Form.Item>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{lineHeight:'30px'}}>文件描述:</span>
                        <Input style={{width:'300px',marginLeft:'30px',height:'60PX'}}/>
                    </div>
            </Form.Item>
        </Form>
        <div style={{display:'flex',flexDirection:'column',width:'180px',marginLeft:'60px'}}>

            <Button  icon="file-text" style={{marginBottom:'20px'}}>文件上传</Button>
        </div>
        <div style={{margin:'30px 300px',width:'200px',}}>
            <Button type='primary'>确定</Button>
            <Button style={{marginLeft:'20px'}} onClick={this.comeBack}>取消</Button>
        </div>
    </div>
)
}
}

const WrappedNormalLoginForm = Form.create({ name: 'add_file' })(AddFile);

export default WrappedNormalLoginForm

