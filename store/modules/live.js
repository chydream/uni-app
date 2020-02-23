import { selectLiveListByCouSchoolToStu } from '@/api/liveApi'
import {getStore,setStore} from '../../util/service'
const live = {
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
				SelectLiveListByCouSchoolToStu ({state, commit, dispatch}, params) {
					return new Promise((resolve, reject) => {
						selectLiveListByCouSchoolToStu(params).then(res => {
					// console.log(res)
							resolve(res)
						})
					})
				},
    }
}
export default live
