import {
  http
} from './ajax'

// 获取产品数据
export const getProductList = (data) => {
  return http.post('/api/material/productlist', data)
}

// 修改或新增产品
export const addOrUpdateProduct = (data) => {
  return http.post('/api/material/addOrEditproduct', data)
}

// 获取翻译语言列表
export const getLanguageList = (data) => {
  return http.post('/api/material/translatelist', data)
}

// 翻译语言模板查询
export const getLanguageKeylist = (data) => {
  return http.post('/api/material/keylist', data)
}

// 修改和新增语言
export const addOrUpdateLanguageList = (data) => {
  return http.post('/api/material/addoredit/translatelang', data)
}

// 获取素材列表
export const getPaletteTypeList = (data) => {
  return http.post('/api/material/typelist?env=test', data)
}

// 新增素材
export const addPaletteList = (data) => {
  return http.post('/api/material/addtype', data)
}

// 新增素材
export const updatePaletteList = (data) => {
  return http.post('/api/material/edittype', data)
}

// 素材单个（音乐）获取数据
export const getPaletteSingleList = (data) => {
  return http.post('/api/material/palettelist', data)
}

// 素材单个（音乐）编辑
export const updatePaletteSingleList = (data) => {
  return http.post('/api/material/editpalette', data)
}

// 素材单个（音乐）新增
export const addPaletteSingleList = (data) => {
  return http.post('/api/material/uploadfile', data)
}

// 产品素材列表获取
export const getProductPaletteList = (data) => {
  return http.post('/api/product/palettetypelist', data)
}

// 产品素材列表修改
export const updateProductPaletteList = (data) => {
  return http.post('/api/product/addoredit/palettetype', data)
}

// 产品素材列表删除
export const deleProductPaletteList = (data) => {
  return http.post('/api/product/delete/palettetype', data)
}

// 获取分类素材下的详细素材列表
export const getProductChildPaletteDetail = (data) => {
  return http.post('/api/product/palettedetaillist', data)
}

// 修改分类素材下的详细素材列表
export const updateProductChildPaletteDetail = (data) => {
  return http.post('/api/product/addoredit/palettedetail', data)
}

// 删除素材下的详细素材列表
export const deleProductChildPaletteDetail = (data) => {
  return http.post('/api/product/delete/palettedetail', data)
}

// 分类素材下的详细素材列表
export const searchProductChildpalettelist = (data) => {
  return http.post('/api/product/palettelist', data)
}