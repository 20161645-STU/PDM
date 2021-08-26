import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';
import { getCookie, setCookie } from "../../helpers/cookies";
import store from '../../store';
import { Provider } from 'react-redux';

import SideMenu from './SideMenu'
import InformationPage from './InformationPage'
import HeaderCustom from './HeaderCustom';
import Index from '../index/index';
import NotMatch from './404';

import '../../style/index.less';
import MyHome from '../../views/my_home/index';
import AddFolder from '../../views/my_home/add_folder';

import DrawingManage from '../../views/drawing_manage';
import AddDrawingProcess from '../../views/drawing_manage/addDrawProcess'

import FileManage from '../../views/file_manage';
import AddFileProcess from '../../views/file_manage/addFileProcess';

import PartManage from '../../views/part_manage';
import AddPartProcess from '../../views/part_manage/addPartProcess';

import ProgramManage from '../../views/program_manage';
import ProgramCreat from '../../views/program_manage/program_creat';
import ProjectData from '../../views/program_manage/projectdata';
import ProjectTeam from '../../views/program_manage/projectteam';




const { Content, Footer, Sider } = Layout;

class App extends Component {
  state = {
    collapsed: getCookie("mspa_SiderCollapsed") === "true",
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, function () {
      setCookie("mspa_SiderCollapsed", this.state.collapsed);
    });
  };

  componentDidMount() {
    if (getCookie("mspa_SiderCollapsed") === null) {
      setCookie("mspa_SiderCollapsed", false);
    }
  }

  render() {
    const { collapsed } = this.state;
    // const {location} = this.props;
    let name;
    if (!getCookie("mspa_user") || getCookie("mspa_user") === "undefined") {
      return <Redirect to="/login" />
    } else {
      name = JSON.parse(getCookie("mspa_user")).username;
    }

    return (
      <Layout>
        <Provider store={store}>
          <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name} />

          <Content>
            {/*<HeaderMenu />*/}
            <Layout style={{ padding: '0 0', background: '#fff' }}>
              <Sider width={200} style={{ background: '#fff' }}>
                <SideMenu />
              </Sider>
             
              {/* <Breadcrumb style={{ margin: '3.4rem 2rem 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
              </Breadcrumb> */}
              <Content style={{ padding: '0 24px', minHeight: 'calc(100vh - 111px)',  marginTop: '4rem'}}>
                <Switch>
                  <Route exact path={'/app'} render={props => <Index {...props} />} />
                  <Route exact path={'/app/my_home'} render={props => <MyHome {...props} />} />
                  <Route exact path={'/app/my_home/add_folder'} render={props => <AddFolder {...props} />} />

                  <Route exact path={'/app/part_manage'}  render={props => <PartManage {...props} />} />
                   <Route exact path={'/app/part_manage/add_part_process'} render={props => <AddPartProcess {...props} />} />

                  <Route exact path={'/app/drawing_manage'} render={props => <DrawingManage {...props} />} />
                  <Route exact path={'/app/drawing_manage/add_drawing_process'} render={props => <AddDrawingProcess {...props} />} />

                  <Route exact path={'/app/file_manage'}  render={props => <FileManage {...props} />} />
                   <Route exact path={'/app/file_manage/add_file_process'} render={props => <AddFileProcess {...props} />} />
                                
                  <Route exact path={'/app/program_manage'}  render={props => <ProgramManage {...props} />} />
                  <Route exact path={'/app/program_manage/program_creat'}render={props => <ProgramCreat {...props} />} />
                  <Route exact path={'/app/program_manage/projectdata'} render={props => <ProjectData {...props} />} />
                  <Route exact path={'/app/program_manage/projectteam'} render={props => <ProjectTeam {...props} />} />
                  <Route exact path={ '/notFound' } render ={ props => <NotMatch {...props}/>} />
                </Switch>
              </Content>
              <Sider  style={{padding: '0 24px', minHeight: 'calc(100vh - 111px)',  marginTop: '3rem', borderLeft:'1px solid 	#DCDCDC'}} width={'50%'} theme={'light'}>
                <InformationPage />
              </Sider>
            </Layout>
          </Content>

          <Footer style={{ textAlign: 'center', backgroundColor: "#778899", color: "white" }}>
            <span style={{ display: "block" }}>公司地址：上海市杨浦区军工路516号上海理工大学</span>
            <span style={{ display: "block" }}>联系电话：12345</span>
            <span style={{ display: "block" }}>邮箱：12345@qq.com</span>
          </Footer>
        </Provider>
      </Layout>
    )
  }
}

export default withRouter(App);
