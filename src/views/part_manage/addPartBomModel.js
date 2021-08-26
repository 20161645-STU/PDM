import React, { Component, Fragment } from 'react'
import { Modal, Button, Input, Table } from 'antd';

class AddPartBom extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  //取消
  handleCancel = () => {
    this.props.cancle()
  }

  render() {
    const columns = [
      {
        title: '零件编号',
        dataIndex: 'partNo',
        key: 'partNo',
        align: 'center',
      },
      {
        title: '零件名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center',
      },
      {
        title: '零件版本',
        dataIndex: 'version',
        key: 'version',
        align: 'center',
      },
      {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        render: text => <div style={this.handleStatusColor(text)}>{text}</div>
      },
    ]
    const tableData = []
    return(
      <Fragment>
        <div>
        <Modal
          title="创建BOM"
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="cancle" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="ok" type="primary" onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          <div style={{display: 'flex'}}>
            <div style={{display: 'flex', width:'360px', marginLeft:'10px'}}>
              <span style={{width:'100px', marginRight:'10px', fontSize:'16px'}}>零件编号:</span>
              <Input size='small' width="160px" />
            </div>
            <div style={{marginLeft:'40px'}}>
              <Button type="primary" size="small">搜索</Button>
            </div>
          </div>
          <div style={{margin:'20px'}}>
            <Table
              size="small"
              bordered
              columns={columns}
              dataSource={tableData}
              pagination={{ pageSize: 50 }} s
              croll={{ y: 240 }}
            />
          </div>
        </Modal>
        </div>
      </Fragment>
    )
  }
}

export default AddPartBom
