import request from './request'
/**
 * 登录接口
 * @param {password,username} params 
 */
export const login = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            var data = res.data
            if (params.username == data.account[0].username && params.password == data.account[0].password) {
                resolve({data: {token: '123456789'}, message: '登录成功', success: true})
            } else if (params.username == data.account[1].username && params.password == data.account[1].password) {
                resolve({data: {token: '987654321'}, message: '登录成功', success: true})
            } else {
                resolve({data: {}, message: '登录失败', success: false})
            }
        }
        request(successCallBack,null,'https://www.easy-mock.com/mock/5cd7d319d0d16128bd72b17a/demo/login','POST',params)
    })
}
export const logout = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/user/login',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            resolve({message: '登出成功', success: true})
        })
    })
}
export const getUserInfo = (params) => {
    return new Promise((resolve, reject) => {
        axios({
            url: baseUrl + '/user/userInfo',
            method: 'post',
            data: qs.stringify(params)
        }).then(res => {
            if (params == '123456789') {
                resolve({data: res.data.userInfo, message: '获取用户信息成功', success: true})
            } else {
                res.data.userInfo.role = ['user']
                resolve({data: res.data.userInfo, message: '获取用户信息成功', success: true})
            }
        })
    })
}
