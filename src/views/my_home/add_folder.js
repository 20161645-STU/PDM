import React, { Component } from 'react';
import { Icon, Form, Input,  Button } from 'antd';


class AddFolder extends Component {
    comeBack = () => {
        this.props.history.push('/app/my_home')
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
                {getFieldDecorator('folder_name', {
                    rules: [{ required: true, message: '输入相应的文件夹名称' }],
                })(
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{lineHeight:'30px',width:'100px'}}>文件夹名称:</span>
                        <Input style={{width:'300px',marginLeft:'30px'}}/>
                    </div>
                )}
            </Form.Item>
    
            <Form.Item>
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <span style={{lineHeight:'30px',width:'100px'}}>文件夹描述:</span>
                        <Input style={{width:'300px',marginLeft:'30px',height:'60PX'}}/>
                    </div>
            </Form.Item>
        </Form>
       
        <div style={{margin:'30px 300px',width:'200px',}}>
            <Button type='primary'>确定</Button>
            <Button style={{marginLeft:'20px'}} onClick={this.comeBack}>取消</Button>
        </div>
    </div>
)
}
}

const WrappedNormalLoginForm = Form.create({ name: 'add_folder' })(AddFolder);

export default WrappedNormalLoginForm

