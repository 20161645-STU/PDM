import React, { Component, Fragment } from 'react';
import { Tree, Button, message, Icon } from 'antd';

import { Model } from '../../dataModule/testBone'
import { getAllDrawsUrl, getAloneDrawUrl } from '../../../src/dataModule/UrlList'

import { getUserName } from '../../../src/publicFunction'
import './style.less'
import { connect } from 'react-redux';
import { sentDetilType, storeDrawExpandedKeys,  storeDrawSelectedkeys } from '../../components/common/store/actionCreaters'

const { TreeNode, DirectoryTree } = Tree;

const model = new Model()


class DrawingManage extends Component {
  constructor(props) {
    super (props);
    this.state = {
      detail_type: '',
      drawsDatas: [],     //所有的图纸信息
      folderData: [{
          title: '我的图纸',
          key: 1           
      }, {
          title: '其他图纸',
          key: 2
      }],
      testData: [{
        name: 10011,
        id: 10011
      },{
        name: 10012,
        id: 10012
      },
      ]
    }
  }

  //生命周期函数
  // componentDidMount() {
  //   this.getAllDraws()
  // }

  //获取所有图纸数据
  getAllDraws = () => {
    let me = this
    model.fetch(
        {},
        getAllDrawsUrl,
        'get',
        function (res) {
          // console.log(res)
          me.setState({
              drawsDatas: res.data
          })
        },
        function (error) {
          message.error('获取图纸信息失败！')
        },
        false
    )
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
        // this.getAloneDraws(keys[0])
    }
    let params = {
        drawSelectedKeys: keys[0]
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
          // console.log(111, res.data[0])
          me.sentDrawMes( res.data[0])
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

  sentDocuments = () => {
    console.log(11222)
  }

  render() {
    const { folderData, drawsDatas, testData } = this.state
    const { expandedKeys, selectedKeys } = this.props
    // console.log(expandedKeys, selectedKeys)
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
        <DirectoryTree multiple onSelect={this.getTypeName} onExpand={this.onExpand}
          defaultExpandedKeys={[expandedKeys.expandedKeys]}
          defaultSelectedKeys={[selectedKeys.selectedKeys]}
          onRightClick={this.sentDocuments}
        >
          {folderData.map((item,index) => {
              return (
                <TreeNode title={item.title} key={index} >
                    {drawsDatas.length !== 0 ? drawsDatas.map((item) => {
                        if (item.createdBy === getUserName()) {
                            return (
                                <TreeNode title={item.name} key={item.id} isLeaf icon={ <Icon type="folder" />}/>
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
                    }) : testData.map((item) => {
                      return (
                        <TreeNode title={item.name} key={item.id} isLeaf icon={ <Icon type="folder" />}/>
                      )
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
    expandedKeys: state.get('commonReducer').get('drawExpandedKeys').toJS(),
    selectedKeys: state.get('commonReducer').get('drawSelectedkeys').toJS()
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

