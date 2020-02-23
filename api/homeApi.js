import request from './request'
import {cloudUrl} from '@/config/config'

// 学生前端课程列表页面查询
export const selectCsListToStu = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
               resolve(res.data)
            }
        }
        request(successCallBack,null,cloudUrl + '/course/selectCsListToStu','POST',params)
    })
}
// 学生前端课程详情页面查询
export const queryCourseToStu = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
               resolve(res.data)
            }
        }
        request(successCallBack,null,cloudUrl + '/course/queryCourseToStu','Get',params)
    })
}
// 学生前端根据课程id查询直播视频
export const selectLiveListByCourseToStu = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
               resolve(res.data)
            }
        }
        request(successCallBack,null,cloudUrl + '/live/selectLiveListByCourseToStu','Get',params)
    })
}
// 学生前端根据课程id查询资源集合视频
export const selectResVideoByCourseToStu = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
               resolve(res.data)
            }
        }
        request(successCallBack,null,cloudUrl + '/resource/selectResVideoByCourseToStu','Get',params)
    })
}
// 学生前端根据课程id查询资源集合视频
export const selectMyCourseListToStu = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
               resolve(res.data)
            }
        }
        request(successCallBack,null,cloudUrl + '/course/selectMyCourseListToStu','POST',params)
    })
}
// 课程报名保存 包含免费和收费
export const saveCourseEnter = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
               resolve(res.data)
            }
        }
        request(successCallBack,null,cloudUrl + '/course/saveCourseEnter','POST',params)
    })
}
// 课程报名保存 包含免费和收费 微信
export const saveCourseEnterWeixin = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
               resolve(res.data)
            }
        }
        request(successCallBack,null,cloudUrl + '/course/saveCourseEnterWeixin','POST',params)
    })
}
// 根据订单编号查询订单对象
export const queryCloudCourseOrderById = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
               resolve(res.data)
            }
        }
        request(successCallBack,null,cloudUrl + '/order/queryCloudCourseOrderById','GET',params,true)
    })
}