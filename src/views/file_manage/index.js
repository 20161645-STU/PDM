import React, { Component, Fragment } from 'react';
import { Tree, Button } from 'antd';
import './style.less'

const { TreeNode, DirectoryTree } = Tree;


class FileManage extends Component {
    constructor(props) {
        super (props);
        this.state = {
            folderData: [{
                title: '我的文件',
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
                title: '其他文件',
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

    createDraws = () => {
        this.props.history.push('/app/file_manage/add_file')
    }

    render() {
        return (
            <Fragment>
                <span >
                <div className="title">文件管理</div>
                    <Button type="primary" icon="plus"  className="button" onClick={this.createDraws}>创建文件</Button>
                </span>
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

export default FileManage;