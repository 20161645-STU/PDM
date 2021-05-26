import React, { Component, Fragment } from 'react';
import './style.less';
import { Tree,Button,Icon,message} from 'antd';
import { Model } from '../../dataModule/testBone';
import { getAllPartsUrl } from '../../../src/dataModule/UrlList';
import { getUserName } from '../../../src/publicFunction';
import { connect } from 'react-redux';
import { sentDetilType } from '../../components/common/store/actionCreaters'
import { PlusOutlined, } from '@ant-design/icons';

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
//      componentDidMount() {
//       this.getAllParts()
//   }

  //获取所有零件数据
  getAllParts = () => {
      let me = this
      model.fetch(
          {},
          getAllPartsUrl,
          'get',
          function (res) {
              // console.log(res)
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

  //查看图纸详情
  getTypeName = (keys, event) => {
      // console.log('Trigger Select', keys, event);
      this.setState({
          id: keys[0]
      })
      this.sentPartMes()
  }

  //给后台发送文件类型和名字
  sentPartMes = () => {
      const { detail_type, id } = this.state
      let params = {
          detail_type,
          id
      }
      // console.log(params)
      this.props.sendTypeMes(params)
  }
  
  onExpand = () => {
      this.setState({
          detail_type: 'part'
      })
  }

  //跳转创建图纸
  createParts = () => {
      this.props.history.push('/app/part_manage/add_part')
  }
    render() {
      const { folderData, partsDatas } = this.state
        return (
            <Fragment>
                <span>
                 <div className="title">零件管理</div>
                <Button  className="button" type="primary"  onClick={this.createParts}>
                <PlusOutlined />新建零件
                </Button>
                </span>
                <DirectoryTree multiple onSelect={this.getTypeName} onExpand={this.onExpand} >
                    {folderData.map((item,index) => {
                        return (
                            <TreeNode title={item.title} key={index}>
                                {partsDatas.map((item) => {
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
                                })}
                            </TreeNode>
                        )
                    })}
                </DirectoryTree>
               
              
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return { sendTypeMes:  data =>  dispatch(sentDetilType(data))   }
}


export default connect(null, mapDispatchToProps)(PartManage);