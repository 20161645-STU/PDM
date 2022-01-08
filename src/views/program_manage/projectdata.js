import React, { Component, Fragment } from 'react'
import { PageHeader, List, Popconfirm, Icon, message } from 'antd'
 
import { connect } from 'react-redux'

import { Model } from '../../dataModule/testBone'
import {
  getAlonePartUrl,
  getAloneDrawUrl,
  getAloneDocumentUrl,
  removeRelationUrl
} from '../../../src/dataModule/UrlList'

import Folder from '../../publicComponents/IconFonts'

import store from '../../store'
import { actionCreators as commonAction } from '../../components/common/store'
import { actionCreators as viewsAction } from '../store'
import { createPartBom } from '../store/actionCreaters'
import { storeProjectAllDatas } from '../../components/common/store/actionCreaters'

import AddPartsModal from './addPartModal'
import AddDrawsModal from './addDrawModal'
import AddFileModal from './addDocumentModal'

import './style.less'

const model = new Model()

class ProjectData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      partVisible: false,
      drawVisible: false,
      fileVisible: false
    }
  }

  componentDidMount() {
    store.dispatch(viewsAction.getProjectContentId(this.props.match.params.id))
    store.dispatch(commonAction.storePragramSelectedkeys({selectedKeys: this.props.match.params.id}))
  }


  // 获得单个零件的详细信息
  getAlonePart = (params) => {
    let me = this
    model.fetch(
      {id: params},
      getAlonePartUrl,
      'get',
      function (res) {
          // console.log(111, res.data)
        store.dispatch(commonAction.sentDetilType({ detail_type: 'part', alonePartDatas: res.data }))
        me.props.createPartBom({
          type: '',
          partId: ''
        })
      },
      function (error) {
          message.error('获取零件信息失败！')
      },
      false
    )
  }

  // 获得单个图纸的详细信息
  getAloneDraws = (params) => {
    model.fetch(
      {id: params},
      getAloneDrawUrl,
      'get',
      function (res) {
        // console.log(111, res.data)
        store.dispatch(commonAction.sentDetilType({detail_type: 'drawing', aloneDrawsDatas: res.data}))
      },
      function (error) {
        message.error('获取图纸信息失败！')
      },
      false
    )
  }

   // 获得单个文档的详细信息
   getAloneDocument = (params) => {
    model.fetch(
      {id: params},
      getAloneDocumentUrl,
      'get',
      function (res) {
        // console.log(111, res.data)
        store.dispatch(commonAction.sentDetilType({detail_type: 'file', aloneDocumentDatas: res.data}))
      },
      function (error) {
        message.error('获取文档信息失败！')
      },
      false
    )
  }

  //增加零件，图纸，文档到项目
  openModal = (e, value) => {
    if (value === 'part') {
      this.setState({
        partVisible: true,
      })
    } else if (value === 'draw') {
      this.setState({
        drawVisible: true,
      })
    } else if (value === 'file') {
      this.setState({
        fileVisible: true,
      })
    }
  }

  //关闭弹窗
  closeModal = () => {
    this.setState({
      partVisible: false,
      drawVisible: false,
      fileVisible: false
    })
  }

  //点击查看零件，图纸，文档详情
  getContentInfo = (e, params, type) => {
    // console.log(e)
    if (type === 'part') {
      this.getAlonePart(params)
    } else if (type === 'draw') {
      this.getAloneDraws(params)
    } else if (type === 'dss') {
      this.getAloneDocument(params)
    }
  }

  // 删除按钮
  confirm = (e, params) => {
    this.handleDelete(params).then(res => {
      if (res[0] === '删除成功') {
        store.dispatch(viewsAction.getProjectContentId(this.props.match.params.id))
      }
    })
  }

  //处理删除关系
  handleDelete = async (params) => {
    const message = []
    for (let i = 0; i <= 0; i++){
      message.push( await this.deleteRelation(params))
    }
    return Promise.all(message)
  }
  

  // 删除数据和项目之间的关系
  deleteRelation = (value) => {
    return new Promise((resolve, reject) => {
      model.fetch(
        {origin: this.props.programId.selectedKeys, target: value },
        removeRelationUrl,
        'post',
        function (res) {
          message.success("删除成功")
          // console.log(res.data)
          resolve(res.data)
        },
        function(err) {
          reject(err)
        },
        false
      )
    })
  }

  render() {
    // console.log('projectContentData',  this.props.projectContentData)
    return (
      <Fragment>
        <PageHeader
          onBack={() => this.props.history.push('/app/program_manage')}
          title="返回"
        />
        <div style={{margin:'40px'}}>
          <List
            size="small"
            bordered
            key='part'
            header={
              <div className='add_data' >
                <span style={{ fontSize: '18px', width:'120px' }}>零件</span>
                <Folder type="icon-add-fill"
                  style={{ width:'80px', fontSize: '20px', paddingRight: '4px', marginTop: '2px' }}
                  onClick={e => this.openModal(e, 'part')}
                />
              </div>
            }
            dataSource={ this.props.projectContentData.filter(item => item.type === 'part') }
            renderItem={item =>
              <List.Item>
                {
                  <div key={item.id} className='add_data'
                    style={{ width:'100%', height: '20px', marginLeft: '10px', marginBottom: '6px' }}
                  >
                    {
                      item.tssType === 'EI' ? <Folder type="icon-zhuangpeiti"
                        style={{ width:'20px', fontSize: '20px', paddingRight: '4px', marginTop: '3px' }} />
                        : <Folder type="icon-icon-"
                          style={{  fontSize: '20px', paddingRight: '4px', marginTop: '1px' }} />
                    }
                    <span style={{ display: 'inline-block', width: '70%', fontSize: '16px', marginLeft: '10px' }}
                      onClick={e => this.getContentInfo(e, item.id, 'part')}
                    >
                      {item.partNo + '-' + item.name + '/' + item.version}
                    </span>
                    <Popconfirm
                      title="确定解除关联吗？"
                      onConfirm={e => this.confirm(e, item.id)}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon type="delete"
                        style={{ width:'80px', color: 'red', fontSize: '16px', marginTop:'6px'}} />
                    </Popconfirm>
                  </div>
                }
              </List.Item>}
          />
        </div>
        <AddPartsModal
          visible={this.state.partVisible}
          cancle={this.closeModal}
          partsInfo={ this.props.projectContentData.filter(item => item.type === 'part') }
        />
        <div style={{margin:'40px'}}>
          <List
            size="small"
            bordered
            key='draw'
            header={
              <div  className='add_data'>
                <span style={{ fontSize: '18px', width:'120px' }}>图纸</span>
                <Folder type="icon-add-fill"
                  style={{width:'80px' , fontSize: '20px', paddingRight: '4px', marginTop: '2px' }}
                  onClick={e => this.openModal(e, 'draw')}
                />
              </div>
            }
            dataSource={this.props.projectContentData.filter(item => item.type === 'draw')}
            renderItem={item =>
              <List.Item>
                {
                  <div key={item.id} className='add_data'
                    style={{ width:'100%', height: '20px', marginLeft: '10px', marginBottom: '6px' }}
                  >
                    <Folder type="icon-draw" style={{ fontSize: '16px', paddingRight: '4px', marginTop: '3px' }} />
                    <span style={{ display: 'inline-block', width: '70%', fontSize: '16px', marginLeft: '10px' }}
                       onClick={e => this.getContentInfo(e, item.id, 'draw')}
                    >
                    {item.drawingNo + '-' + item.name + '/' + item.version}
                    </span>
                    <Popconfirm
                      title="确定解除关联吗？"
                      onConfirm={e => this.confirm(e, item.id)}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon type="delete"
                        style={{ width:'80px', color: 'red', fontSize: '16px', marginTop:'6px'}} />
                    </Popconfirm>
                  </div>
                }
              </List.Item>}
          />
        </div>
        <AddDrawsModal
          visible={this.state.drawVisible}
          cancle={this.closeModal}
          drawInfo={this.props.projectContentData.filter(item => item.type === 'draw')}
        />
        <div style={{margin:'40px'}}>
          <List
            size="small"
            bordered
            key='document'
            header={
              <div  className='add_data'>
                <span style={{ fontSize: '18px', width:'120px' }}>文档</span>
                <Folder type="icon-add-fill"
                  style={{ width:'80px' , fontSize: '20px', paddingRight: '4px', marginTop: '2px'}}
                  onClick={e => this.openModal(e, 'file')}
                />
              </div>
            }
            dataSource={this.props.projectContentData.filter(item => item.type === 'document')}
            renderItem={item =>
              <List.Item>
                {
                  <div key={item.id} className='add_data'
                    style={{ width:'100%', height: '20px', marginLeft: '10px', marginBottom: '6px' }}
                  >
                   <Folder type="icon-wendang" style={{ fontSize: '16px', paddingRight: '4px', marginTop: '3px' }} />
                    <span style={{ display: 'inline-block',width: '70%', fontSize: '16px', marginLeft: '10px' }}
                       onClick={e => this.getContentInfo(e, item.id, 'dss')}
                    >
                     {item.documentNo + '-' + item.name}
                    </span>
                    <Popconfirm
                      title="确定解除关联吗？"
                      onConfirm={e => this.confirm(e, item.id)}
                      onCancel={this.cancel}
                      okText="确定"
                      cancelText="取消"
                    >
                      <Icon type="delete"
                      style={{ width:'80px', color: 'red', fontSize: '16px', marginTop:'6px'}} />
                    </Popconfirm>
                 </div>
                }
              </List.Item>}
          />
        </div>
        <AddFileModal
          visible={this.state.fileVisible}
          cancle={this.closeModal}
          filesInfo={ this.props.projectContentData.filter(item => item.type === 'document') }
        />
      </Fragment>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    selectedKeys: state.get('commonReducer').get('programSelectedkeys').toJS(),
    projectContentData: state.get('viewsReducer').get('AloneProjectAllInfo').toJS(),
    programId: state.get('commonReducer').get('programSelectedkeys').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPartBom: data => dispatch(createPartBom(data)),
    storeProjectAllDatas: data => dispatch(storeProjectAllDatas(data)),
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(ProjectData)
