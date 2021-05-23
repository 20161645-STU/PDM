import React, { Component, Fragment } from 'react';
import { Tree, Button, message, Icon } from 'antd';

import { Model } from '../../dataModule/testBone'
import { getAllDrawsUrl } from '../../../src/dataModule/UrlList'

import { getUserName } from '../../../src/publicFunction'
import './style.less'
import { connect } from 'react-redux';
import { sentDetilType } from '../../components/common/store/actionCreaters'

const { TreeNode, DirectoryTree } = Tree;

const model = new Model()


class DrawingManage extends Component {
    constructor(props) {
        super (props);
        this.state = {
            detail_type: '',
            id: '',
            drawsDatas:[],     //所有的图纸信息
            folderData: [{
                title: '我的图纸',
                key: 1           
            }, {
                title: '其他图纸',
                key: 2
            }]
        }
    }

    //生命周期函数
    componentDidMount() {
        this.getAllDraws()
    }

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
        // console.log('Trigger Select', keys, event);
        this.setState({
            id: keys[0]
        })
        this.sentDrawMes()
    }

    //给后台发送文件类型和名字
    sentDrawMes = () => {
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
            detail_type: 'drawing'
        })
    }

    //跳转创建图纸
    createDraws = () => {
        this.props.history.push('/app/drawing_manage/add_drawing')
    }

    render() {
        const { folderData, drawsDatas } = this.state
        return (
            <Fragment>
                <div style={{display:'flex',marginBottom:'20px'}}>
                    <span className="draw_title">图纸管理</span>
                    <Button type="primary" icon="plus"  className="draw_create" onClick={this.createDraws}>创建图纸</Button>
                </div>
                <DirectoryTree multiple onSelect={this.getTypeName} onExpand={this.onExpand} >
                    {folderData.map((item,index) => {
                        return (
                            <TreeNode title={item.title} key={index}>
                                {drawsDatas.map((item) => {
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

export default connect(null, mapDispatchToProps)(DrawingManage)

