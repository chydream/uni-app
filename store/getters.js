import {getQueryString} from '../util/util'
const getters = {
    uniToken: state => state.user.uniToken,
	roleCode (state) {
		return 'Student'
	},
	token (state) {
		var url = location?location.href : ''
		var params = getQueryString(url) ? getQueryString(url) : {}
		var token = params.token ? params.token : '123e6e43'
		return token
	},
	studentInfo: state => state.user.studentInfo
}
export default getters
