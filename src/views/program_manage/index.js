import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './style.less'
import { Button,Tree, Icon, message } from 'antd';
import histroy from '../../components/common/history';
import { sentDetilType } from '../../components/common/store/actionCreaters'

import { Model } from '../../dataModule/testBone'
import { getAllProjectUrl } from '../../../src/dataModule/UrlList'

const model = new Model()
const { TreeNode, DirectoryTree } = Tree;

class  ProgramManage extends Component {
    constructor(props) {
        super (props);
        this.state = {
            folderData: [{
                title: '我的项目',
                key: 1           
            }, {
                title: '其他项目',
                key: 2
            }],
            projectsData: [],
            detail_type: '',           //详情类型
            id: ''
        }
    }

    //生命周期函数
    componentDidMount() {
        this.getAllProjects()
    }

    //获取所有项目数据
    getAllProjects = () => {
        let me = this
        model.fetch(
            {},
            getAllProjectUrl,
            'get',
            function (res) {
                // console.log(res)
                me.setState({
                    projectsData: res.data
                })
            },
            function (error) {
                message.error('获取项目信息失败！')
            },
            false
        )
    }

    //创建项目
    createDraws = () => {
        this.props.history.push('/app/program_manage/program_creat')
    }

    //跳转相应的页面
    getTypeName = (keys) => {
        // console.log('Trigger Select', keys);
        console.log(keys)
        if (keys[0] === 'program data') {
            histroy.push('/app/program_manage/projectdata')
        } else if (keys[0] === 'program team') {
            histroy.push('/app/program_manage/projectteam')
        } else {
            this.setState({
                id: keys[0]
            })
        }
        this.sentDrawMes()
    }

    //给后台发送文件类型和名字
    sentDrawMes = () => {
        const { detail_type, id } = this.state
        let params = {
            detail_type,
            id
        }
        // console.log(params)
        this.props.sendTypeMes(params)
    }
    
    //获得详情类型
    onExpand = () => {
        // console.log('Trigger Expand');
        this.setState({
            detail_type: 'program'
        })
    }

    
    render() {
        const { folderData, projectsData } = this.state
        return (
            <Fragment>
                <div style={{display:'flex',marginBottom:'20px'}}>
                    <span className="project_title">项目管理</span>
                    <Button type="primary" icon="plus"  className="project_create" onClick={this.createDraws}>创建项目</Button>
                </div>
                <DirectoryTree multiple onSelect={this.getTypeName} onExpand={this.onExpand} >
                    {folderData.map((item,index) => {
                        return (
                            <TreeNode title={item.title} key={index}>
                                {projectsData !== null ? projectsData.map((item) => {
                                    if (true) {
                                        return (
                                            <TreeNode title={item.name} key={item.id} >
                                                <TreeNode title={'program data'} key={'program data'} isLeaf icon={<Icon type="file-pdf" />} />
                                                <TreeNode title={'program team'} key={'program team'} isLeaf icon={ <Icon type="team" />}/>
                                            </TreeNode>
                                        )
                                    }
                                    return null
                                }) : null}
                            </TreeNode>
                        )
                    })}
                </DirectoryTree>
            </Fragment>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return { sendTypeMes:  data =>  dispatch(sentDetilType(data))   }
}

export default  connect(null, mapDispatchToProps)(ProgramManage);