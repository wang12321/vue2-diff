/**
 * @author wangligang
 * @date 2021/2/4
 * @Description:
 * @update by:
 */

//真正创建节点
export default function  createElement(vnode) {
    console.log('目的是吧虚拟节点插入到标杆');
    let  domNode = document.createElement(vnode.sel);
    if(vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)){
        //内部是文字
        domNode.innerText = vnode.text;
        //将孤儿节点上树，让标杆父节点调用insertBefore方法
        // pivot.parentNode.insertBefore(domNode,pivot);


    }else if(Array.isArray(vnode.children) && vnode.children.length > 0){
        for (let i = 0;i<vnode.children.length;i++) {
            let ch = vnode.children[i];
            console.log(ch);
           let chDOM = createElement(ch);
           // 上树
            domNode.appendChild(chDOM);
        }
    }
    vnode.elm = domNode;

    // 返回节点
    return vnode.elm
}
