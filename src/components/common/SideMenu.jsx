import React, {Component} from "react";
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import { ProjectOutlined, BlockOutlined, HomeOutlined, FormOutlined, HistoryOutlined, FileOutlined } from '@ant-design/icons';

//import { getUserName } from '../../publicFunction';
//import history from './history';

//const { Menu.ItemGroup } = Menu;

export default class SideMenu extends Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <Menu
        mode="inline"
        style={{ height: 'calc(100% - 3rem)', marginTop: '3rem', background: '#001529'}}
      >
        <Menu.ItemGroup
          style={{height: '100px'}}
          key="sub1"
          title={
            <span style={{color: '#fff', fontSize: '16px'}}>
              <HistoryOutlined />&nbsp;
              历史记录
            </span>
          }
        ></Menu.ItemGroup>
        <Menu.ItemGroup
          style={{height: '40px'}}
          key="sub2"
          title={
            <span style={{color: '#fff', fontSize: '16px'}}>
              <Link to='/app/my_home'>
              <HomeOutlined />&nbsp;
              我的首页
              </Link>
            </span>
          }
        ></Menu.ItemGroup>
        <Menu.ItemGroup
          style={{height: '40px'}}
          key="sub3"
          title={
            <span style={{color: '#fff', fontSize: '16px'}}>
              <Link to='/app/program_manage'>
              <ProjectOutlined/>&nbsp;
              项目管理
              </Link>
            </span>
          }
        >
        </Menu.ItemGroup>
        <Menu.ItemGroup
          style={{height: '40px'}}
          key="sub4"
          title={
            <span style={{color: '#fff', fontSize: '16px'}}>
               <Link to='/app/part_manage'>
               <BlockOutlined />&nbsp;
              零件管理
              </Link>
            </span>
          }
        >
        </Menu.ItemGroup>
        <Menu.ItemGroup
          style={{height: '40px'}}
          key="sub5"
          title={
            <span style={{color:'#fff', fontSize: '16px'}}>
               <Link to='/app/modal_manage'>
               <Icon type="code-sandbox" />&nbsp;
              模型管理
              </Link>
            </span>
          }
        >
        </Menu.ItemGroup>
        <Menu.ItemGroup
          style={{height: '40px'}}
          key="sub6"
          title={
            <span style={{color:'#fff', fontSize: '16px'}}>
               <Link to='/app/drawing_manage'>
               <FormOutlined />&nbsp;
              图纸管理
              </Link>
            </span>
          }
        >
        </Menu.ItemGroup>
        <Menu.ItemGroup
          style={{height: '40px'}}
          key="sub7"
          title={
            <span style={{color:'#fff', fontSize: '16px'}}>
               <Link to='/app/file_manage'>
               <FileOutlined />&nbsp;
              文档管理
              </Link>
            </span>
          }
        >
        </Menu.ItemGroup>
        </Menu>
    );
  }
}
