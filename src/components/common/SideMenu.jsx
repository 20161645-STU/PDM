import React, {Component} from "react";
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { ProjectOutlined, BlockOutlined, HomeOutlined,FormOutlined,HistoryOutlined,FileOutlined } from '@ant-design/icons';
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
          key="HistoryOutlined"
          title={
            <span style={{color: '#fff', fontSize: '16px'}}>
              <HistoryOutlined />&nbsp;
              历史记录
            </span>
          }
        ></Menu.ItemGroup>
        <Menu.ItemGroup
          style={{height: '40px'}}
          key="HomeOutlined"
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
          key="ProjectOutlined"
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
          key="BlockOutlined"
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
          key="FormOutlined"
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
          key="FileOutlined"
          title={
            <span style={{color:'#fff', fontSize: '16px'}}>
               <Link to='/app/file_manage'>
               <FileOutlined />&nbsp;
              文件管理
              </Link>
            </span>
          }
        >
        </Menu.ItemGroup>
      </Menu>
    );
  }
}
