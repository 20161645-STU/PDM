import React, { Component } from 'react';
import { Form } from 'antd';


class FileDetail extends Component {
   
    render() {
        return(
        <div>
        
        文档详情
         </div>
)
}
}

const WrappedNormalLoginForm = Form.create({ name: 'file_detail' })(FileDetail);

export default WrappedNormalLoginForm

