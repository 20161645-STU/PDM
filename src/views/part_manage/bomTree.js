import React, { Component } from 'react'
import { Tree } from 'antd'

import { connect } from 'react-redux'

import Folder from '../../publicComponents/IconFonts'

const { TreeNode, DirectoryTree } = Tree

class PartBomTree extends Component{

  onSelect = (keys, event) => {
    // console.log('Trigger Select', keys, event);
  }

  onExpand = () => {
    // console.log('Trigger Expand');
  }

  render() {
    const parentPart = this.props.detil_mes.alonePartDatas
    const partsInfo = this.props.partsInfo
    // console.log('partsInfo', parentPart)
    return (
      <div>
        <DirectoryTree
          className="treeName"
          multiple
          defaultExpandAll
          onSelect={this.onSelect} onExpand={this.onExpand}
          icon={<Folder type="icon-zhuangpeiti" style={{ fontSize: '20px', paddingRight: '4px' }} />}
        >
          <TreeNode title={parentPart.partNo + '-' + parentPart.name + '/' + parentPart.version} key={parentPart.id}
          >
            {partsInfo.length !== 0 ? partsInfo.map(params => {
                if (params.tss_type === 'EI') {
                  return (
                    <TreeNode title={params.part_no + '-' + params.name + '/' + params.version + '—' + params.count}
                      key={params.id} isLeaf
                      icon={<Folder type="icon-zhuangpeiti" style={{ fontSize: '20px', paddingRight: '4px' }} />}
                    />
                  )  
                } else {
                  return (
                    <TreeNode title={params.part_no + '-' + params.name + '/' + params.version + '—' + params.count}
                      key={params.id} isLeaf
                      icon={<Folder type="icon-icon-" style={{ fontSize: '20px', paddingRight: '4px' }} />}
                    />
                  )
                }
            }) : null}
          </TreeNode>
        </DirectoryTree>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    detil_mes: state.get('commonReducer').get('detil_mes').toJS(),
    addRelationParts: state.get('viewsReducer').get('addRelationParts').toJS(),
  }
}

export default connect(mapStateToProps, null)(PartBomTree)