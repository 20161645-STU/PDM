import React, {Component} from "react";
import { Tabs } from 'antd';
// import {InformationDetail} from ''
//import { getUserName } from '../../publicFunction';
//import history from './history';

//const { Menu.ItemGroup } = Menu;
const { TabPane } = Tabs;

export default class InformationPage extends Component {
  state = {};
  render() {
    return (
    <div className="informationpage"  style={{marginTop: '3rem' }}>
    <Tabs type="card"  mode="inline"
        style={{ height: 'calc(100% - 3rem)', marginTop: '2rem', background: '#F5F5F5'}}>
          <TabPane tab="详情页" key='1'>
       {/* <InformationDetail></InformationDetail> */}

      </TabPane>
    </Tabs>
  </div>
    );
  }
}
