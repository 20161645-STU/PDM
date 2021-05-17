import React, { Component, Fragment } from 'react';
import { Tree, Button } from 'antd';

const { TreeNode, DirectoryTree } = Tree;


class DrawingManage extends Component {
    constructor(props) {
        super (props);
        this.state = {
            folderData: [{
                title: '机械臂',
                key: 1,
                products: [
                    {
                        title: 'BOM表',
                        key: '1-1'
                    }, {
                        title: '说明文档',
                        key: '1-2'
                    }, {
                        title: '二维零件图',
                        key: '1-3'
                    }
                ]
            }, {
                title: '抓取机构',
                key: 2,
                products: [
                    {
                        title: 'BOM表',
                        key: '2-1'
                    }, {
                        title: '说明文档',
                        key: '2-2'
                    }
                ]
            }]
        }
    }

    onSelect = (keys, event) => {
        console.log('Trigger Select', keys, event);
    }
    
    onExpand = () => {
        console.log('Trigger Expand');
    }

    //创建图纸
    createDraws = () => {
        this.props.history.push('/app/drawing_detail')
    }

    render() {
        return (
            <Fragment>
                <div style={{display: 'flex'}}>
                    <h1>图纸管理</h1>
                    <Button type="primary" icon="plus" style={{marginLeft:'300px'}} onClick={this.createDraws}>创建图纸</Button>
                </div>
                <DirectoryTree multiple defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
                    {this.state.folderData.map((item,index) => {
                        return (
                            <TreeNode title={item.title} key={index}>
                                {item.products.map((item) => {
                                    return (
                                        <TreeNode title={ item.title} key={ item.key} isLeaf />     
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

export default  DrawingManage;