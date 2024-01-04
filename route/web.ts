/*
 * @Author: zhangyu
 * @Date: 2023-10-18 10:49:20
 * @LastEditTime: 2023-12-29 12:17:27
 */
import { RouteType } from 'think-ts-lib'

export default (routes: RouteType) => {

    // 路由配置演示
    routes.group('/api/v1', (route: RouteType) => {
        // 获取js-sdk所需参数
        route.post('/jssdk', 'web/getJsSdkConfig')
        // 微信内支付
        route.post('/wxpay', 'web/goWxPay')
        // 微信外H5支付
        route.post('/h5pay', 'web/goH5Pay')
        // 支付宝支付
        route.post('/alipay', 'web/goAliPay')
        // 下发短信验证码
        route.post('/sendsms', 'web/sendSms')
        // 上传到oss
        route.post('/upload', 'web/putStream')
    })

}