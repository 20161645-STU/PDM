import React, { Component, Fragment } from 'react'
import { Modal, Button, Input, Table, message, Checkbox } from 'antd'

import { Model } from '../../dataModule/testBone'
import { selectDocumentByNoUrl, makeRelationUrl } from '../../../src/dataModule/UrlList'


import store from '../../store'
import { actionCreators as viewsAction } from '../store';
import { connect } from 'react-redux';

const model = new Model()

class AddDocumentModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      document_no: '',  //文档编号
      count: 1,
      sum: 0,    //监听文档数量变化变量,
      activeStatu: false
    }
  }

  //获得搜素内容
  handChange = (value) => {
    this.setState({
      document_no: value
    })
  }

  //获得文档信息
  getDocumentInfo = () => {
    let me = this
    if (me.props.filesInfo !== null && me.findDocument(me.props.filesInfo) !== -1) {
      message.success("该文档已存在")
    } else {
      me.getSelectDocumentInfo(me.state.document_no)
    }
  }

  //查看该文档是否存在
  findDocument = (value) => {
    // console.log(11, value)
    if (value !== null) {
      for (let i = 0; i <= value.length - 1; i++){
        if (value[i]['documentNo'] + '' === this.state.document_no) {
          return i
        }
      }
      return -1
    }
  }

  // 查找要搜寻的文档
  getSelectDocumentInfo = (value) => {
    let me = this
    model.fetch(
      {document_no: value},
      selectDocumentByNoUrl,
      'get',
      function (res) {
        console.log(111, res)
        if (res.data.length !== 0) {
          me.storePartDatas(res.data)
        } else {
          message.error("请输入正确的文档编号")
        }
      },
      function (error) {
        message.error('获取文档信息失败！')
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
    this.props.cancle()
  }

  //表格数据处理
  handleData = (value) => {
    // console.log('value', value)
    if(value.length !== 0) {
        const tableData = value.map((item) =>({
            key: item.id,
            documentNo: item.documentNo,
            name: item.name,
            version: item.version,
            // count: item.count
            // frozen: this.handleChange('', item.frozen),
            // status: this.statusSWift(item.status),
        }))
        return tableData;
    }
  }


  //勾选
  checkChange = (e, value) => {
    this.setState({
      activeStatu: true
    })
    const addRelationParts = this.props.addRelationParts
    if (`${e.target.checked}` === 'true') {
      addRelationParts.push({
        target: value.key,
        origin: this.props.programId.selectedKeys,
        relationType: 'project_own_dss'
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

  //确定
  handleOk = () => {
    this.handleSelectDocuments(this.props.addRelationParts).then(res => {
      store.dispatch(viewsAction.getProjectContentId(this.props.programId.selectedKeys))
      store.dispatch(viewsAction.saveRleationParts([]))
    })
    this.props.cancle()
  }

  // 选择要关联项目的文档建立关系
  handleSelectDocuments = async (params) => {
    const returnContent = []
    for (let i = 0; i < params.length; i++) {
      returnContent.push( await this.sentDocumentMes(params[i].target, params[i].origin))
    }
    return Promise.all(returnContent)
  }

  //建立关系
  sentDocumentMes = (value1, value2) => {
    return new Promise((resolve, reject) => {
      model.fetch(
        { origin: value2, target: value1, origin_type: 'project', target_type: 'dss' },
        makeRelationUrl,
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
        title: '文档编号',
        dataIndex: 'documentNo',
        align: 'center',
        width: '160px'
      },
      {
        title: '文档名称',
        dataIndex: 'name',
        align: 'center',
        width: '160px'
      },
      {
        title: '文档版本',
        dataIndex: 'version',
        align: 'center',
        width: '160px'
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
            title="增加文档"
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
                <span style={{width:'100px', marginRight:'10px', fontSize:'16px'}}>文档编号:</span>
                <Input size='small' width="260px"
                  value={this.state.document_no}
                  onChange={e => this.handChange(e.target.value)}
                />
              </div>
              <div style={{marginLeft:'40px'}}>
                <Button type="primary" size="small" onClick={this.getDocumentInfo}>搜索</Button>
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
    addRelationParts: state.get('viewsReducer').get('addRelationParts').toJS(),
    programId: state.get('commonReducer').get('programSelectedkeys').toJS(),
  }
}

export default connect(mapStateToProps, null)(AddDocumentModal)
