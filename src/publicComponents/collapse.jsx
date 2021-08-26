import React, { Component } from 'react'
import { Collapse, Icon, message } from 'antd'

import { Model } from '../dataModule/testBone'
import { getAloneDrawUrl, getAloneDocumentUrl, getAlonePartUrl } from '../dataModule/UrlList'

import { connect } from 'react-redux'
import { storeDssRelationInfo, storeZssRelationInfo, storeTssRelationInfo } from '../components/common/store/actionCreaters'


import FileList from './antdList'

const { Panel } = Collapse;
const model = new Model()

class Collapses extends Component{
  constructor(props) {
    super(props)
    this.state = {
      relationData: {},
      sonRelationData: {},
      listActiveKey: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeKey !== nextProps.activeKey) {
      console.log('变了')
      this.setState({
        listActiveKey:''
      })
    }
  }

  // 请求父关联数据
  getRelationInfo = (key, params, url) => {
    const zss_datas = []
    const tss_datas = []
    if (key === 'zss') {
      let me = this
      model.fetch(
        {id: params[0].origin},
        url,
        'get',
        function (res) {
          // console.log(11, res.data)
          zss_datas.push(res.data)
          me.props.storeZssRelationInfo(zss_datas)
        },
        function (error) {
            message.error('获取数据失败！')
        },
        false
      )
    } else if (key === 'tss') {
      let me = this
      model.fetch(
        {id: params[0].origin},
        url,
        'get',
        function (res) {
          // console.log(11, res.data)
          tss_datas.push(res.data)
          me.props.storeTssRelationInfo(tss_datas)
        },
        function (error) {
            message.error('获取数据失败！')
        },
        false
      )
    }
  }

  //请求子关联数据
  getSonRelationInfo = (key, params, url) => {
    const dss_datas = []
    const zss_datas = []
    if (key === 'dss') {
      for (let i = 0; i < params.length; i++){
        let me = this
        model.fetch(
          {id: params[i].target},
          url,
          'get',
          function (res) {
            // console.log(122, res.data)
            dss_datas.push(res.data)
            me.props.storeDssRelationInfo(dss_datas)
          },
          function (error) {
              message.error('获取数据失败！')
          },
          false
        )
      } 
    } else if (key === 'zss') {
      for (let i = 0; i < params.length; i++){
        let me = this
        model.fetch(
          {id: params[i].target},
          url,
          'get',
          function (res) {
            // console.log(122, res.data)
            zss_datas.push(res.data)
            me.props.storeZssRelationInfo(zss_datas)
          },
          function (error) {
              message.error('获取数据失败！')
          },
          false
        )
      } 
    }
  }


  getRelationDatas = (key, value1, value2, value3, url) => {
    let me = this
    switch (key) {
      case 'document':
        const dss_own_dss_params = value1.filter(item => {
          return item.relationType === 'dss_own_dss'
        })
        const draw_own_dss_param = value2.filter(item => {
          return item.relationType === 'zss_own_dss'
        })
        const part_own_dss_params = value3.filter(item => {
          return item.relationType === 'part_own_dss'
        }) 
        console.log('docparams', dss_own_dss_params, draw_own_dss_param, part_own_dss_params)
        if (draw_own_dss_param.length !== 0) {
          me.getSonRelationInfo('dss', draw_own_dss_param, url )
        } else if (part_own_dss_params.length !== 0) {
          me.getSonRelationInfo('dss', part_own_dss_params, url )
        }
        else if (dss_own_dss_params.length === 0) {
          // me.props.storeFaRelationInfo({})
        }
        break
      case 'drawing':
        const draw_dss_params = value1.filter(item => {
          return item.relationType === 'zss_own_dss'
        })
        const draw_zss_params = value2.filter(item => {
          return item.relationType === 'zss_own_zss'
        })
        const part_own_zss_params = value3.filter(item => {
          return item.relationType === 'tss_own_zss'
        })
        console.log(draw_dss_params, draw_zss_params, part_own_zss_params)
        if (draw_dss_params.length !== 0) {
          me.getRelationInfo('zss', draw_dss_params, url)
        }
        else if (part_own_zss_params.length !== 0) {
          me.getRelationInfo('zss', part_own_zss_params, url)
        } else if (draw_zss_params.length === 0) {
          // console.log('没有')
        }
        break
      case 'part':
        const part_own_zss_param = value2.filter(item => {
          return item.relationType === 'part_own_zss'
        })
        const part_own_dss_param = value1.filter(item => {
          return item.relationType === 'part_own_dss'
        })
        const tss_own_tss_param = value3.filter(item => {
          return item.relationType === 'tss_own_tss'
        })
        console.log('part_dss_params', part_own_zss_param, part_own_dss_param, tss_own_tss_param)
        if (part_own_dss_param.length !== 0) {
          me.getRelationInfo('tss',part_own_dss_param, url)
        } else if (part_own_zss_param.length !== 0) {
          me.getRelationInfo('tss', part_own_zss_param, url)
        } else if (tss_own_tss_param.length === 0) {
          // console.log('没有')
        }
        break
      default:
        break
    }
  }

  //切换tabs
  callback = (key) => {
    // console.log(key)
    switch (key[0]) {
      case '1':
        this.getRelationDatas('document',
          this.props.fileRelationData,
          this.props.drawSonRelationData,
          this.props.partSonRelationData,
          getAloneDocumentUrl
        )
        this.setState({
          listActiveKey: key[0]
        })
        break
      case '2':
        this.getRelationDatas('part',
          this.props.fileRelationData,
          this.props.drawFaRelationInfo,
          this.props.partSonRelationData,
          getAlonePartUrl
        )
        this.setState({
          listActiveKey: key[0]
        })
        break
      case '3':
        this.getRelationDatas('drawing',
          this.props.fileRelationData,
          this.props.drawSonRelationData,
          this.props.partSonRelationData,
          getAloneDrawUrl
        )
        this.setState({
          listActiveKey: key[0]
        })
        break
      case '4':
        this.getRelationProject(this.props.fileRelationData)
        this.setState({
          listActiveKey: key[0]
        })
        break
      default:
        break
    }
    if (key.length === 0) {
      this.props.storeDssRelationInfo([])
      this.props.storeZssRelationInfo([])
      this.props.storeTssRelationInfo([])
      this.setState({listActiveKey:''})
    }
  }
  
  render() {
    const text = `kk`
    // console.log('dss_datas', dss_datas, zss_datas, tss_datas)
    return (
      <div>
        <Collapse
          bordered={true}
          activeKey={this.state.listActiveKey}
          defaultActiveKey={[]}
          onChange={this.callback}
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
          <Panel header="文件" key="1" >
            <FileList
              type={'document'}
            />
          </Panel>
          <Panel header="零件" key="2" >
            <FileList
               type={'part'}
            />
          </Panel>
          <Panel header="图纸" key="3" >
            <FileList
               type={'draw'}
            />
          </Panel>
          <Panel header="项目" key="4" >
            <p>{text}</p>
          </Panel>
        </Collapse>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    fileRelationData: state.get('commonReducer').get('fileRelationData').toJS(),
    drawFaRelationInfo: state.get('commonReducer').get('drawFaRelationInfo').toJS(),
    drawSonRelationData: state.get('commonReducer').get('drawSonRelationData').toJS(),
    partSonRelationData: state.get('commonReducer').get('partSonRelationData').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeDssRelationInfo: data => dispatch(storeDssRelationInfo(data)),
    storeZssRelationInfo: data => dispatch(storeZssRelationInfo(data)),
    storeTssRelationInfo: data => dispatch(storeTssRelationInfo(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collapses)
