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
import noMatch from './404';

import '../../style/index.less';
import MyHome from '../../views/my_home';
import ProgramManage from '../../views/program_manage';
import PartManage from '../../views/part_manage';
import DrawingManage from '../../views/drawing_manage';
import DrawingDeteil from '../../views/drawing_manage/drawing_detail';
import FileManage from '../../views/file_manage';


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
                  <Route exact path={'/app/my_home'} component={MyHome}/>
                  <Route exact path={'/app/program_manage'} component={ProgramManage}/>
                  <Route exact path={'/app/part_manage'} component={PartManage}/>
                  <Route exact path={'/app/drawing_manage'} component={DrawingManage} />
                  <Route exact path={'/app/drawing_detail'} component={DrawingDeteil} />
                  <Route exact path={'/app/file_manage'} component={FileManage}/>
                  <Route component={noMatch} />
                </Switch>
              </Content>
              <Sider width={800}  style={{ background: '#E6E6FA',border: '10px solid #00000' }}>
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
