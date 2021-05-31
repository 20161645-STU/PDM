import React, { Component, Fragment } from 'react';
import './style.less';
import { Tree, Button, Icon, message } from 'antd';

import { Model } from '../../dataModule/testBone';
import { getAllPartsUrl, getAlonePartUrl } from '../../../src/dataModule/UrlList';

// import { getUserName } from '../../../src/publicFunction';
import { connect } from 'react-redux';
import { sentDetilType, storeExpandedKeys,  storeSelectedkeys } from '../../components/common/store/actionCreaters'

const { DirectoryTree,TreeNode } = Tree;
const model = new Model()


class PartManage extends Component {
    constructor(props) {
      super (props);
      this.state =  {
        detail_type: '',
        id: '',
        partsDatas:[],     //所有的零件信息
        folderData: [{
            title: '我的零件',
            key: 1           
        }, {
            title: '其他零件',
            key: 2
        }]
      }
    }
    
     //生命周期函数
    componentDidMount() {
      this.getAllParts()
    }

    //获取所有零件数据
    getAllParts = () => {
      let me = this
      model.fetch(
          {},
          getAllPartsUrl,
          'get',
          function (res) {
              // console.log(111, res)
              me.setState({
                  partsDatas: res.data
              })
          },
          function (error) {
              message.error('获取零件信息失败！')
          },
          false
      )
    }

    // 获得单个零件的详细信息
    getAlonePart = (params) => {
      let me = this
      model.fetch(
          {id: params},
          getAlonePartUrl,
          'get',
          function (res) {
              // console.slog(111, res.data[0])
              me.sentPartMes( res.data[0])
          },
          function (error) {
              message.error('获取零件信息失败！')
          },
          false
      )
    }

    //查看零件详情
    getTypeName = (keys, event) => {
      // console.log('id', keys);
      if (keys[0] === '0' || keys[0] === '1') {
          console.log('id', keys);
      } else {
        this.setState({
          detail_type: 'part'
        })
        this.getAlonePart(keys[0])
      }
      let params = {
          selectedKeys: keys[0]
      }
      this.storeSelectedkeys(params)
    }

    //给rendux发送文件类型
    sentPartMes = (alonePartDatas) => {
      const { detail_type } = this.state
      let params = {
          detail_type,
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
      this.props.history.push('/app/part_manage/add_part')
    }

    render() {
      const { folderData, partsDatas } = this.state
      const { expandedKeys, selectedKeys } = this.props
      // console.log(expandedKeys, selectedKeys)
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
              <DirectoryTree multiple onSelect={this.getTypeName} onExpand={this.onExpand} defaultExpandedKeys={[expandedKeys.expandedKeys]} defaultSelectedKeys={[selectedKeys.selectedKeys]} >
                  {folderData.map((item,index) => {
                      return (
                          <TreeNode title={item.title} key={index}>
                              {partsDatas.map((item) => {
                                  if (true) {
                                      return (
                                          <TreeNode title={item.name} key={item.id} icon={ <Icon type="folder" />}  isLeaf/>
                                          // <TreeNode title={item.name} key={item.id} isLeaf icon={ <Icon type="codepen" />}/>
                                          // <TreeNode title={secItem.name} key={secItem.id} >
                                          //     {/* {thirdData.map((thirItem) => {
                                          //         if (thirItem.type === secItem.title) {
                                          //             return (
                                          //                 <TreeNode title={thirItem.title} key={thirItem.key} isLeaf icon={ <Icon type="codepen" />}/>
                                          //            )
                                          //         }
                                          //         return null
                                          //     }) } */}
                                          // </TreeNode>
                                      )
                                  }
                                  return null
                              })}
                          </TreeNode>
                      )
                  })}
              </DirectoryTree>    
          </Fragment>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    expandedKeys: state.get('commonReducer').get('expandedKeys').toJS(),
    selectedKeys: state.get('commonReducer').get('selectedkeys').toJS()
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendTypeMes: data => dispatch(sentDetilType(data)),
    storeExpandedKeys: data => dispatch(storeExpandedKeys(data)),
    storeSelectedkeys: data => dispatch(storeSelectedkeys(data))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PartManage);