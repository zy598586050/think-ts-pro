/*
 * @Author: zhangyu
 * @Date: 2023-11-14 17:05:07
 * @LastEditTime: 2023-12-29 18:58:39
 */
import { RDb, Utils } from 'think-ts-lib'
import wx from '../../config/wx'
import axios from 'axios'

// 模型，数据处理层
export default class WebModel {

    // 获取ACCESS_TOKEN
    async getAccessToken() {
        // 判断缓存里是否有ACCESS_TOKEN
        const ACCESS_TOKEN = await RDb().get('THINKTS_ACCESS_TOKEN')
        if (!ACCESS_TOKEN) {
            const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${wx.wechat.appid}&secret=${wx.wechat.secret}`
            const result = await axios({ url })
            RDb().set('THINKTS_ACCESS_TOKEN', result.data.access_token, 7200)
            return result.data.access_token
        }
        return ACCESS_TOKEN
    }

    // 获取JSAPI_TICKET
    async getJsapiTicket() {
        const JSAPI_TICKET = await RDb().get('THINKTS_JSAPI_TICKET')
        const ACCESS_TOKEN = await this.getAccessToken()
        if (!JSAPI_TICKET) {
            const url = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${ACCESS_TOKEN}&type=jsapi`
            const result = await axios({ url })
            RDb().set('THINKTS_JSAPI_TICKET', result.data.ticket, 7200)
            return result.data.ticket
        }
        return JSAPI_TICKET
    }

    // 获取js-sdk注入的配置信息
    async getJsSdkConfig(url: string) {
        let obj: any = {
            jsapi_ticket: await this.getJsapiTicket(),
            nonceStr: Utils.getNonceStr(32),
            timestamp: String(Math.floor(Date.now()/1000)),
            url
        }
        let str = Utils.raw(obj)
        obj.signature = Utils.sha1(str)
        obj.appId = wx.wechat.appid
        obj.jsApiList = ['chooseWXPay']
        obj.debug = false
        delete obj.url
        return obj
    }

    // 获取支付台所需参数
    async getWxPayConfig(code: string) {
        // 获取openid
        const url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wx.wechat.appid}&secret=${wx.wechat.secret}&code=${code}&grant_type=authorization_code`
        const result = await axios({ url })
        const prepay_id = await this.getPrepayId(result.data.openid)
        let obj: any = {
            appId: wx.wechat.appid,
            timeStamp: String(Math.floor(Date.now()/1000)),
            nonceStr: Utils.getNonceStr(32),
            package: `prepay_id=${prepay_id}`,
            signType: 'RSA'
        }
        const str = `${obj.appId}\n${obj.timeStamp}\n${obj.nonceStr}\n${obj.package}\n`
        obj.paySign = Utils.rsaSign(str, wx.wxpay.private_key)
        return obj
    }

    // 微信内支付获取prepay_id
    async getPrepayId(openid: string) {
        const result = await Utils.WxPay().jsapi({
            description: 'ThinkTS实战', // 商品描述
            out_trade_no: Utils.orderCode(), // 商户订单号
            amount: {
                total: 100, // 总金额
                currency: 'CNY' // 人民币
            },
            payer: {
                openid
            }
        })
        if(result.status === 200){
            return JSON.parse(result.data).prepay_id
        }else{
            return null
        }
    }

    // 微信外支付获取跳转链接
    async getPayUrl() {
        const result = await Utils.WxPay().h5({
            description: 'ThinkTS实战', // 商品描述
            out_trade_no: Utils.orderCode(), // 商户订单号
            amount: {
                total: 100, // 总金额
                currency: 'CNY' // 人民币
            },
            scene_info: {
                payer_client_ip: Utils.getIP(), // 用户终端IP
                h5_info: {
                    type: 'Wap' // 场景类型
                }
            }
        })
        if(result.status === 200){
            return JSON.parse(result.data)
        }else{
            return null
        }
    }
}