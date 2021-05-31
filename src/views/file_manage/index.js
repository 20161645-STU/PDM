import React, { Component, Fragment } from 'react';
import { Tree, Button, Icon, message } from 'antd';
import './style.less'

import { connect } from 'react-redux';
import { sentDetilType, storeExpandedKeys, storeSelectedkeys } from '../../components/common/store/actionCreaters'

import { Model } from '../../dataModule/testBone'
import { getAllDocumentsUrl, getAloneDocumentUrl } from '../../../src/dataModule/UrlList'

const { TreeNode, DirectoryTree } = Tree;
const model = new Model()

class FileManage extends Component {
    constructor(props) {
        super (props);
        this.state = {
            detail_type: '',
            id: '',
            documentsDatas: [],
            folderData: [{
                title: '我的文档',
                key: 1           
            }, {
                title: '其他文档',
                key: 2
                }],
            secfolderData: [{
                title: '开发文档',
                id: 11223,
                document_type: 'WORLD'
            }, {
                title: '任务计划安排表',
                id: 23454,
                document_type: 'PPT'
            },{
                title: '发明书',
                id: 1128823,
                document_type: 'PDF'
            },{
                title: '零件清单',
                id: 1124523,
                document_type: 'EXCEL'
            },],
        }
    }

     //生命周期函数
    // componentDidMount() {
    //   this.getAllDocuments()
    // }


    //获取所有文档数据
    getAllDocuments = () => {
      let me = this
      model.fetch(
          {},
          getAllDocumentsUrl,
          'get',
          function (res) {
              // console.log(333, res)
              me.setState({
                  documentsDatas: res.data
              })
          },
          function (error) {
              message.error('获取文档信息失败！')
          },
          false
      )
    }

    // 获得单个文档的详细信息
    getAloneDocument = (params) => {
      let me = this
      model.fetch(
          {id: params},
          getAloneDocumentUrl,
          'get',
          function (res) {
              // console.log(111, res.data[0])
              me.sentDocumentMes( res.data[0])
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
            aloneDocumentDatas  //单个文档详情
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
        this.props.history.push('/app/file_manage/add_file')
    }


    render() {
      const { folderData, documentsDatas } = this.state
      const { expandedKeys, selectedKeys } = this.props
      // console.log(expandedKeys, selectedKeys)
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
              <DirectoryTree multiple onSelect={this.getTypeName} onExpand={this.onExpand}
                  defaultExpandedKeys={[expandedKeys.expandedKeys]}
                  defaultSelectedKeys={[selectedKeys.selectedKeys]}>
                {folderData.map((item,index) => {
                    return (
                        <TreeNode title={item.title} key={index}>
                          {documentsDatas.length !== 0 ?  documentsDatas.map((item) => {
                            if (item.documentType === 'WORLD') {
                                return <TreeNode title={item.name} key={item.id} isLeaf icon={<Icon type="file-word" /> }/>
                            } else if (item.documentType === 'PDF') {
                                return <TreeNode title={item.name} key={item.id} isLeaf icon={<Icon type="file-pdf" /> }/>
                            } else if (item.documentType === 'EXCEL') {
                                return <TreeNode title={item.name} key={item.id} isLeaf icon={<Icon type="file-excel" /> }/>
                            } else if (item.documentType === 'PPT') {
                                return <TreeNode title={item.name} key={item.id} isLeaf icon={<Icon type="file-ppt" /> }/>
                            }
                            return null
                          }) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(FileManage);