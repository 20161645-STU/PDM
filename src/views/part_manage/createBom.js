import React, { Component, Fragment } from 'react'
import { Button } from 'antd';
import './style.less'

import BomTable from '../../publicComponents/antdTable'
import AddPartBom from './addPartBomModel'

class CreatePartBom extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false
    }
  }

  //打开增加弹窗
  addPartBomModal = () => {
    this.setState({
      visible: true
    })
  }

  //关闭弹窗
  closeModal = () => {
    this.setState({
      visible: false
    })
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
        title: '创建时间',
        dataIndex: 'createDate',
        key: 'createDate',
        align: 'center',
      },
      {
        title: '创建人',
        dataIndex: 'createdBy',
        key: 'createdBy',
        align: 'center',
      },
      {
        title: '材料',
        dataIndex: 'substance',
        key: 'substance',
        align: 'center',
      },
      {
        title: '重量',
        dataIndex: 'weight',
        key: 'weight',
        align: 'center',
      }
    ]
    const queryParams = { pageSize: 20 }
    const partTableData = []
    return (
      <Fragment>
        <div className='part_bom_title'>产品结构</div>
        <div className="part_bom_button">
          <div>
            <Button type="primary" icon="plus" size='small' onClick={this.addPartBomModal}>增加</Button>
            <Button type="danger" icon="minus" size='small' style={{marginLeft:'20px'}}>删除</Button>
          </div>
          <div style={{marginLeft:'320px'}}>
            <Button  type="primary" icon="arrow-down" size='small'>导出报表</Button>
          </div>
        </div>
        <div>

        </div>
        <div>
          <BomTable
            columns={columns}
            queryParams={queryParams}
            data={partTableData}
            currentPage={1}
          />
        </div>
        <AddPartBom
          visible={this.state.visible}
          cancle={this.closeModal}
        />
      </Fragment>
    )
  }
}

export default CreatePartBom