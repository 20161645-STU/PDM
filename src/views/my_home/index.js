import React, { Component } from 'react';
import './style.less';
import { Tree, Button, message } from 'antd';
import { getFolderContentId } from '../../publicFunction/index'

import { Model } from '../../dataModule/testBone'
import { getAllFolderUrl, getAloneFolderOwnUrl } from '../../../src/dataModule/UrlList'

import Folder from '../../publicComponents/IconFonts'

import { connect } from 'react-redux';
import { storeFolderExpandedKeys, storeFolderAllDatas, sentDetilType } from '../../components/common/store/actionCreaters'

import store from '../../store'
import { actionCreators as commonAction } from '../../components/common/store';

const { DirectoryTree, TreeNode } = Tree;
const model = new Model()
 

class  FolderManage extends Component {
  constructor(props) {
    super (props);
    this.state = {
      detail_type: '',
      folder_id: '',
      foldersData: []
    }
  }

  componentDidMount() {
    this.getAllFolders()
  }

  //获取所有的文件夹
  getAllFolders = () => {
    let me = this
    model.fetch(
      {},
      getAllFolderUrl,
      'get',
      function (res) {
        // console.log(res.data)
        me.setState({
          foldersData: res.data
        })
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
    // console.log(keys)
    // this.props.history.push("/app/my_home/add_folder_context/" + keys)
    this.sentProjectMes(keys[0])
  }

  //给rendux发送文件类型
  sentProjectMes = (value) => {
    const folderInfo =  {id:value}
    let params = {
        detail_type: 'add_folder_context',
        folderInfo //文件夹的id
    }
    // console.log(params)
    // store.dispatch(commonAction.sentDetilType(params))
    this.props.sendTypeMes(params)
  }

  //获取该文件夹所有内容的id
  getFolderContentId = (params) => {
    let me = this
    model.fetch(
      {folder_id: params},
      getAloneFolderOwnUrl,
      'get',
      function (res) {
        // console.log('id', res.data)
        me.handleContentId(res.data).then(res => {
          // console.log('folderContentData', res)
          me.props.storeFolderAllDatas(res)
        })
      },
      function () {
        // console.log(111)
        // message.error('获取文件夹内容失败！')
      },
      false
    )
  }

  //对文件夹内容id循环获取具体数据
  handleContentId = async (params) => {
    const folderContentData = []
    for (let i = 0; i < params.length; i++) {
      folderContentData.push(await getFolderContentId(params[i]))
    }
    return Promise.all(folderContentData)
  }

  //给redux发送文件夹内容数据id
  sentFolderContentId = (params) => {
    store.dispatch(commonAction.getFolderContentId(params)) 
  }

  onExpand = (keys) => {
    // console.log(1, keys)
    let params = {
      expandedKeys: keys[0]
    }
    this.storeExpandedKeys(params)
    // this.getFolderContentId(keys[0])
  }

  //在redux在保存树的状态
  storeExpandedKeys = (params) => {
    this.props.storeExpandedKeys(params)
  }
    
  render() {
    const { foldersData } = this.state
    // console.log('folderData', folderData)
    const { expandedKeys  } = this.props
   
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
            icon={<Folder type="icon-wenjianjia" style={ { fontSize:'20px', paddingRight:'4px', marginTop:'2px'}}/>}
          >
          {foldersData.length !== 0 ? foldersData.map((item) => {
            if (item.folder_level === '1') {
              return (
                <TreeNode title={item.name} key={item.id}>
                  <TreeNode title={'folder data'} key={item.id + '01'} isLeaf
                    icon={<Folder type="icon-data"  style={ { fontSize:'20px', paddingRight:'4px', marginTop:'3px'}}/>} />
                </TreeNode>
              )
            }
            return null
            }) : null }
          </DirectoryTree>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expandedKeys: state.get('commonReducer').get('folderExpandedKeys').toJS(),
    folderContentData: state.get('commonReducer').get('folderContentData').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTypeMes: data => dispatch(sentDetilType(data)),
    storeExpandedKeys: data => dispatch(storeFolderExpandedKeys(data)),
    storeFolderAllDatas: data => dispatch(storeFolderAllDatas(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FolderManage)