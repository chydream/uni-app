
const getStore = function (key) {
	let value = uni.getStorageSync(key);
	return JSON.parse(value);
}
const setStore = function(key,value){
	uni.setStorageSync(key,JSON.stringify(value))
}
export default {
	getStore,
	setStore
}