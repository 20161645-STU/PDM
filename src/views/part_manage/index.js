import React, { Component, Fragment } from 'react';
import './style.less';
import { Tree, Button, message} from 'antd'

import store from '../../store'
import { actionCreators as viewsAction } from '../store';

import { Model } from '../../dataModule/testBone';
import { getAlonePartUrl } from '../../../src/dataModule/UrlList';

import { getUserName } from '../../../src/publicFunction';
import { connect } from 'react-redux';
import { sentDetilType, storePartExpandedKeys, storePartSelectedkeys } from '../../components/common/store/actionCreaters'
import { createPartBom } from '../store/actionCreaters'

import Folder from '../../publicComponents/IconFonts'

const { DirectoryTree,TreeNode } = Tree;
const model = new Model()


class PartManage extends Component {
  constructor(props) {
    super (props);
    this.state =  {
      detail_type: '',
      id: ''
    }
  }
    
  //生命周期函数
  componentDidMount() {
    store.dispatch(viewsAction.getAllParts())  
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
          me.sentPartMes( res.data)
      },
      function (error) {
          message.error('获取零件信息失败！')
      },
      false
    )
  }

  //查看零件详情
  getTypeName = (keys, event) => {
    // console.log('id', keys, event);
    if (keys[0] === '0' || keys[0] === '1') {
        // console.log('id', keys);
    } else if (keys[0].substring(keys[0].length - 3, keys[0].length) === 'bom') {
      this.props.sendTypeMes({})
      this.props.createPartBom({
        type: 'BOM',
        partId: keys[0].substring(0, keys[0].length -3)
      })
    } else {
      this.getAlonePart(keys[0])
    }
    let params = {
        selectedKeys: keys[0]
    }
    this.storeSelectedkeys(params)
  }

  //给rendux发送文件类型
  sentPartMes = (alonePartDatas) => {
    let params = {
        detail_type:'part',
        alonePartDatas  //单个零件详情
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
  createParts = () => {
    this.props.history.push('/app/part_manage/add_part_process')
  }
  
  //抽离出item级数据
  handleItemData = (key, params) => {
    if (key === 'mine') {
      const myPartItemData = params.filter(item => item.createdBy === getUserName() & item.version === 'item')
      return myPartItemData
    } else {
      const otherPartItemData = params.filter(item => item.createdBy !== getUserName()  & item.version === 'item')
      return otherPartItemData
    }
  }

  //抽离出非item级数据
  handleData = (key, params) => {
    if (key === 'mine') {
      const myPartData = params.filter(item => item.createdBy === getUserName() & item.version !== 'item')
      return myPartData
    } else {
      const otherPartData = params.filter(item => item.createdBy !== getUserName()  & item.version !== 'item')
      return otherPartData
    }
  }

  render() {
    const { expandedKeys, selectedKeys } = this.props
    const myPartItemData = this.handleItemData('mine', this.props.allPartsInfo)
    const otherPartItemData = this.handleItemData('', this.props.allPartsInfo)
    const myPartData = this.handleData('mine', this.props.allPartsInfo)
    const otherPartData = this.handleData('', this.props.allPartsInfo)
    // console.log('allPartsInfo', this.props.allPartsInfo)
    // console.log('myPartData', myPartData)
    if (expandedKeys.expandedKeys === undefined) {
        this.storeExpandedKeys({})
        this.storeSelectedkeys({})
    }
    return (
      <Fragment>
        <div className="part_div">
          <span className="part_title">零件管理</span>
          <Button type="primary" icon="plus"  className="part_create" onClick={this.createParts}>创建零件</Button>
        </div>
        <DirectoryTree multiple className="treeName"
          onSelect={this.getTypeName}
          onExpand={this.onExpand}
          defaultExpandedKeys={[expandedKeys.expandedKeys]}
          defaultSelectedKeys={[selectedKeys.selectedKeys]}
          icon={<Folder type="icon-wenjianjia" style={ { fontSize:'20px', paddingRight:'4px', marginTop:'3px'}}/>}
        >
          <TreeNode title="我的零件" key="0">
          {myPartItemData.length !== 0 ? myPartItemData.map((item) => {
            if (item.tssType === 'EI') {
              return (
                <TreeNode title={item.partNo + '-' + item.name} key={item.id}
                  icon={<Folder type="icon-zhuangpeiti" style={{ fontSize: '20px', paddingRight: '4px' }} />}
                >
                  {myPartData.length !== 0 ? myPartData.map((params, index) => {
                    if (params.partNo === item.partNo && params.tssType === 'EI') {
                      return (
                        <TreeNode title={params.partNo + '-' + params.name + '/' + params.version} key={params.id}
                          icon={<Folder type="icon-zhuangpeiti" style={{ fontSize: '20px', paddingRight: '4px' }} />}
                        >
                          <TreeNode title='BOM' key={params.id + 'bom'} isLeaf
                            icon={<Folder type="icon-TREE" style={{ fontSize: '22px', paddingRight: '4px' }} />}
                          />
                        </TreeNode>
                      )
                    }
                    return null
                  }) : null}
                </TreeNode>
              )
              } else if (item.tssType === 'normal') {
                return (
                  <TreeNode title={item.partNo + '-' + item.name} key={item.id}
                    icon={<Folder type="icon-icon-" style={{ fontSize: '20px', paddingRight: '4px' }} />}
                  >
                    {myPartData.length !== 0 ? myPartData.map((params) => {
                      if (params.partNo === item.partNo && params.tssType === 'normal') {
                        return (
                          <TreeNode title={params.partNo + '-' + params.name + '/' + params.version} key={params.id} isLeaf
                            icon={<Folder type="icon-icon-" style={{ fontSize: '20px', paddingRight: '4px' }} />}
                          />
                        )
                      }
                      return null
                    }) : null}
                  </TreeNode>
                )
              }
              return null
            }) : null }
          </TreeNode>
          <TreeNode title="其他零件" key="1">
            {otherPartItemData.length !== 0 ? otherPartItemData.map((item) => {
              if (item.tssType === 'EI') {
                return (
                  <TreeNode title={item.partNo + '-' + item.name} key={item.id} 
                    icon={<Folder type="icon-zhuangpeiti" style={{ fontSize: '20px', paddingRight: '4px' }} />}
                  >
                      {otherPartData.length !== 0 ? otherPartData.map((params) => {
                      if (params.partNo === item.partNo && params.tssType === 'EI') {
                        return (
                          <TreeNode title={params.partNo + '-' + params.name  + '/' + params.version} key={params.id} isLeaf
                            icon={<Folder type="icon-zhuangpeiti" style={{ fontSize: '20px', paddingRight: '4px' }} />}
                          />
                        )
                      }
                      return null
                    }) : null}
                  </TreeNode>
                )
              } else if (item.tssType === 'normal') {
                return (
                  <TreeNode title={item.partNo + '-' + item.name} key={item.id} 
                    icon={<Folder type="icon-icon-" style={{ fontSize: '20px', paddingRight: '4px' }} />}
                  >
                      {otherPartData.length !== 0 ? otherPartData.map((params) => {
                      if (params.partNo === item.partNo && params.tssType === 'normal') {
                        return (
                          <TreeNode title={params.partNo + '-' + params.name  + '/' + params.version} key={params.id} isLeaf
                            icon={<Folder type="icon-icon-" style={{ fontSize: '20px', paddingRight: '4px' }} />}
                          />
                        )
                      }
                      return null
                    }) : null}
                  </TreeNode>
                )
              }
              return null
            }) : null }
          </TreeNode>
        </DirectoryTree>    
    </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    expandedKeys: state.get('commonReducer').get('partExpandedKeys').toJS(),
    selectedKeys: state.get('commonReducer').get('partSelectedkeys').toJS(),
    allPartsInfo: state.get('viewsReducer').get('allPartsInfo').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTypeMes: data => dispatch(sentDetilType(data)),
    storeExpandedKeys: data => dispatch(storePartExpandedKeys(data)),
    storeSelectedkeys: data => dispatch(storePartSelectedkeys(data)),
    createPartBom: data => dispatch(createPartBom(data)),
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PartManage);