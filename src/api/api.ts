import axios from '../util/request'
import Login from './config/Login'
import Closet from './config/Closet'
import Without from './config/Without'
import Schedule from './config/Schedule'

// 登录
export const postLogin = (options: any) => axios.post(Login.postLogin, options) 

// 注册
export const postRegister = (options: any) => axios.post(Login.postRegister, options)

// 修改用户信息
export const postUpdate = (options: any) => axios.post(Login.postUpdate, options)

// 上传新衣
export const postUploadClothe = (options: any) => axios.post(Closet.PostUploadClothe, options, { 'Content-Type': 'multipart/form-data' })

// 获取衣服列表
export const getClotheList = (options: any) => axios.get(Closet.GetClotheList, options)

// 上传图片
export const postUploadImg = (options: any) => axios.post(Without.PostUploadImg, options, { 'Content-Type': 'multipart/form-data' })

// 获取衣服分类
export const getClotheSort = () => axios.get(Closet.GetClotheSort)

// 获取衣服数量
export const getClotheCount = () => axios.get(Closet.getClotheCount)

// 获取衣服审核数量
export const getClotheCheckCount = () => axios.get(Closet.getClotheCheckCount)

// 获取日程
export const getSchedule = () => axios.get(Schedule.getSchedule)

// 添加日程
export const postSchedule = (options: any) => axios.post(Schedule.postSchedule, options)

// 获取用户信息
export const getUserInfo = () => axios.get(Login.getUserInfo)

// 获取用户数量
export const getUserCount = () => axios.get(Login.getUserCount)