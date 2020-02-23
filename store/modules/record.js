import { getLiveRecordListByStudent, fillupLiveRecordPage } from '@/api/recordApi'
import {getStore,setStore} from '../../util/service'
const record = {
    namespaced: true,
    state: {
        userInfo: getStore('userInfo')|| {},
        role: getStore('role')|| [],
        uniToken: getStore('uniToken') || '',
        menu: getStore('menu') || [],
        permission: {},
		openId:''
    },
    getters: {},
    mutations: {
        SET_TOKEN: (state, params) => {
            state.uniToken = params
            setStore('uniToken', params)
        },
        SET_MENU: (state, params) => {
            state.menu = params
            setStore('menu', params)
        },
        SET_ROLE: (state, params) => {
            state.role = params 
            setStore('role', params)
        },
        SET_USER_INFO: (state, params) => {
            state.userInfo = params
            setStore('userInfo', params)
        },
		SET_OPENID:(state,params)=>{
            state.uniToken = params.openId
            setStore('uniToken', params.openId)
			state.openId = params.openId
		}
    },
    actions: {
				GetLiveRecordListByStudent ({state, commit, dispatch}, params) {
					return new Promise((resolve, reject) => {
						getLiveRecordListByStudent(params).then(res => {
					// console.log(res)
							resolve(res)
						})
					})
				},
				FillupLiveRecordPage ({state, commit, dispatch}, params) {
					return new Promise((resolve, reject) => {
						fillupLiveRecordPage(params).then(res => {
					// console.log(res)
							resolve(res)
						})
					})
				},
    }
}
export default record
