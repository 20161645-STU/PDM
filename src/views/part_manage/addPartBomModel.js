import React, { Component, Fragment } from 'react'
import { Modal, Button, Input, Table, message, Checkbox, InputNumber} from 'antd'

import { Model } from '../../dataModule/testBone'
import { selectPartUrl, addRelationUrl } from '../../../src/dataModule/UrlList'

import store from '../../store'
import { actionCreators as viewsAction } from '../store';
import { connect } from 'react-redux';

const model = new Model()

class AddPartBom extends Component{
  constructor(props){
    super(props);
    this.state = {
      part_no: '',
      count: 1,
      activeStatu: false
    }
  }

  //获得搜素内容
  handChange = (value) => {
    this.setState({
      part_no: value
    })
  }

  //获得零件信息
  getPartInfo = () => {
    let me = this
    if (me.props.partsInfo.length !== 0 && me.findPart(me.props.partsInfo) !== -1) {
      message.success("该零件已存在")
    } else {
      me.getSelectPartInfo(me.state.part_no)
    }
  
  }

  //查看该零件是否存在
  findPart = (value) => {
    // console.log(this.state.part_no)
    for (let i = 0; i < value.length - 1; i++){
      if (value[i]['part_no'] + '' === this.state.part_no) {
        return i
      }
    }
    return -1
  }

  getSelectPartInfo = (value) => {
    let me = this
    model.fetch(
      {part_no: value},
      selectPartUrl,
      'get',
      function (res) {
        // console.log(111, res)
        if (res.data.length !== 0) {
          me.storePartDatas(res.data.filter(item => item.version !== 'item')[0])
        } else {
          message.error("请输入正确的零件号")
        }
      },
      function (error) {
        message.error('获取零件信息失败！')
      },
      false
    )
  }

  //存储搜索到的值
  storePartDatas = (value) => {
    const part_datas = this.props.part_datas
    part_datas.push(value)
    store.dispatch(viewsAction.saveSearchParts(part_datas))
  }

  //取消
  handleCancel = () => {
    this.setState({
      part_no: ''
    })
    store.dispatch(viewsAction.saveSearchParts([]))
    this.props.cancle()
  }

  //表格数据处理
  handleData = (value) => {
    // console.log('value', value)
    if(value.length !== 0) {
        const tableData = value.map((item) =>({
            key: item.id,
            partNo: item.partNo,
            name: item.name,
            tssType: this.handleChange('type', item.tssType),
            version: item.version,
            count: item.count
            // frozen: this.handleChange('', item.frozen),
            // status: this.statusSWift(item.status),
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

  //勾选
  checkChange = (e, value) => {
    this.setState({
      activeStatu: true
    })
    const addRelationParts = this.props.addRelationParts
    if (`${e.target.checked}` === 'true') {
      addRelationParts.forEach((item, index, arr) => {
        if (item.part_id === value.key) {
          arr.splice(index, 1)
        }
      })
      addRelationParts.push({
        part_id: value.key,
        count: this.state.count
      })
    } else if (`${e.target.checked}` === 'false') {
      addRelationParts.forEach((item, index, arr) => {
        if (item.part_id === value.key) {
          arr.splice(index, 1)
        }
      })
    }
    store.dispatch(viewsAction.saveRleationParts(addRelationParts))
    // console.log('addRelationParts', addRelationParts)
  }

  //数量
  handleCount = (value) => {
    let sum1 = this.state.sum
    if (sum1 === 0) {
      this.setState({
        count: value,
        sum: sum1 + 1
      })
    } else if (sum1 !== 0) {
      this.setState({
        count: value,
        activeStatu: false
      })
    }    
  }

  //确定
  handleOk = () => {
    this.handleSelectParts(this.props.addRelationParts).then(res => {
      this.props.getPartBom(this.props.partBomInfo.partId)
      store.dispatch(viewsAction.saveRleationParts([]))
    })
    this.props.cancle()
  }

  handleSelectParts = async (params) => {
    const returnContent = []
    for (let i = 0; i < params.length; i++) {
      returnContent.push( await this.sentPartsMes(params[i].part_id, params[i].count))
    }
    return Promise.all(returnContent)
  }

  //建立关系
  sentPartsMes = (value1, value2) => {
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

  render() {
    const columns = [
      {
        title: '零件编号',
        dataIndex: 'partNo',
        align: 'center',
        width: '100px'
      },
      {
        title: '零件名称',
        dataIndex: 'name',
        align: 'center',
        width: '100px'
      },
      {
        title: '零件版本',
        dataIndex: 'version',
        align: 'center',
        width: '100px'
      },
      {
        title: '零件类型',
        dataIndex: 'tssType',
        align: 'center',
        width: '100px'
      },
      {
        title: '数量',
        dataIndex: 'count',
        align: 'center',
        width: '100px',
        render: (text, record) => (
          <InputNumber min={1} defaultValue={1} size="small" style={{ width: "80px" }}
            onChange={this.handleCount} />
        )
      },
      {
        title: '操作',
        dataIndex: 'action',
        align: 'center',
        render: (text, record) => (
          <Checkbox onChange={e => this.checkChange(e, record)} checked={this.state.activeStatu}></Checkbox>
        )
      }
    ]

    const tableData = this.handleData(this.props.part_datas)
    // console.log('tableData', tableData)
    return(
      <Fragment>
        <div>
          <Modal
            title="创建BOM"
            visible={this.props.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width='680px'
            footer={[
              <Button key="cancle" onClick={this.handleCancel}>
                取消
              </Button>,
              <Button key="ok" type="primary" onClick={this.handleOk}>
                确定
              </Button>,
            ]}
          >
            <div style={{display: 'flex', width:'660px', marginLeft:'40px'}}>
              <div style={{display: 'flex', width:'420px', marginLeft:'10px'}}>
                <span style={{width:'100px', marginRight:'10px', fontSize:'16px'}}>零件编号:</span>
                <Input size='small' width="260px"
                  value={this.state.part_no}
                  onChange={e => this.handChange(e.target.value)}
                />
              </div>
              <div style={{marginLeft:'40px'}}>
                <Button type="primary" size="small" onClick={this.getPartInfo}>搜索</Button>
              </div>
            </div>
            <div style={{margin:'20px', width:'600px'}}>
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
    part_datas: state.get('viewsReducer').get('part_datas').toJS(),
    partBomInfo: state.get('viewsReducer').get('partBomInfo').toJS(),
    addRelationParts: state.get('viewsReducer').get('addRelationParts').toJS(),
  }
}

export default connect(mapStateToProps, null)(AddPartBom)
