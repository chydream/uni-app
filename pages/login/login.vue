<template>
	<view>
		<!-- #ifdef APP-PLUS -->  
		<view class="status_bar">  
			<view class="top_view"></view>  
		</view>  
		<!-- #endif -->
		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<view class="title">用户名</view>
				<input class="uni-input" focus placeholder="请输入用户名" />
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">密码</view>
				<input class="uni-input" password type="text" placeholder="请输入密码" />
			</view>
			<view class="button-sp-area log-btn">
				<button type="primary" plain="true" @click="bindLogin" size="mini">按钮</button>
			</view>
			<view class="oauth-row" v-if="hasProvider" :style="{top:positionTop+'px'}">
				<view class="oauth-image" v-for="provider in providerList" :key="provider.value">
					<image :src="provider.image" @tap="oauth(provider.value)"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import{mapGetters} from 'vuex';
	import mixinsFun from '../../mixins/mixinsFun.js';
	export default {
		mixins:[mixinsFun],
		data(){
			return {
				account:'',
				password:'',
				title: 'input',
				focus: false,
				inputValue: '',
				changeValue: '',
				hasProvider:true,
				providerList:[],
				positionTop:''
			}
		},
		computed:{
			...mapGetters(['userName','token'])
		},
		methods:{
			initProvider() {
                const filters = ['weixin', 'qq', 'sinaweibo'];
                uni.getProvider({
                    service: 'oauth',
                    success: (res) => {
						console.log(JSON.stringify(res));
                        if (res.provider && res.provider.length) {
                            for (let i = 0; i < res.provider.length; i++) {
                                if (~filters.indexOf(res.provider[i])) {
                                    this.providerList.push({
                                        value: res.provider[i],
                                        image: '../../static/img/' + res.provider[i] + '.png'
                                    });
									console.log(JSON.stringify(this.providerList));
                                }
                            }
                            this.hasProvider = true;
                        }
                    },
                    fail: (err) => {
                        console.error('获取服务供应商失败：' + JSON.stringify(err));
                    }
                });
            },
			bindLogin(){
				// this.uShowActionSheet(['A', 'B', 'C'])
				// console.log(this.getSystemInfoSyncData())
				// this.goBackUrl(1);
				// this.getProviderData()
				this.getLogin()
			},
			initPosition() {
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			 oauth(value) {
                uni.login({
                    provider: value,
                    success: (res) => {
                        uni.getUserInfo({
                            provider: value,
                            success: (infoRes) => {
								// console.log(JSON.stringify(infoRes.userInfo));
                                /**
                                 * 实际开发中，获取用户信息后，需要将信息上报至服务端。
                                 * 服务端可以用 userInfo.openId 作为用户的唯一标识新增或绑定用户信息。
                                 */
                                this.toMain(infoRes.userInfo.nickName,infoRes.userInfo.openId);
                            }
                        });
                    },
                    fail: (err) => {
                        console.error('授权登录失败：' + JSON.stringify(err));
                    }
                });
            },
			toMain(userName,token) {
                this.$store.commit('user/SET_USERNAME',{userName:userName,token:token})
                /**
                 * 强制登录时使用reLaunch方式跳转过来
                 * 返回首页也使用reLaunch方式
                 */
                if (this.token) {
                    uni.reLaunch({
                        url: '../index/index',
                    });
                } else {
                    uni.navigateBack();
                }

            },
			onKeyInput: function(event) {
				this.inputValue = event.target.value
			},
			replaceInput: function(event) {
				var value = event.target.value;
				if (value === '11') {
					this.changeValue = '2';
				}
			},
			hideKeyboard: function(event) {
				if (event.target.value === '123') {
					uni.hideKeyboard();
				}
			}
		},
		onReady() {
            this.initProvider();
			this.initPosition();
        }
	}
</script>

<style>
	.status_bar {  
		height: var(--status-bar-height);  
		width: 100%;  
		background-color: #F8F8F8;  
	}  
	.top_view {  
		height: var(--status-bar-height);  
		width: 100%;  
		position: fixed;  
		background-color: #F8F8F8;  
		top: 0;  
		z-index: 999;  
	}  
	.log-btn{
		margin-top: 20upx;
		text-align: center;
	}
	.title{
		width: 100upx;
		float: left;
		text-align: right;
		margin-right: 20upx;
	}
	.uni-input{
		border: 1px solid #ccc;
		margin: 0 20upx 0 0upx;
		text-indent: 10upx;
	}
	.uni-form-item{
		margin: 20upx 0;
	}
	.oauth-row {
        display: flex;
        flex-direction: row;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }

    .oauth-image {
        width: 100upx;
        height: 100upx;
        border: 1upx solid #dddddd;
        border-radius: 100upx;
        margin: 0 40upx;
        background-color: #ffffff;
    }

    .oauth-image image {
        width: 60upx;
        height: 60upx;
        margin: 20upx;
    }
</style>
