import React, {Component} from "react";
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import { ProjectOutlined, BlockOutlined, HomeOutlined, FormOutlined, HistoryOutlined, FileOutlined } from '@ant-design/icons';

//import { getUserName } from '../../publicFunction';
//import history from './history';

import store from '../../store'
import { actionCreators as commonAction } from '../common/store';
import { actionCreators as viewsAction } from '../../views/store';
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

  //初始化redux
  resetRudex = () => {
    store.dispatch(commonAction.storeDssRelationInfo([]))
    store.dispatch(commonAction.storeZssRelationInfo([]))
    store.dispatch(commonAction.storeTssRelationInfo([]))
    store.dispatch(commonAction.sentDetilType({}))
    store.dispatch(viewsAction.createPartBom({}))
  }

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
          onClick={this.resetRudex()}
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
          onClick={this.resetRudex}
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
          onClick={this.resetRudex()}
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
        {/* <Menu.ItemGroup
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
        </Menu.ItemGroup> */}
        <Menu.ItemGroup
          style={{height: '40px'}}
          key="sub6"
          onClick={this.resetRudex()}
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
          key="file_manage"
          onClick={this.resetRudex()}
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
        {/* <Menu.ItemGroup
          style={{height: '40px'}}
          key="sub7"
          title={
            <span style={{color:'#fff', fontSize: '16px'}}>
               <Link to='/app/file_manage'>
               <Icon type="user" />&nbsp;
              账户管理
              </Link>
            </span>
          }
        >
        </Menu.ItemGroup> */}
        </Menu>
    );
  }
}
