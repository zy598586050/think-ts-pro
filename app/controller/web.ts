/*
 * @Author: zhangyu
 * @Date: 2023-10-24 10:04:07
 * @LastEditTime: 2023-12-25 14:15:54
 */
import { Context, Controller, ShowSuccess, GetParams, View, Db, ApiException } from 'think-ts-lib'

export default class HelloController extends Controller {

  // 功能演示界面
  showIndex() {
    return View('index', {})
  }

}