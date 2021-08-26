/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:37:58
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-30 10:46:26
 */
// export const originalUrl = 'http://10.21.1.50:8000/';
// export const originalUrl = 'http://10.41.119.14:8088/'   //lab325
// export const originalUrl = 'http://192.168.1.105:8088/'     //lab325
// export const originalUrl = 'http://10.41.119.14:9000/'
export const originalUrl = 'http://127.0.0.1:8088/'    //本机


export const createDrawUrl = 'zss/save/'       //创建图纸
export const getAllDrawsUrl = 'zss/findAll/'       //查看所有图纸
export const getAloneDrawUrl = 'zss/findOne/'              //查看单个图纸详细信息
export const uploadDrawingUrl = 'files/upload'           //上传图纸文件
export const getDrawSonRelationUrl = '/relation/associated_File'   //获取图纸子关联数据
export const getDrawFaRelationUrl = '/relation/getParentFile'     //获取图纸父关联数据

export const createProjectUrl = 'project/save/'     //创建项目
export const getAllProjectUrl = 'project/findAll/'      //查看所有项目
export const getAloneProjectUrl = 'project/findOne'      //查看单个项目的详细信息
export const getProjectContentUrl = '/relation/associated_File'    //获取项目所有内容的id

export const createPartUrl = 'tss/save/'       //创建零件
export const getAllPartsUrl = 'tss/findAll/'       //查看所有零件
export const getAlonePartUrl = 'tss/findOne/'              //查看单个零件详细信息
export const getPartSonRelationUrl = '/relation/associated_File'   //获取图纸子关联数据

export const createDocumentUrl = 'dss/save'       //创建文档
export const getAllDocumentsUrl = 'dss/findAll'    //获得所有的文档
export const getAloneDocumentUrl = 'dss/findOne'    //查看单个文档详情
export const uploadFilesUrl = 'files/upload'              //上传文档文件
export const documentTypeUrl = 'dss/fileType'                         // 文档类型
export const getFileRelationUrl = '/relation/associated_File'    //获取文档子关联信息
export const getFileFaRelationUrl = '/relation/getParentFile'      //获取文档的父关联信息
export const getFileReallyDataUrl = 'files/getFilesById/'           //获取文档真实数据
export const uploadDownFileUrl = 'files/'                          //下载数据

export const creatFolderUrl = 'folder/save'          //创建文件夹
export const getAllFolderUrl = 'folder/findAll'             //获取所有的文件夹
export const getAloneFolderOwnUrl = '/relation/associated_File'   //获取该文件夹所拥有的所有内容的id
export const getAloneFolderUrl = 'folder/findOne'           //获取单个文件夹详细信息
