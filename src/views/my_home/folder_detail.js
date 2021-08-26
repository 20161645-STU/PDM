import React, { Component } from 'react'
import { Form,Button,Descriptions,Badge } from 'antd'
import './style.less'

class FolderDetail extends Component {
    
    render() {
        return(
        <div style={{marginTop:'20px'}}>     
                <Descriptions title="文件夹详情页" bordered={true}  contentStyle={{color:'white'}}  column={{ xxl: 10, xl: 1, lg: 3, md: 3, sm: 2, xs: 1 }}>
                <Descriptions.Item label="Product" span={2}>Cloud Database</Descriptions.Item>
                <Descriptions.Item label="Billing Mode" span={2}>Prepaid</Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal" span={2}>YES</Descriptions.Item>
                <Descriptions.Item label="Order time" span={2}>2018-04-24 18:00:00</Descriptions.Item>
                <Descriptions.Item label="Usage Time" span={2}>
                2019-04-24 18:00:00
                </Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>
                <Badge status="processing" text="Running" span={2}/>
                </Descriptions.Item>
                <Descriptions.Item label="Negotiated Amount" span={2}>$80.00</Descriptions.Item>
                <Descriptions.Item label="Discount" span={2}>$20.00</Descriptions.Item>
                <Descriptions.Item label="Official Receipts" span={2}>$60.00</Descriptions.Item>
                <Descriptions.Item label="Config Info" span={2}>
                1
                </Descriptions.Item>
            </Descriptions>
            <Button onClick={this.CheckOut}>
                Check Out
            </Button>
                    
        </div>
)
}
}

const WrappedNormalLoginForm = Form.create({ name: 'file_detail' })(FolderDetail);

export default WrappedNormalLoginForm

