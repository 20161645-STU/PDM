"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAloneFolderUrl = exports.getAloneFolderOwnUrl = exports.getAllFolderUrl = exports.creatFolderUrl = exports.uploadDownFileUrl = exports.getFileReallyDataUrl = exports.getFileFaRelationUrl = exports.getFileRelationUrl = exports.documentTypeUrl = exports.uploadFilesUrl = exports.getAloneDocumentUrl = exports.getAllDocumentsUrl = exports.createDocumentUrl = exports.getPartSonRelationUrl = exports.getAlonePartUrl = exports.getAllPartsUrl = exports.createPartUrl = exports.getProjectContentUrl = exports.getAloneProjectUrl = exports.getAllProjectUrl = exports.createProjectUrl = exports.getDrawFaRelationUrl = exports.getDrawSonRelationUrl = exports.uploadDrawingUrl = exports.getAloneDrawUrl = exports.getAllDrawsUrl = exports.createDrawUrl = exports.originalUrl = void 0;

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
var originalUrl = 'http://127.0.0.1:8088/'; //本机

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
var createProjectUrl = 'project/save/'; //创建项目

exports.createProjectUrl = createProjectUrl;
var getAllProjectUrl = 'project/findAll/'; //查看所有项目

exports.getAllProjectUrl = getAllProjectUrl;
var getAloneProjectUrl = 'project/findOne'; //查看单个项目的详细信息

exports.getAloneProjectUrl = getAloneProjectUrl;
var getProjectContentUrl = '/relation/associated_File'; //获取项目所有内容的id

exports.getProjectContentUrl = getProjectContentUrl;
var createPartUrl = 'tss/save/'; //创建零件

exports.createPartUrl = createPartUrl;
var getAllPartsUrl = 'tss/findAll/'; //查看所有零件

exports.getAllPartsUrl = getAllPartsUrl;
var getAlonePartUrl = 'tss/findOne/'; //查看单个零件详细信息

exports.getAlonePartUrl = getAlonePartUrl;
var getPartSonRelationUrl = '/relation/associated_File'; //获取图纸子关联数据

exports.getPartSonRelationUrl = getPartSonRelationUrl;
var createDocumentUrl = 'dss/save'; //创建文档

exports.createDocumentUrl = createDocumentUrl;
var getAllDocumentsUrl = 'dss/findAll'; //获得所有的文档

exports.getAllDocumentsUrl = getAllDocumentsUrl;
var getAloneDocumentUrl = 'dss/findOne'; //查看单个文档详情

exports.getAloneDocumentUrl = getAloneDocumentUrl;
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
var creatFolderUrl = 'folder/save'; //创建文件夹

exports.creatFolderUrl = creatFolderUrl;
var getAllFolderUrl = 'folder/findAll'; //获取所有的文件夹

exports.getAllFolderUrl = getAllFolderUrl;
var getAloneFolderOwnUrl = '/relation/associated_File'; //获取该文件夹所拥有的所有内容的id

exports.getAloneFolderOwnUrl = getAloneFolderOwnUrl;
var getAloneFolderUrl = 'folder/findOne'; //获取单个文件夹详细信息

exports.getAloneFolderUrl = getAloneFolderUrl;