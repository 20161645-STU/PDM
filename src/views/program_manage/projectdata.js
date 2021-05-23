import React, { Component, Fragment } from 'react';
import { Tree, Icon } from 'antd';

const { TreeNode, DirectoryTree } = Tree;

class ProjectData extends Component {
    onSelect = (keys, event) => {
        console.log('Trigger Select', keys, event);
    }
    
    onExpand = () => {
        console.log('Trigger Expand');
    }

    //返回
    comeBack = () => {
        this.props.history.push('/app/program_manage')
    }

    render () {
        return (
            <Fragment>
                <div onClick={this.comeBack} style={{marginBottom:'20px'}}>
                    <Icon type="arrow-left" />
                    <span>返回</span>
                </div>
                <DirectoryTree multiple defaultExpandAll onSelect={this.onSelect} onExpand={this.onExpand}>
                    <TreeNode title="项目数据" key="0-0">
                    <TreeNode title="零件" key="0-0-0" isLeaf />
                    <TreeNode title="图纸" key="0-0-1" isLeaf />
                    <TreeNode title="需求分析" key="0-0-2" isLeaf />
                    <TreeNode title="任务安排" key="0-0-3" isLeaf />
                    <TreeNode title="页面规划" key="0-0-4" isLeaf />
                    </TreeNode>
                </DirectoryTree>
            </Fragment>
        )
    }
}

export default ProjectData;