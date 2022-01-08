import React, { Component, Fragment } from 'react'
import { Modal, Button, Table, Checkbox, InputNumber} from 'antd'

import { Model } from '../../dataModule/testBone'
import { deleteBomRelationUrl, addRelationUrl } from '../../../src/dataModule/UrlList'

import store from '../../store'
import { actionCreators as viewsAction } from '../store';
import { connect } from 'react-redux';

const model = new Model()

class EditPartBom extends Component{
  constructor(props){
    super(props);
    this.state = {
      count: 0,
      deletePart: false
    }
  }

  //取消
  handleCancel = () => {
    this.props.cancle()
  }

  //表格数据处理
  handleData = (value) => {
    // console.log('value', value)
    if(value.length !== 0) {
        const tableData = value.map((item) =>({
          key: item.id,
          partNo: item.part_no,
          name: item.name,
          tssType: this.handleChange('type', item.tss_type),
          version: item.version,
          count: item.count
        }))
        return tableData;
    }
  }

  //数据转换
  handleChange = (key, type) => {
    if (key === '' && type === false) {
      return '否'
    } else if (key === '' && type === true) {
      return '是'
    } else if (key === 'type' && type === 'EI') {
      return '一级件'
    } else if (key === 'type' && type === 'normal') {
      return '普通零件'
    }
  }

  //删除
  deleteRelation = (e, value) => {
    this.setState({deletePart: true})
    const deleteRelationParts = this.props.deleteRelationParts
    if (`${e.target.checked}` === 'true') {
      deleteRelationParts.push({
        child_id: value.key
      })
    } else if (`${e.target.checked}` === 'false') {
      deleteRelationParts.forEach((item, index, arr) => {
        if (item.child_id === value.key) {
          arr.splice(index, 1)
        }
      })
    }
    store.dispatch(viewsAction.saveDelteRleationParts(deleteRelationParts))
  }

  //编辑数量
  editNumRelation = (e, value) => {
    // console.log(`${e.target.checked}`);
    const addRelationParts = this.props.addRelationParts
    if (`${e.target.checked}` === 'true') {
      addRelationParts.push({
        part_id: value.key,
        count: this.state.count === 0 ? value.count : this.state.count
      })
    } else if (`${e.target.checked}` === 'false') {
      addRelationParts.forEach((item, index, arr) => {
        if (item.part_id === value.key) {
          arr.splice(index, 1)
        }
      })
    }
    store.dispatch(viewsAction.saveRleationParts(addRelationParts))
  }

  //数量
  handleCount = (value) => {
    this.setState({
      count: value
    })
    // if (this.state.count !== value.count) {
    //   const addRelationParts = this.props.addRelationParts
    //   addRelationParts.forEach((item, index, arr) => {
    //     if (item.part_id === value.key) {
    //       arr[index].count = this.state.count
    //     }
    //   })
    // }
  }

  //确定
  handleOk = () => {
    if (this.state.deletePart === false) {
      this.editSelectParts(this.props.addRelationParts).then(res => {
        this.props.getPartBom(this.props.partBomInfo.partId)
        store.dispatch(viewsAction.saveRleationParts([]))
      })
    } else {
      this.deleteSelectParts(this.props.deleteRelationParts).then(res => {
        this.props.getPartBom(this.props.partBomInfo.partId)
        store.dispatch(viewsAction.saveDelteRleationParts([]))
      })
    }
    this.props.cancle()
  }

  //编辑
  editSelectParts = async (params) => {
    const returnContent = []
    for (let i = 0; i < params.length; i++) {
      returnContent.push( await this.sentEditPartsMes(params[i].part_id, params[i].count))
    }
    return Promise.all(returnContent)
  }

  //建立关系
  sentEditPartsMes = (value1, value2) => {
    return new Promise((resolve, reject) => {
      model.fetch(
        { parent_id: this.props.partBomInfo.partId, child_id: value1, count: value2 },
        addRelationUrl,
        'post',
        function (res) {
          resolve(res)
        },
        function (err) {
          reject(err)
        },
        false
      )
    })
  }

  //删除
  deleteSelectParts = async (params) => {
    const returnContent = []
    for (let i = 0; i < params.length; i++) {
      returnContent.push( await this.sentDeletePartsMes(params[i].child_id))
    }
    return Promise.all(returnContent)
  }

  //删除关系
  sentDeletePartsMes = (value) => {
    return new Promise((resolve, reject) => {
      model.fetch(
        { parent_id: this.props.partBomInfo.partId, child_id: value},
        deleteBomRelationUrl,
        'post',
        function (res) {
          resolve(res)
        },
        function (err) {
          reject(err)
        },
        false
      )
    })
  }


  render() {
    const columns = [
      {
        title: '零件编号',
        dataIndex: 'partNo',
        align: 'center',
        width: '15%'
      },
      {
        title: '零件名称',
        dataIndex: 'name',
        align: 'center',
        width: '15%'
      },
      {
        title: '零件版本',
        dataIndex: 'version',
        align: 'center',
        width:'10%'
      },
      {
        title: '零件类型',
        dataIndex: 'tssType',
        align: 'center',
        width: '15%'
      },
      {
        title: '数量',
        dataIndex: 'count',
        align: 'center',
        width: '15%',
        render: (text, record) => (
          <InputNumber min={1} defaultValue={record.count} size="small" style={{ width: "80px" }}
            onChange={this.handleCount} />
        )
      },
      {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        width: '30%',
        render: (text, record) => (
          <div>
            <Checkbox  onChange={e => this.editNumRelation(e, record)}>编辑数量</Checkbox>
            <Checkbox  onChange={e => this.deleteRelation(e, record)}>删除零件</Checkbox>
          </div>
        )
      }
    ]

    const tableData = this.handleData(this.props.partsInfo)
    // console.log('tableData', this.props.partsInfo)
    return(
      <Fragment>
        <div>
          <Modal
            title="编辑BOM"
            visible={this.props.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width='800px'
            footer={[
              <Button key="cancle" onClick={this.handleCancel}>
                取消
              </Button>,
              <Button key="ok" type="primary" onClick={this.handleOk}>
                确定
              </Button>,
            ]}
          >
            <div style={{margin:'20px'}}>
              <Table
                style={{
                  overflow: 'auto',
                  width: '100%',
                  wordBreak: 'keep-all',
                  whiteSpace: 'nowrap',
                  fontSize: '5px',
                }}
                size="small"
                bordered
                columns={columns}
                dataSource={tableData}
                pagination={false}
                // scroll={{ y: 120 }}
              />
            </div>
          </Modal>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    partBomInfo: state.get('viewsReducer').get('partBomInfo').toJS(),
    deleteRelationParts: state.get('viewsReducer').get('deleteRelationParts').toJS(),
    addRelationParts: state.get('viewsReducer').get('addRelationParts').toJS(),
  }
}

export default connect(mapStateToProps, null)(EditPartBom)
