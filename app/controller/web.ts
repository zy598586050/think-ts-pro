/*
 * @Author: zhangyu
 * @Date: 2023-10-24 10:04:07
 * @LastEditTime: 2024-01-05 12:26:45
 */
import fs from 'fs'
import { Context, Controller, ShowSuccess, GetParams, ApiException, M, Utils } from 'think-ts-lib'

export default class WebController extends Controller {

  // 获取js-sdk注入的配置信息
  async getJsSdkConfig(ctx: Context) {
    const params = GetParams(ctx)
    const obj = await (await M('web')).getJsSdkConfig(params.url)
    return ShowSuccess(obj)
  }

  // 微信内支付
  async goWxPay(ctx: Context) {
    const params = GetParams(ctx)
    const config = await (await M('web')).getWxPayConfig(params.code)
    return ShowSuccess(config)
  }

  // 微信外H5支付
  async goH5Pay(ctx: Context) {
    const url = await (await M('web')).getPayUrl(ctx)
    return ShowSuccess(url)
  }

  // 支付宝支付
  async goAliPay() {
    const formData = Utils.AlipayFormData()
    formData.setMethod('get')
    formData.addField('notifyUrl', '') // 当支付完成后，支付宝主动向我们的服务器发送回调的地址
    formData.addField('returnUrl', '') // 当支付完成后，当前页面跳转的地址
    formData.addField('bizContent', {
      productCode: 'QUICK_WAP_WAY',
      subject: 'ThinkTS实战', // 订单名称
      totalAmount: 1, // 支付金额
      outTradeNo: Utils.orderCode(), // 订单号
    })
    const result = await Utils.AliPay().exec('alipay.trade.wap.pay', {}, { formData })
    return ShowSuccess(result)
  }

  // 下发短信验证码
  async sendSms() {
    let result = await Utils.SMS().sendSMS({
      PhoneNumbers: 17610086895, // 要发送的手机号
      SignName: '馋么', // 认证签名
      TemplateCode: 'SMS_193870822', // 模板ID
      TemplateParam: JSON.stringify({
        code: Utils.getValidateCode()
      })
    })
    if (result.Code === 'OK') {
      return ShowSuccess()
    } else {
      ApiException('发送失败')
    }
  }

  // 上传图片到OSS
  async putStream(ctx: Context) {
    // 读取图片成流
    // @ts-ignore
    const reader = fs.createReadStream(ctx.request.files.file.filepath)
    // @ts-ignore
    const fileName = ctx.request.files.file.originalFilename
    const result = Utils.OSS().putStream(fileName, reader)
    return ShowSuccess(result)
  }

}