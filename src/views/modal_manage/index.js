import React, { Component } from 'react';
import { Tree, Button, Icon } from 'antd';
import './style.less'

const { TreeNode, DirectoryTree } = Tree;

class ModalManage extends Component {
    constructor(props) {
        super (props);
        this.state = {
            detail_type: '',
            modalName: '',
            folderData: [{
                title: '我的模型',
                key: 1           
            }, {
                title: '其他模型',
                key: 2
            }],
            secondData: [
                {
                    title: '325001',
                    key: '1-1',
                    type: '我的模型'
                }, {
                    title: '325002',
                    key: '1-2',
                    type: '我的模型'
                }, {
                    title: '325003',
                    key: '1-3',
                    type: '我的模型'
                }, {
                    title: '3345001',
                    key: '2-1',
                    type: '其他模型'
                }, {
                    title: '3345002',
                    key: '2-2',
                    type: '其他模型'
                }
                
            ]
           
        }
    }

     //查看图纸详情
     getTypeName = (keys, event) => {
        // console.log('Trigger Select', keys, event);
        this.setState({
            modalName: keys[0]
        })
        this.sentDrawMes()
    }

    //给后台发送文件类型和名字
    sentDrawMes = () => {
        const { detail_type, modalName } = this.state
        let params = {
            detail_type,
            modalName
        }
        console.log(params)
        // model.fetch(params);
    }
    
    onExpand = () => {
        // console.log('Trigger Expand');
        this.setState({
            detail_type: 'modals'
        })
    }

    render() {
        const {folderData, secondData} = this.state
        return (
            <div>
                 <div style={{display:'flex',marginBottom:'20px'}}>
                    <span className="modal_title">模型管理</span>
                    <Button type="primary" icon="plus"  className="modal_create" onClick={this.createModal}>创建模型</Button>
                </div>
                <DirectoryTree multiple onSelect={this.getTypeName} onExpand={this.onExpand} >
                    {folderData.map((item,index) => {
                        return (
                            <TreeNode title={item.title} key={index}>
                                {secondData.map((secItem) => {
                                    if (secItem.type === item.title) {
                                        return (
                                            <TreeNode title={secItem.title} key={secItem.title} isLeaf icon={ <Icon type="code-sandbox" />}/>
                                        )
                                    }
                                    return null
                                })}
                            </TreeNode>
                        )
                    })}
                </DirectoryTree>
            </div>
        )
    }
}

export default ModalManage
