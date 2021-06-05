/**
 * @author wangligang
 * @date 2021/2/4
 * @Description:
 * @update by:
 */
import vnode from './vnode.js'

// console.log(vnode('div',1,2,3,4))

//编写一个低配版本的h函数，必须要3个参数
// 也就是说调用的的形态必须是下面三种之一
// 1、h('div',{},'文字')
// 2、h('div',{},[])
// 3、h('div',{},h())

export default function (sel,data,c) {
    if(arguments.length !== 3)
        throw new Error('对不起，h函数必须传入3个参数');
    if(typeof c == 'string' || typeof c == 'number'){
        // 形态1
        return vnode(sel,data,undefined,c,undefined);

    }else if(Array.isArray(c)){
        // 形态2
        let children = [];
        //遍历c
        for(let i = 0;i<c.length;i++){
            if(!(typeof c[i] == 'object')&& c[i].hasOwnProperty('sel')){
                throw new Error('c中的参数没有h函数');
            }
            children.push(c[i]);
        }
        return vnode(sel,data,children,undefined,undefined)
    }else if(typeof c == 'object' && c.hasOwnProperty('sel')){
        // 形态3
        // c 就是唯一的childe
        return vnode(sel,data,[c],undefined,undefined)

    }else {
        throw new Error('对不起，c的参数不对');
    }

}
