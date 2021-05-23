import React, { Component } from 'react';
import { Form } from 'antd';


class ProgramDetail extends Component {
   
    render() {
        return(
            <div> 
                fold
            </div>
            )
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'program_detail' })(ProgramDetail);

export default WrappedNormalLoginForm

