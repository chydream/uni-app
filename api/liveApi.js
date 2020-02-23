import request from './request'
import {cloudUrl} from '../config/config'
/**
 * 登录接口
 * @param {password,username} params 
 */

export const selectLiveListByCouSchoolToStu = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
               resolve(res.data)
            }
        }
        request(successCallBack,null,cloudUrl + '/live/selectLiveListByCouSchoolToStu','POST',params)
    })
}