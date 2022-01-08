import React, { Component } from 'react'
import { Collapse, Icon, message } from 'antd'

import { Model } from '../dataModule/testBone'
import { getAloneDrawUrl, getAloneDocumentUrl, getAlonePartUrl, getAloneProjectUrl, deleteRelationUrl } from '../dataModule/UrlList'

import { connect } from 'react-redux'
import { storeDssRelationInfo, storeZssRelationInfo, storeTssRelationInfo, storeProjectRelationInfo } from '../components/common/store/actionCreaters'

import store from '../store'
import { actionCreators as commonAction } from '../components/common/store';

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
      activeKeyArr: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.activeKey !== nextProps.activeKey) {
      console.log('变了')
      this.setState({
        listActiveKey:'',
        activeKeyArr: []
      })
    }
  }

  // 请求父关联数据
  getRelationInfo = (key, params, url) => {
    const zss_datas = []
    const tss_datas = []
    const project_datas = []
    if (key === 'zss') {
      let me = this
      model.fetch(
        {id: params[0].origin},
        url,
        'get',
        function (res) {
          console.log(11, res.data)
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
    } else if (key === 'project') {
      let me = this
      model.fetch(
        {id: params[0].origin},
        url,
        'get',
        function (res) {
          // console.log(11, res.data)
          project_datas.push(res.data)
          me.props.storeProjectRelationInfo(project_datas)
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
        // console.log('docparams', dss_own_dss_params, draw_own_dss_param, part_own_dss_params)
        if (draw_own_dss_param.length !== 0) {
          me.getSonRelationInfo('dss', draw_own_dss_param, url)
        } else if (part_own_dss_params.length !== 0) {
          me.getSonRelationInfo('dss', part_own_dss_params, url)
        }
        else if (dss_own_dss_params.length === 0 || draw_own_dss_param.length === 0 || part_own_dss_params.length === 0) {
          // me.props.storeFaRelationInfo({})
          me.props.storeDssRelationInfo([])
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
        // console.log(draw_dss_params, draw_zss_params, part_own_zss_params)
        if (draw_dss_params.length !== 0) {
          me.getRelationInfo('zss', draw_dss_params, url)
        }
        else if (part_own_zss_params.length !== 0) {
          me.getRelationInfo('zss', part_own_zss_params, url)
        } else if (draw_dss_params.length === 0 || part_own_zss_params.length === 0 || draw_zss_params.length === 0) {
          // console.log(draw_zss_params)
          me.props.storeZssRelationInfo([])
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
        // console.log('part_dss_params', part_own_zss_param, part_own_dss_param, tss_own_tss_param)
        if (part_own_dss_param.length !== 0) {
          me.getRelationInfo('tss', part_own_dss_param, url)
        } else if (part_own_zss_param.length !== 0) {
          me.getRelationInfo('tss', part_own_zss_param, url)
        } else if (tss_own_tss_param.length === 0 || part_own_dss_param.length === 0 || part_own_zss_param.length === 0) {
          // console.log('没有')
          me.props.storeTssRelationInfo([])
        }
        break
      case 'project':
        const project_own_dss_params = value1.filter(item => {
          return item.relationType === 'project_own_dss'
        })
        const project_own_zss_params = value2.filter(item => {
          return item.relationType === 'project_own_zss'
        })
        const project_own_tss_params = value3.filter(item => {
          return item.relationType === 'project_own_tss'
        })
        // console.log(11, project_own_dss_params, project_own_zss_params, project_own_tss_params)
        if (project_own_dss_params.length !== 0) {
          me.getRelationInfo('project', project_own_dss_params, url)
        } else if (project_own_zss_params.length !== 0) {
          me.getRelationInfo('project', project_own_zss_params, url)
        } else if (project_own_tss_params.length !== 0) {
          me.getRelationInfo('project', project_own_tss_params, url)
        } else if (project_own_dss_params.length === 0 || project_own_zss_params.length === 0 || project_own_tss_params.length === 0) {
          me.props.storeProjectRelationInfo([])
        }
        break
      default:
        break
    }
  }

  //切换tabs
  callback = (key) => {
    // console.log('key', key)
    switch (key[0]) {
      case '1':
        this.getRelationDatas('document',
          this.props.fileRelationData,
          this.props.drawSonRelationData,
          this.props.partSonRelationData,
          getAloneDocumentUrl
        )
        this.setState({
          listActiveKey: key[0],
          activeKeyArr: key
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
          listActiveKey: key[0],
          activeKeyArr: key
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
          listActiveKey: key[0],
          activeKeyArr: key
        })
        break
      case '4':
        this.getRelationDatas('project',
          this.props.fileRelationData,
          this.props.drawFaRelationInfo,
          this.props.partFaRelationData,
          getAloneProjectUrl
        )
        this.setState({
          listActiveKey: key[0],
          activeKeyArr: key
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
  
  //解除关联关系
  deleteRelations = (value1, value2, key1, key2) => {
    let me = this
    model.fetch(
      {origin: value1, target: value2},
      deleteRelationUrl,
      'post',
      function (res) {
        // console.log(111, res.data)
        if (res.data === '删除成功' && key1 === 'file' && key2 === 'file') {
          store.dispatch(commonAction.getFileFaRelations(value2))
          me.setState({
            listActiveKey: ''
          })
          message.success("关系解除成功")
        } else if (res.data === '删除成功' && key1 === 'draw' &&  key2 === 'document' ) {
          store.dispatch(commonAction.getDrawSonRelations(value1))
          me.setState({
            listActiveKey: ''
          })
          message.success("关系解除成功")
        } else if (res.data === '删除成功' && key1 === 'draw' &&  key2 === 'part_project') {
          store.dispatch(commonAction.getDrawFaRelations(value2))
          me.setState({
            listActiveKey: ''
          })
          message.success("关系解除成功")
        }
        else if (res.data === '删除成功' && key1 === 'part' &&  key2 === 'project') {
          store.dispatch(commonAction.getPartFaRelations(value2))
          me.setState({
            listActiveKey: ''
          })
          message.success("关系解除成功")
        }
      },
      function (error) {
        message.error('解除关系失败！')
      },
      false
    )
  }

  render() {
    const {  listActiveKey } = this.state
    // console.log('activeKeyArr', activeKeyArr)
    return (
      <div>
        <Collapse
          bordered={true}
          activeKey={listActiveKey}
          defaultActiveKey={[]}
          onChange={this.callback}
          expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}
        >
          <Panel header="文件" key="1" >
            <FileList
              type={'document'}
              deleteRelation={this.deleteRelations}
            />
          </Panel>
          <Panel header="零件" key="2" >
            <FileList
              type={'part'}
              deleteRelation={this.deleteRelations}
            />
          </Panel>
          <Panel header="图纸" key="3" >
            <FileList
              type={'draw'}
              deleteRelation={this.deleteRelations}
            />
          </Panel>
          <Panel header="项目" key="4" >
            <FileList
              type={'project'}
              deleteRelation={this.deleteRelations}
            />
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
    partFaRelationData: state.get('commonReducer').get('partFaRelationData').toJS(),
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeDssRelationInfo: data => dispatch(storeDssRelationInfo(data)),
    storeZssRelationInfo: data => dispatch(storeZssRelationInfo(data)),
    storeTssRelationInfo: data => dispatch(storeTssRelationInfo(data)),
    storeProjectRelationInfo: data => dispatch(storeProjectRelationInfo(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Collapses)
