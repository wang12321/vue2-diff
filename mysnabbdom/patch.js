/**
 * @author wangligang
 * @date 2021/2/4
 * @Description:
 * @update by:
 */
import vnode from  './vnode.js'
import createElement from  './createElement.js'
import patchVNode from "./patchVNode.js";

export default function (oldVnode,newVnode) {
    console.log(oldVnode,newVnode)
    //判断传入的第一个参数，是DOM节点还是虚拟节点？
    if(oldVnode.sel == '' || oldVnode.sel == undefined){
        // 传入的第一个参数是DOM节点，此时要包装为虚拟节点
        oldVnode = vnode(oldVnode.tagName.toLowerCase(),{},[],undefined,oldVnode)
    }
    console.log(oldVnode)

    //判断oldvnode 和newVnode 是不是同一个节点
    if(oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel){
        console.log('同一节点')
        patchVNode(oldVnode,newVnode);

    }else {
        console.log('不同节点')
        let newElm = createElement(newVnode,oldVnode.elm);
        // 将返回的节点上树
        if(oldVnode.elm.parentNode && newElm){
            oldVnode.elm.parentNode.insertBefore(newElm,oldVnode.elm);
        }
        //删除老节点
        oldVnode.elm.parentNode.removeChild(oldVnode.elm);

    }
}
