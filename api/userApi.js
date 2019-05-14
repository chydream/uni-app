import request from './request'
/**
 * 登录接口
 * @param {password,username} params 
 */
export const login = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
                var data = JSON.parse(res.data)
                if (params.username == data.account[0].username && params.password == data.account[0].password) {
                    resolve({data: {token: '123456789'}, message: '登录成功', success: true})
                } else if (params.username == data.account[1].username && params.password == data.account[1].password) {
                    resolve({data: {token: '987654321'}, message: '登录成功', success: true})
                } else {
                    resolve({data: {}, message: '登录失败', success: false})
                }
            }
        }
        request(successCallBack,null,'https://www.easy-mock.com/mock/5cd7d319d0d16128bd72b17a/demo/login','POST',params)
    })
}
export const logout = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
                resolve({message: '登出成功', success: true})
            }
        }
        request(successCallBack,null,'https://www.easy-mock.com/mock/5cd7d319d0d16128bd72b17a/demo/login','POST',params)
    })
}
export const getUserInfo = (params) => {
    return new Promise((resolve, reject) => {
        let successCallBack = function(res){
            if(res.data){
                var data = JSON.parse(res.data).data
                if (params.token == '123456789') {
                    resolve({data: data.userInfo, message: '获取用户信息成功', success: true})
                } else {
                    res.data.userInfo.role = ['user']
                    resolve({data: data.userInfo, message: '获取用户信息成功', success: true})
                }
            }
        }
        request(successCallBack,null,'https://www.easy-mock.com/mock/5cd7d319d0d16128bd72b17a/demo/userInfo','POST',params)
    })
}
