import createElement from "./createElement.js";
import updataChildre from "./updataChildre.js";

/**
 * @author wangligang
 * @date 2021/2/4
 * @Description:
 * @update by:
 */
export default function (oldVnode,newVnode) {
    //判断新旧vnode是否是同一个对象
    if(oldVnode === newVnode) return;
    //判断新vnode有没有text属性
    if(newVnode.text != undefined &&(newVnode.children == undefined || newVnode.children.length == 0)){
        //新vnode有text属性
        if(newVnode.text != oldVnode.text){
            console.log(9999999)

            //如果新虚拟节点中的text和老的虚拟节点的text不同，那么直接让新的text写入老的 elm中即可。如果老的elm中时children，那么也会立即消失
            oldVnode.elm.innerHTML = newVnode.text;
        }
    }else {
        //新的vnode 没有text属性 那些新的vnode里面就有children
        //判断老的有没有children
        if(oldVnode.children != undefined && oldVnode.children.length >0){
            //老的有children。此时就是最复杂的情况
            console.log('老的有children')

            updataChildre(oldVnode.elm,oldVnode.children,newVnode.children)
            // console.log(oldVnode,newVnode)
            // let un = 0
            // for(let i = 0;i < newVnode.children.length;i++){
            //    //再次遍历看看oldVnode中有没有节点和他的相同
            //     let ch = newVnode.children[i];
            //     let isExist = false;
            //     for(let j = 0;j<oldVnode.children.length;j++){
            //         if(oldVnode.children[j].sel == ch.sel && oldVnode.children[j].key == ch.key){
            //             isExist = true;
            //         }
            //     }
            //     if(!isExist){
            //         console.log(ch,i)
            //         //找出与oldnode 不同的dom 创建，插入
            //        let dom =  createElement(ch);
            //         oldVnode.elm.insertBefore(dom,oldVnode.children[un].elm)
            //     }else {
            //         un ++;
            //     }
            // }

        }else {
            console.log('老的没有children')
            //老的没有children。
            //1、清空老的，2、创建新的
            oldVnode.elm.innerHTML = '';
            for(let i = 0; i< newVnode.children.length;i++){
                let dom = createElement(newVnode.children[i]);
                oldVnode.elm.appendChild(dom);
            }
        }
    }
}
