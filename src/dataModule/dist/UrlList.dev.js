"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeRelationUrl = exports.makeRelationUrl = exports.deleteBomRelationUrl = exports.getPartRelationUrl = exports.addRelationUrl = exports.deleteRelationUrl = exports.getAloneFolderUrl = exports.getAloneFolderOwnUrl = exports.getAllFolderUrl = exports.creatFolderUrl = exports.editFileUrl = exports.uploadDownFileUrl = exports.getFileReallyDataUrl = exports.getFileFaRelationUrl = exports.getFileRelationUrl = exports.documentTypeUrl = exports.uploadFilesUrl = exports.selectDocumentByNoUrl = exports.getAloneDocumentUrl = exports.getAllDocumentsUrl = exports.createDocumentUrl = exports.selectPartUrl = exports.editPartUrl = exports.getPartFaRelationUrl = exports.getPartSonRelationUrl = exports.getAlonePartUrl = exports.getAllPartsUrl = exports.createPartUrl = exports.getProjectContentUrl = exports.getAloneProjectUrl = exports.getAllProjectUrl = exports.createProjectUrl = exports.selectDrawByNoUrl = exports.editDrawUrl = exports.getDrawFaRelationUrl = exports.getDrawSonRelationUrl = exports.uploadDrawingUrl = exports.getAloneDrawUrl = exports.getAllDrawsUrl = exports.createDrawUrl = exports.originalUrl = void 0;

/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:37:58
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-30 10:46:26
 */
// export const originalUrl = 'http://111.229.128.170:8088/';
// export const originalUrl = 'http://10.41.119.14:8088/'   //lab325
// export const originalUrl = 'http://192.168.1.108:8088/'     //lab325
// export const originalUrl = 'http://10.41.203.74:8088/'
var originalUrl = 'http://127.0.0.1:9000/'; //本机

exports.originalUrl = originalUrl;
var createDrawUrl = 'zss/save/'; //创建图纸

exports.createDrawUrl = createDrawUrl;
var getAllDrawsUrl = 'zss/findAll/'; //查看所有图纸

exports.getAllDrawsUrl = getAllDrawsUrl;
var getAloneDrawUrl = 'zss/findOne/'; //查看单个图纸详细信息

exports.getAloneDrawUrl = getAloneDrawUrl;
var uploadDrawingUrl = 'files/upload'; //上传图纸文件

exports.uploadDrawingUrl = uploadDrawingUrl;
var getDrawSonRelationUrl = '/relation/associated_File'; //获取图纸子关联数据

exports.getDrawSonRelationUrl = getDrawSonRelationUrl;
var getDrawFaRelationUrl = '/relation/getParentFile'; //获取图纸父关联数据

exports.getDrawFaRelationUrl = getDrawFaRelationUrl;
var editDrawUrl = '/zss/update'; //编辑图纸基本信息

exports.editDrawUrl = editDrawUrl;
var selectDrawByNoUrl = 'zss/selectByNo/'; //根据图纸编号搜图纸

exports.selectDrawByNoUrl = selectDrawByNoUrl;
var createProjectUrl = 'project/save/'; //创建项目

exports.createProjectUrl = createProjectUrl;
var getAllProjectUrl = 'project/findAll/'; //查看所有项目

exports.getAllProjectUrl = getAllProjectUrl;
var getAloneProjectUrl = 'project/findOne/'; //查看单个项目的详细信息

exports.getAloneProjectUrl = getAloneProjectUrl;
var getProjectContentUrl = '/relation/associated_File'; //获取项目所有内容的id

exports.getProjectContentUrl = getProjectContentUrl;
var createPartUrl = 'tss/save/'; //创建零件

exports.createPartUrl = createPartUrl;
var getAllPartsUrl = 'tss/findAll/'; //查看所有零件

exports.getAllPartsUrl = getAllPartsUrl;
var getAlonePartUrl = 'tss/findOne/'; //查看单个零件详细信息

exports.getAlonePartUrl = getAlonePartUrl;
var getPartSonRelationUrl = '/relation/associated_File'; //获取零件子关联数据

exports.getPartSonRelationUrl = getPartSonRelationUrl;
var getPartFaRelationUrl = '/relation/getParentFile'; //获取零件父关联数据

exports.getPartFaRelationUrl = getPartFaRelationUrl;
var editPartUrl = '/tss/update'; //编辑零件基本信息

exports.editPartUrl = editPartUrl;
var selectPartUrl = 'tss/selectPartToBuildBom'; //创建bom表选择零件

exports.selectPartUrl = selectPartUrl;
var createDocumentUrl = 'dss/save'; //创建文档

exports.createDocumentUrl = createDocumentUrl;
var getAllDocumentsUrl = 'dss/findAll'; //获得所有的文档

exports.getAllDocumentsUrl = getAllDocumentsUrl;
var getAloneDocumentUrl = 'dss/findOne'; //查看单个文档详情

exports.getAloneDocumentUrl = getAloneDocumentUrl;
var selectDocumentByNoUrl = 'dss/selectByNo'; //根据文档的编号搜文档

exports.selectDocumentByNoUrl = selectDocumentByNoUrl;
var uploadFilesUrl = 'files/upload'; //上传文档文件

exports.uploadFilesUrl = uploadFilesUrl;
var documentTypeUrl = 'dss/fileType'; // 文档类型

exports.documentTypeUrl = documentTypeUrl;
var getFileRelationUrl = '/relation/associated_File'; //获取文档子关联信息

exports.getFileRelationUrl = getFileRelationUrl;
var getFileFaRelationUrl = '/relation/getParentFile'; //获取文档的父关联信息

exports.getFileFaRelationUrl = getFileFaRelationUrl;
var getFileReallyDataUrl = 'files/getFilesById/'; //获取文档真实数据

exports.getFileReallyDataUrl = getFileReallyDataUrl;
var uploadDownFileUrl = 'files/'; //下载数据

exports.uploadDownFileUrl = uploadDownFileUrl;
var editFileUrl = '/dss/update'; //编辑文档基本信息

exports.editFileUrl = editFileUrl;
var creatFolderUrl = 'folder/save'; //创建文件夹

exports.creatFolderUrl = creatFolderUrl;
var getAllFolderUrl = 'folder/findAll'; //获取所有的文件夹

exports.getAllFolderUrl = getAllFolderUrl;
var getAloneFolderOwnUrl = '/relation/associated_File'; //获取该文件夹所拥有的所有内容的id

exports.getAloneFolderOwnUrl = getAloneFolderOwnUrl;
var getAloneFolderUrl = 'folder/findOne'; //获取单个文件夹详细信息

exports.getAloneFolderUrl = getAloneFolderUrl;
var deleteRelationUrl = '/relation/deleteMember'; //解除关联关系

exports.deleteRelationUrl = deleteRelationUrl;
var addRelationUrl = 'bomRelation/save'; //添加父件和子件的关系

exports.addRelationUrl = addRelationUrl;
var getPartRelationUrl = 'bomRelation/associated_Part'; //查询零件bom关系

exports.getPartRelationUrl = getPartRelationUrl;
var deleteBomRelationUrl = 'bomRelation/deletePart'; //删除零件bom关系

exports.deleteBomRelationUrl = deleteBomRelationUrl;
var makeRelationUrl = 'relation/makeRelation'; //在relation表中建立关系

exports.makeRelationUrl = makeRelationUrl;
var removeRelationUrl = 'relation/deleteMember'; // 在relation表中移除关系

exports.removeRelationUrl = removeRelationUrl;