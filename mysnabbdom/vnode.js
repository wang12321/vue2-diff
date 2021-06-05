/**
 * @author wangligang
 * @date 2021/2/4
 * @Description:
 * @update by:
 */
//函数的功能非常简单，就是把传入的5个参数组合成对象返回
export default function (sel,data,children,text,elm) {
    return {
        sel,data,children,text,elm,key:data.key?data.key:''
    }
}
