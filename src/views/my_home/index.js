/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import './style.less';
import { Tree, Button, message } from 'antd';

import { Model } from '../../dataModule/testBone'
import { getAllFolderUrl, getAloneFolderOwnUrl } from '../../../src/dataModule/UrlList'

import Folder from '../../publicComponents/IconFonts'

import { connect } from 'react-redux';
import { storeFolderExpandedKeys, storeFolderSelectedkeys } from '../../components/common/store/actionCreaters'

import store from '../../store'
import { actionCreators as commonAction } from '../../components/common/store';

const { DirectoryTree, TreeNode } = Tree;
const model = new Model()
 

class  FolderManage extends Component {
  constructor(props) {
    super (props);
    this.state = {
      folderData: [{
        name: '001', id: '001',folder_level: '1', childer: [
          {
          name:'螺栓', id:'00001',type: 'part',partNo:'000001'
        },{
          name:'螺栓图纸', id:'00002',type: 'draw',partNo:'000002'
        },{
          name:'文档', id:'00001',type: 'document',partNo:'000003'
        }]
      }, {
        name: '002', id:'002', folder_level: '1'
        }, {
        name: '003', id:'003', folder_level: '1'
      }],
      detail_type: '',
      folder_id: '',
      // folderContent: []
    }
  }

  // componentDidMount() {
  //   this.getAllFolders()
  // }

  //获取所有的文件夹
  getAllFolders = () => {
    // let me = this
    model.fetch(
      {},
      getAllFolderUrl,
      'get',
      function (res) {
        console.log(res.data)
        // me.setState({
        //   folderData: res.data
        // })
      },
      function (error) {
        message.error('获取文件夹失败！')
      },
      false
    )
  }
  
  //新建文件夹
  createFolders = () =>{
    this.props.history.push("/app/my_home/add_folder")
  }

  //查看文件夹详情
  getTypeName = (keys, event) => {
    console.log('index + id', keys);
    // if (keys.length !== 0) {
    //   let params = {
    //     selectedKeys: keys[0].substr(0, 1)
    //   }
    //   this.storeSelectedkeys(params)
    //   this.getFolderContentId(keys[0].substr(1))
    // } 
  }

  //获取该文件夹所有内容的id
  getFolderContentId = (params) => {
    // console.log(params)
    let me = this
    model.fetch(
      {folder_id: params},
      getAloneFolderOwnUrl,
      'get',
      function (res) {
        console.log('id', res.data)
        me.sentFolderContentId(res.data)
      },
      function () {
        // console.log(111)
        // message.error('获取文件夹内容失败！')
      },
      false
    )
  }

  //给redux发送文件夹内容数据id
  sentFolderContentId = (params) => {
    store.dispatch(commonAction.getFolderContentId(params)) 
  }

  onExpand = (keys) => {
    // console.log(1, keys)
    if (keys.length !== 0) {
      let params = {
        expandedKeys: keys[0].substr(0, 1)
      }
      this.storeExpandedKeys(params)
    } 
  }

  //在redux在保存树的状态
  storeExpandedKeys = (params) => {
    this.props.storeExpandedKeys(params)
  }

  storeSelectedkeys = (params) => {
    this.props.storeSelectedkeys(params)
  }

    
  render() {
    const { folderData } = this.state
    // console.log('folderData', folderData)
    const { expandedKeys, selectedKeys  } = this.props
    // console.log('folderContentData', folderContentData)
  //   if (expandedKeys.expandedKeys === undefined) {
  //     this.storeExpandedKeys({})
  //     this.storeSelectedkeys({})
  // }
    return (
      <div>
        <div className="file_div">
          <span className="file_title">我的首页</span>
          <Button type="primary" icon="plus"  className="file_create" onClick={this.createFolders}>新建文件夹</Button>
        </div>
        <DirectoryTree multiple className="treeName"
            onSelect={this.getTypeName}
            onExpand={this.onExpand}
            defaultExpandedKeys={[expandedKeys.expandedKeys]}
            defaultSelectedKeys={[selectedKeys.selectedKeys]}
            icon={<Folder type="icon-wenjianjia" style={ { fontSize:'20px', paddingRight:'4px', marginTop:'2px'}}/>}
          >
          {folderData.length !== 0 ? folderData.map((item, index) => {
            if (item.folder_level === '1') {
              return (
                <TreeNode title={item.name} key={index.toString() + item.id}>
                  {/* {folderContentData.length !== 0 ? folderContentData.map((item) => {
                    if (item.type === 'draw') {
                      return (
                        <TreeNode title={item.drawingNo + item.name} key={item.id} isLeaf
                          icon={<Folder type="icon-draw" style={{ fontSize: '18px', paddingRight: '4px', marginTop: '3px' }} />} />
                      )
                    } else if (item.type === 'part') {
                      return (
                        <TreeNode title={item.partNo + item.name} key={item.id} isLeaf
                          icon={<Folder type="icon-lingjian" style={{ fontSize: '18px', paddingRight: '4px', marginTop: '3px' }} />} />
                      )
                    } else if (item.type === 'document') {
                      return (
                        <TreeNode title={item.documentNo + item.name} key={item.id} isLeaf
                          icon={<Folder type="icon-wendang" style={{ fontSize: '20px', paddingRight: '4px', marginTop: '3px' }} />} />
                      )
                    }
                    else if (item.item === 'project') {
                      return (
                        <TreeNode title={item.project_no + item.name} key={item.id} isLeaf
                          icon={<Folder type="icon-1-66" style={{ fontSize: '20px', paddingRight: '4px', marginTop: '3px' }} />} />
                      )
                    }
                    else if (item.folder_level === '2') {
                      return (
                        <TreeNode title={item.name} key={item.id} isLeaf
                          icon={<Folder type="icon-wenjianjia" style={{ fontSize: '20px', paddingRight: '4px', marginTop: '3px' }} />}
                        />
                      )
                    } else {
                      return null
                    }
                  }) : null} */}
                </TreeNode>
              )}
            }) : null }
          </DirectoryTree>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expandedKeys: state.get('commonReducer').get('folderExpandedKeys').toJS(),
    selectedKeys: state.get('commonReducer').get('folderSelectedkeys').toJS(),
    folderContentData: state.get('commonReducer').get('folderContentData').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // sendTypeMes: data => dispatch(sentDetilType(data)),
    storeExpandedKeys: data => dispatch(storeFolderExpandedKeys(data)),
    storeSelectedkeys: data => dispatch(storeFolderSelectedkeys(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderManage)