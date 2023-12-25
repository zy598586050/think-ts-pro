/*
 * @Author: zhangyu
 * @Date: 2023-10-18 10:49:20
 * @LastEditTime: 2023-12-25 14:05:15
 */
import { RouteType } from 'think-ts-lib'

export default (routes: RouteType) => {

    // 功能演示页面
    routes.get('/', 'web/showIndex')

}