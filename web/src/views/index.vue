<template>
    <div class="page">
        <div class="header">功能演示</div>

        <div class="button-list">
            <NButton class="btn" type="primary" @click="inWxPay">微信内支付</NButton>
            <NButton class="btn" type="primary" @click="h5WxPay">微信外支付</NButton>
            <NButton class="btn" type="primary" @click="aliPay">支付宝支付</NButton>
            <NInputGroup class="btn">
                <NInput disabled :value="phone" placeholder="17610086895" />
                <NButton type="primary" @click="sendSMS" :disabled="sendDisabled">
                    阿里验证码
                    <NCountdown v-if="sendDisabled" :render="renderCountdown" :duration="60 * 1000" :active="sendDisabled"
                        :on-finish="finish" />
                </NButton>
            </NInputGroup>
            <NUpload action="/api/v1/upload" accept="image/*" list-type="image-card" :default-file-list="fileList">OSS上传
            </NUpload>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { NButton, useMessage, NInputGroup, NInput, NUpload, UploadFileInfo, NCountdown, CountdownProps } from 'naive-ui'
import wx from 'weixin-jsapi'
import axios from 'axios'

const fileList = ref<UploadFileInfo[]>([])
const sendDisabled = ref<boolean>(false)
const phone = ref<string>('17610086895')
const message = useMessage()

onMounted(() => {
    initJsSdk()
    // 微信内就重定向获取code
    if (isWeChat.value) {
        goRedirect()
    }
})

const renderCountdown: CountdownProps['render'] = ({ seconds }) => {
    return `(${String(seconds || 60)})`
}

const isWeChat = computed(() => {
    const ua = window.navigator.userAgent.toLowerCase()
    return ua.includes('micromessenger')
})

const initJsSdk = () => {
    const url = window.location.href
    axios({
        url: '/api/v1/jssdk',
        method: 'POST',
        data: { url: url.split('#')[0] }
    }).then((result) => {
        wx.config(result.data.data)
    }).catch(() => {
        message.error('请正确配置您的服务')
    })
}

const goRedirect = (isForce: boolean = false) => {
    const code = getQueryString('code')
    if (!code || isForce) {
        const appid = 'wx520c63a7a02b8859'
        const redirect_uri = encodeURIComponent('http://h5pay.zhangyubk.com')
        window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`)
    }
}

const getQueryString = (name: string) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)")
    const r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2])
    return null
}

const inWxPay = () => {
    if (isWeChat.value) {
        const code = getQueryString('code')
        axios({
            url: '/api/v1/wxpay',
            method: 'POST',
            data: { code }
        }).then(result => {
            wx.ready(() => {
                wx.chooseWXPay({
                    ...result.data.data,
                    timestamp: result.data.data.timeStamp,
                    success: () => {
                        // 支付成
                    },
                    cancel: () => {
                        // 取消支付
                    },
                    fail: (e: any) => {
                        // 支付失败
                        console.log(e)
                    }
                })
            })
        }).catch(() => {
            message.error('请正确配置您的服务')
        })
    } else {
        message.warning('请在微信内支付')
    }
}

const h5WxPay = () => {
    if (isWeChat.value) {
        message.warning('请在微信外浏览器支付')
    } else {
        axios({
            url: '/api/v1/h5pay',
            method: 'POST'
        }).then(result => {
            window.location.replace(result.data.data.h5_url)
        }).catch(() => {
            message.error('请正确配置您的服务')
        })
    }
}

const aliPay = () => {
    axios({
        url: '/api/v1/alipay',
        method: 'POST'
    }).then(result => {
        window.location.replace(result.data.data)
    }).catch(() => {
        message.error('请正确配置您的服务')
    })
}

const sendSMS = () => {
    axios({
        url: '/api/v1/sendsms',
        method: 'POST'
    }).then(() => {
        message.success('发送成功')
        sendDisabled.value = true
    }).catch(() => {
        message.error('请正确配置您的服务')
    })
}

const finish = () => {
    sendDisabled.value = false
}
</script>

<style>
.n-input.n-input--disabled .n-input__input-el,
.n-input.n-input--disabled .n-input__textarea-el {
    color: #000000 !important;
}
</style>

<style lang="scss">
.page {
    width: 100%;
    height: 100vh;
    max-width: 430px;
    margin: 0 auto;
    box-shadow: 0 1px 2px -2px rgba(0, 0, 0, .08), 0 3px 6px 0 rgba(0, 0, 0, .06), 0 5px 12px 4px rgba(0, 0, 0, .04);

    .header {
        font-size: 20px;
        font-weight: 700;
        background: #ffffff;
        color: #333;
        box-shadow: 0 2px 5px rgba(0, 0, 0, .07);
        text-align: center;
        padding: 15px 0;
        margin-bottom: 10px;
    }

    .button-list {
        display: flex;
        flex-direction: column;
        padding: 10px;

        .btn {
            margin-bottom: 15px;
        }
    }
}
</style>