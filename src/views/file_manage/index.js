import React, { Component, Fragment } from 'react';
import { Tree, Button } from 'antd';
import './style.less'

import { connect } from 'react-redux';
import { sentDetilType } from '../../components/common/store/actionCreaters'

const { TreeNode, DirectoryTree } = Tree;


class FileManage extends Component {
    constructor(props) {
        super (props);
        this.state = {
            detail_type: '',
            id:'',
            folderData: [{
                title: '我的文档',
                key: 1           
            }, {
                title: '其他文档',
                key: 2
                }],
            secfolderData: [{
                title: '开发文档',
                id: 11223          
            }, {
                title: '任务计划安排表',
                id:23454
            }],
        }
    }

    //查看文档详情
    getTypeName = (keys, event) => {
        // console.log('Trigger Select', keys, event);
        this.setState({
            id: keys[0]
        })
        this.sentFileMes()
    }

    //给rendux发送文件类型和名字
    sentFileMes = () => {
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
            detail_type: 'file'
        })
    }

    createFiles = () => {
        this.props.history.push('/app/file_manage/add_file')
    }

    render() {
        const { folderData, secfolderData} = this.state
        return (
            <Fragment>
                <div className="file_div">
                    <span className="file_title">文档管理</span>
                    <Button type="primary" icon="plus"  className="file_create" onClick={this.createFiles}>创建文档</Button>
                </div>
                <DirectoryTree multiple  onSelect={this.getTypeName} onExpand={this.onExpand}>
                    {folderData.map((item,index) => {
                        return (
                            <TreeNode title={item.title} key={index}>
                                {secfolderData.map((item) => {
                                    return (
                                        <TreeNode title={ item.title} key={ item.id} isLeaf />     
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

const mapDispatchToProps = (dispatch) => {
    return { sendTypeMes:  data =>  dispatch(sentDetilType(data))   }
}

export default connect(null, mapDispatchToProps)(FileManage);