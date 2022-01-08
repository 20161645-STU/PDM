import React, { Component, Fragment } from 'react';
import { Tree, Button, message } from 'antd';
import './style.less'
import { getUserName } from '../../publicFunction/index'

import { connect } from 'react-redux'
import { sentDetilType, storeFileExpandedKeys, storeFileSelectedkeys } from '../../components/common/store/actionCreaters'

import { Model } from '../../dataModule/testBone'
import { getAloneDocumentUrl } from '../../../src/dataModule/UrlList'

import store from '../../store'
import { actionCreators as viewsAction } from '../store';

import Folder from '../../publicComponents/IconFonts'

const { TreeNode, DirectoryTree } = Tree;
const model = new Model()

class FileManage extends Component {
  constructor(props) {
    super (props);
    this.state = {
      detail_type: '',
      id: '',
    }
  }

  //生命周期函数
  componentDidMount() {
    store.dispatch(viewsAction.getAllDocuments())  
  }

  // 获得单个文档的详细信息
  getAloneDocument = (params) => {
    let me = this
    model.fetch(
      {id: params},
      getAloneDocumentUrl,
      'get',
      function (res) {
        // console.log(111, res.data)
        me.sentDocumentMes( res.data)
      },
      function (error) {
        message.error('获取文档信息失败！')
      },
      false
    )
  }


  //查看文档详情
  getTypeName = (keys, event) => {
    // console.log('id', keys);
    if (keys[0] === '0' || keys[0] === '1') {
      console.log('id', keys);
    } else {
      this.setState({
        detail_type: 'file',
      })
      this.getAloneDocument(keys[0])
    }
    let params = {
      selectedKeys: keys[0]
    }
    this.storeSelectedkeys(params)
  }

  //给rendux发送文档类型
  sentDocumentMes = (aloneDocumentDatas) => {
    const { detail_type } = this.state
    let params = {
      detail_type,
      aloneDocumentDatas,  //单个文档详情  
    }
    // console.log(params)
    this.props.sendTypeMes(params)
  }

  onExpand = (keys) => {
    // console.log(1, keys)
    let params = {
        expandedKeys: keys[0]
    }
    this.storeExpandedKeys(params)
  }

  //在redux在保存树的状态
  storeExpandedKeys = (params) => {
    this.props.storeExpandedKeys(params)
  }

  storeSelectedkeys = (params) => {
    this.props.storeSelectedkeys(params)
  }

  //创建新文档
  createFiles = () => {
    this.props.history.push('/app/file_manage/add_file_process')
  }
  
  handleData = (key, params) => {
    if (key === 'mine') {
      const myFilesData = params.filter(item => item.createdBy === getUserName())
      return myFilesData
    } else {
      const otherFilesData = params.filter(item => item.createdBy !== getUserName())
      return otherFilesData
    }
  }

  render() {
    const { expandedKeys, selectedKeys } = this.props
    const myFilesData = this.handleData('mine', this.props.allDocumentsInfo)
    const otherFilesData = this.handleData('', this.props.allDocumentsInfo)
    // console.log('myFileData', myFilesData)
    if (expandedKeys.expandedKeys === undefined) {
        this.storeExpandedKeys({})
        this.storeSelectedkeys({})
    }
    return (
      <Fragment>
        <div className="file_div">
          <span className="file_title">文档管理</span>
          <Button type="primary" icon="plus"  className="file_create" onClick={this.createFiles}>创建文档</Button>
        </div>
        <DirectoryTree multiple className="treeName"
          onSelect={this.getTypeName}
          onExpand={this.onExpand}
          defaultExpandedKeys={[expandedKeys.expandedKeys]}
          defaultSelectedKeys={[selectedKeys.selectedKeys]}
          icon={<Folder type="icon-wenjianjia" style={ { fontSize:'20px', paddingRight:'4px', marginTop:'3px'}}/>}
        >
          <TreeNode title="我的文档" key="0">
            {myFilesData.length !== 0 ? myFilesData.map((item) => {
              return (
                <TreeNode title={item.documentNo + '-' + item.name } key={item.id} isLeaf
                  icon={<Folder type="icon-wendang" style={{ fontSize: '18px', paddingRight: '4px' }} />}
                />
              )
            }) : null }
          </TreeNode>
          <TreeNode title="其他文档" key="1">
            {otherFilesData.length !== 0 ? otherFilesData.map((item) => {
              return (
                <TreeNode title={item.documentNo + '-' + item.name  } key={item.id} isLeaf
                  icon={<Folder type="icon-wendang" style={{ fontSize: '18px', paddingRight: '4px' }} />}
                />
              )
            }) : null }
          </TreeNode>
        </DirectoryTree>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expandedKeys: state.get('commonReducer').get('fileExpandedKeys').toJS(),
    selectedKeys: state.get('commonReducer').get('fileSelectedkeys').toJS(),
    allDocumentsInfo: state.get('viewsReducer').get('allDocumentsInfo').toJS(),
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    sendTypeMes: data => dispatch(sentDetilType(data)),
    storeExpandedKeys: data => dispatch(storeFileExpandedKeys(data)),
    storeSelectedkeys: data => dispatch(storeFileSelectedkeys(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileManage);