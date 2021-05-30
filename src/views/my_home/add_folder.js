import React, { Component } from 'react';
import { PageHeader, Form, Input,  Button } from 'antd';

const { TextArea } = Input;

class AddFolder extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    //取消创建
    comeBack = () => {
        this.props.history.push('/app/my_home')
    }
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <PageHeader
                    onBack={() => this.props.history.push('/app/my_home')}
                    title="返回"
                />
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
                                <TextArea style={{width:'300px',marginLeft:'30px'}} rows={3}/>
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

