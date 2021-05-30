import React, { Component, Fragment } from 'react';
import './style.less';
import { Tree,Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { DirectoryTree } = Tree;
const myPart = [
    {
      title: '南通项目',
      key: '0-0',
      children: [
        { title: '325325325', key: '0-0-0', isLeaf: true },
        { title: '210210210', key: '0-0-1', isLeaf: true },
      ],
    }
  ];


    const onExpand = () => {
      console.log('Trigger Expand');
    };

class  MyHome extends Component {
    constructor(props) {
        super (props);
        this.state = {}
  }
  
    onClick=()=>{
        console.log("跳转")
        this.props.history.push("/app/my_home/add_folder")
    }
    
    render() {
        return (
            <Fragment>
                <span>
                 <div className="title">我的首页</div>
                <Button  className="button" type="primary"  onClick={this.onClick}>
                <PlusOutlined />新建文件夹
                </Button>
                </span>
                <DirectoryTree
                    multiple
                    defaultExpandAll
                    onExpand={onExpand}
                    treeData={myPart}
                />
              
            </Fragment>
        )
    }
}

export default MyHome;