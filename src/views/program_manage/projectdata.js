import React, { Component, Fragment } from 'react';
import { Tree, PageHeader } from 'antd';

const { TreeNode, DirectoryTree } = Tree;

class ProjectData extends Component {
    onSelect = (keys, event) => {
        console.log('Trigger Select', keys, event);
    }
    
    onExpand = () => {
        console.log('Trigger Expand');
    }

    render () {
        return (
            <Fragment>
                <PageHeader
                  onBack={() => this.props.history.push('/app/program_manage')}
                  title="返回"
                />
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