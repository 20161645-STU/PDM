import React, { Component, Fragment } from 'react'
import { Button, message } from 'antd';
import './style.less'

import { Model } from '../../dataModule/testBone'
import { getPartRelationUrl } from '../../../src/dataModule/UrlList'

import { connect } from 'react-redux';

import BomTable from '../../publicComponents/antdTable'
import AddPartBom from './addPartBomModel'
import EditPartBom from './editPartBomModal'
import BomTree from './bomTree'

const model = new Model()

class CreatePartBom extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible: false,
      partBomInfo: [],
      edit_visible: false
    }
  }

  componentDidMount() {
    this.getPartBom()
  }

  //获取该零件的bom
  getPartBom = () => {
    let me = this
    model.fetch(
      {parent_id: this.props.partBomInfo.partId },
      getPartRelationUrl,
      'get',
      function (res) {
        // console.log(113331, res.data)
        me.setState({
          partBomInfo: res.data
        })
      },
      function (error) {
        message.error('获取零件BOM信息失败！')
      },
      false
    )
  }

  //打开增加弹窗
  openPartBomModal = (e, key) => {
    if (key === 'add') {
      this.setState({
        visible: true
      })
    } else if (key === 'edit') {
      this.setState({
        edit_visible: true
      })
    }
  }

  //关闭弹窗
  closeModal = () => {
    this.setState({
      visible: false,
      edit_visible: false
    })
  }

  //处理表格数据
  handlePartDatas = (params) => {
    const tableData=  []
    if (params.length !== 0) {
      const tableData = params.map((item) =>({
        key: item.id,
        partNo: item.part_no,
        name: item.name,
        tssType: this.handleChange('type', item.tss_type),
        version: item.version,
        substance: item.substance,
        createDate: item.create_date.substring(0, 10),
        frozen: this.handleChange('', item.is_frozen),
        count: item.count
        // status: this.statusSWift(item.status),
      }))
      return tableData;
    }
    return tableData
  }

  //数据转换
  handleChange = (key, type) => {
    if (key === '' && type === false) {
      return '否'
    } else if (key === '' && type === true) {
      return '是'
    } else if (key === 'type' && type === 'EI') {
      return '一级件'
    } else if (key === 'type' && type === 'normal') {
      return '普通零件'
    }
  }

  render() {

    const columns = [
      {
        title: '零件编号',
        dataIndex: 'partNo',
        align: 'center',
      },
      {
        title: '零件名称',
        dataIndex: 'name',
        align: 'center',
      },
      {
        title: '零件版本',
        dataIndex: 'version',
        align: 'center',
      },
      {
        title: '零件数量',
        dataIndex: 'count',
        align: 'center',
      },
      {
        title: '零件类型',
        dataIndex: 'tssType',
        align: 'center',
      },
      {
        title: '创建时间',
        dataIndex: 'createDate',
        align: 'center',
      },
      {
        title: '是否冻结',
        dataIndex: 'frozen',
        align: 'center',
      },
      {
        title: '材料',
        dataIndex: 'substance',
        align: 'center',
      },
      // {
      //   title: '重量',
      //   dataIndex: 'weight',
      //   align: 'center',
      // }
    ]
    const queryParams = { pageSize: 20 }
    const partTableData = this.handlePartDatas(this.state.partBomInfo)
    // console.log(22, this.state.partBomInfo)
    return (
      <Fragment>
        <div className='part_bom_title'>产品结构</div>
        <div className="part_bom_button">
          <div>
            <Button type="primary" icon="build" size='small' onClick={e => this.openPartBomModal(e, 'add')}>增加</Button>
            <Button type="danger" icon="edit" size='small' style={{ marginLeft: '20px' }}
              onClick={e => this.openPartBomModal(e, 'edit')}>编辑</Button>
          </div>
          <div style={{marginLeft:'320px'}}>
            <Button  type="primary" icon="arrow-down" size='small'>导出报表</Button>
          </div>
        </div>
        <div>
          <BomTable
            columns={columns}
            queryParams={queryParams}
            data={partTableData}
            currentPage={1}
            pageChange={1}
          />
        </div>
        <div style={{ margin: '30px' }}>
          <BomTree
            partsInfo={this.state.partBomInfo}
          />
        </div>
        <AddPartBom
          visible={this.state.visible}
          cancle={this.closeModal}
          getPartBom={this.getPartBom}
          partsInfo={this.state.partBomInfo}
        />
        <EditPartBom
          visible={this.state.edit_visible}
          cancle={this.closeModal}
          partsInfo={this.state.partBomInfo}
          getPartBom={this.getPartBom}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    partBomInfo: state.get('viewsReducer').get('partBomInfo').toJS(),
  }
}

export default connect(mapStateToProps, null)(CreatePartBom)