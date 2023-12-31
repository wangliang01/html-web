// 将所有指令导出，在入口文件通过app.use注册
import sizeOb from './size-ob'


export default {
    install(app) {
        app.directive('size-ob', sizeOb)
    }
}