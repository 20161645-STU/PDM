import React, { Component, Fragment } from 'react';
import { Tree, Button, message } from 'antd';

import store from '../../store'
import { actionCreators as viewsAction } from '../store';

import { Model } from '../../dataModule/testBone'
import { getAloneDrawUrl } from '../../../src/dataModule/UrlList'

import { getUserName } from '../../../src/publicFunction'
import './style.less'
import { connect } from 'react-redux';
import { sentDetilType, storeDrawExpandedKeys, storeDrawSelectedkeys } from '../../components/common/store/actionCreaters'

import Folder from '../../publicComponents/IconFonts'

const { TreeNode, DirectoryTree } = Tree;

const model = new Model()


class DrawingManage extends Component {
  constructor(props) {
    super (props);
    this.state = {
      detail_type: '',
    }
  }

    //生命周期函数
  componentDidMount() {
    store.dispatch(viewsAction.getAllDrawings())  
  }

  //查看图纸详情
  getTypeName = (keys, event) => {
    // console.log('id', keys);
    if (keys[0] === '0' || keys[0] === '1') {
        console.log('id', keys);
    } else {
        this.setState({
          detail_type: 'drawing'
        })
        this.getAloneDraws(keys[0])
    }
    let params = {
        selectedKeys: keys[0]
    }
    this.storeSelectedkeys(params)
  }

  // 获得单个图纸的详细信息
  getAloneDraws = (params) => {
    let me = this
    model.fetch(
      {id: params},
      getAloneDrawUrl,
      'get',
      function (res) {
        console.log(111, res.data)
        me.sentDrawMes( res.data)
      },
      function (error) {
        message.error('获取图纸信息失败！')
      },
      false
    )
  }

  //给rendux发送文件类型
  sentDrawMes = (aloneDrawsDatas) => {
    const { detail_type } = this.state
    let params = {
        detail_type,
        aloneDrawsDatas  //单个图纸详情
    }
    // console.log(params)
    this.props.sendTypeMes(params)
  }
    
  onExpand = (keys) => {
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


  //跳转创建图纸
  createDraws = () => {
    this.props.history.push('/app/drawing_manage/add_drawing_process')
  }

  //抽离出item级数据
  handleItemData = (key, params) => {
    if (key === 'mine') {
      const myDrawingItemData = params.filter(item => item.createdBy === getUserName() & item.version === 'item')
      return myDrawingItemData
    } else {
      const otherDrawingItemData = params.filter(item => item.createdBy !== getUserName()  & item.version === 'item')
      return otherDrawingItemData
    }
  }

  //抽离出非item级数据
  handleData = (key, params) => {
    if (key === 'mine') {
      const myDrawData = params.filter(item => item.createdBy === getUserName() & item.version !== 'item')
      return myDrawData
    } else {
      const otherDrawingData = params.filter(item => item.createdBy !== getUserName()  & item.version !== 'item')
      return otherDrawingData
    }
  }

  render() {
    const { expandedKeys, selectedKeys } = this.props
    const myDrawingItemData = this.handleItemData('mine', this.props.allDrawingsInfo)
    const otherDrawingItemData = this.handleItemData('', this.props.allDrawingsInfo)
    const myDrawData = this.handleData('mine', this.props.allDrawingsInfo)
    const otherDrawingData = this.handleData('', this.props.allDrawingsInfo)
    // console.log('otherDrawingItemData', otherDrawingItemData)
    if (expandedKeys.expandedKeys === undefined) {
        this.storeExpandedKeys({})
        this.storeSelectedkeys({})
    }
    return (
        <Fragment>
            <div className="draw_div">
              <span className="draw_title">图纸管理</span>
              <Button type="primary" icon="plus"  className="draw_create" onClick={this.createDraws}>创建图纸</Button>
            </div>
        <DirectoryTree multiple className="treeName"
          onSelect={this.getTypeName}
          onExpand={this.onExpand}
          defaultExpandedKeys={[expandedKeys.expandedKeys]}
          defaultSelectedKeys={[selectedKeys.selectedKeys]}
          icon={<Folder type="icon-wenjianjia"  style={ { fontSize:'20px', paddingRight:'4px', marginTop:'3px'}}/>}
        >
          <TreeNode title="我的图纸" key="0">
              {myDrawingItemData.length !== 0 ? myDrawingItemData.map((item) => {
                return (
                  <TreeNode title={item.drawingNo + '-' + item.name} key={item.id} 
                    icon={<Folder type="icon-draw" style={{ fontSize: '18px', paddingRight: '4px' }} />}
                  >
                    {myDrawData.length !== 0 ? myDrawData.map((params) => {
                      if (params.drawingNo === item.drawingNo) {
                        return (
                          <TreeNode title={params.drawingNo + '-' + params.name + '/' + params.version} key={params.id} isLeaf
                            icon={<Folder type="icon-draw" style={{ fontSize: '18px', paddingRight: '4px' }} />}
                          />
                          )
                      }
                      return null
                    }) : null}
                  </TreeNode>
                )
              }) : null }
            </TreeNode>
            <TreeNode title="其他图纸" key="1">
              {otherDrawingItemData.length !== 0 ? otherDrawingItemData.map((item) => {
                return (
                  <TreeNode title={item.drawingNo + '-' + item.name} key={item.id} 
                    icon={<Folder type="icon-draw" style={{ fontSize: '18px', paddingRight: '4px' }} />}
                  >
                     {otherDrawingData.length !== 0 ? otherDrawingData.map((params) => {
                      if (params.drawingNo === item.drawingNo) {
                        return (
                          <TreeNode title={params.drawingNo + '-' + params.name + '/' + params.version} key={params.id} isLeaf
                            icon={<Folder type="icon-draw" style={{ fontSize: '18px', paddingRight: '4px' }} />}
                          />
                          )
                      }
                      return null
                    }) : null}
                  </TreeNode>
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
    expandedKeys: state.get('commonReducer').get('drawExpandedKeys').toJS(),
    selectedKeys: state.get('commonReducer').get('drawSelectedkeys').toJS(),
    allDrawingsInfo: state.get('viewsReducer').get('allDrawingsInfo').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTypeMes: data => dispatch(sentDetilType(data)),
    storeExpandedKeys: data => dispatch(storeDrawExpandedKeys(data)),
    storeSelectedkeys: data => dispatch(storeDrawSelectedkeys(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DrawingManage)

