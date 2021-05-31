import React, { Component, Fragment } from 'react';
import { Table, PageHeader } from 'antd';

const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '职位',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a>移除</a>
        </span>
      ),
    },
  ];
  
  const data = [
    {
        key: '1',
        name: 'zhang san',
        id: 'azhang3',
        position: '项目负责人',
    },
    {
        key: '2',
        name: 'li si',
        id: 'ali4',
        position: '项目经理',
    },
    {
        key: '3',
        name: 'wang wu',
        id: 'awang5',
        position: '工程师',
    },
    {
        key: '4',
        name: 'zhao liu',
        id: 'azhao6',
        position: '工程师',
    },
    {
        key: '5',
        name: 'zhou qi',
        id: 'azhou7',
        position: '财务',
    },
  ];

class ProjectTeam extends Component {

  //返回
  comeBack = () => {
    this.props.history.push('/app/program_manage')
  }
  render () {
      return (
        <Fragment>
           <PageHeader
                  onBack={() => this.props.history.push('/app/program_manage')}
                  title="返回"
                />
              <Table columns={columns} dataSource={data} />
          </Fragment>
      )
  }
}

export default ProjectTeam;