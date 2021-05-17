import React, { Component, Fragment } from 'react';
import { PageHeader } from 'antd';
import './style.less'
import { Tree,Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { DirectoryTree } = Tree;
const myPart = [
    {
      title: '我的零件',
      key: '0-0',
      children: [
        { title: '325325325', key: '0-0-0', isLeaf: true },
        { title: '210210210', key: '0-0-1', isLeaf: true },
      ],
    }
  ];
  
  const otherPart = [
    {
      title: '其他零件',
      key: '0-0',
      children: [
        { title: '321321321', key: '0-0-0', isLeaf: true },
        { title: '322321321', key: '0-0-0', isLeaf: true },
        { title: '323321321', key: '0-0-0', isLeaf: true },
        { title: '324321321', key: '0-0-0', isLeaf: true }
      ],
    }
  ];
    const onExpand = () => {
      console.log('Trigger Expand');
    };
class PartManage extends Component {
    constructor(props) {
        super (props);
        this.state = {}
    }
    onClick=()=>{
        console.log("跳转")
    }
    render() {
        return (
            <Fragment>
                <span>
                 <div className="title">零件管理</div>
                <Button  className="button" type="primary" icon={<PlusOutlined />} onClick={this.onClick}>
                    新建零件
                </Button>
                </span>
                <DirectoryTree
                    multiple
                    defaultExpandAll
                    onExpand={onExpand}
                    treeData={myPart}
                />
                <DirectoryTree
                    multiple
                    defaultExpandAll
                    onExpand={onExpand}
                    treeData={otherPart}
                />
               
              
            </Fragment>
        )
    }
}

export default PartManage;