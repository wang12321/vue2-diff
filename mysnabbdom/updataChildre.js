/**
 * @author wangligang
 * @date 2021/2/4
 * @Description:
 * @update by:
 */
import patchVNode from './patchVNode.js'
import createElement from "./createElement.js";

function checkSameVnode(a,b) {
    return a.sel == b.sel && a.key == b.key;
}


export default function (parentElm,oldCH,newCH) {
    console.log('我是updatachildre')
    console.log(parentElm,oldCH,newCH);
    //旧前
    let oldStartIdx = 0;
    //新前
    let newStartIdx = 0;

    //旧后
    let oldEndIdx = oldCH.length - 1;
    //新后
    let newEndIdx = newCH.length - 1;

    //旧前节点
    let oldStartVnode = oldCH[0];
    //新前节点
    let newStartVnode = newCH[0];

    //旧后节点
    let oldEndVnode = oldCH[oldEndIdx];
    //新后节点
    let newEndVnode = newCH[newEndIdx];

    let keyMap = null;

    //开始大while
    while (oldStartIdx <= oldEndIdx && newStartIdx<=newEndIdx) {
        console.log("@@@")
        console.log(oldCH[oldStartIdx])
        console.log(oldCH[oldEndIdx])
        console.log(newCH[newStartIdx])
        console.log(newCH[newEndIdx])

        //要略过已经加了undefined标记的东西
        if(oldStartVnode == null || oldCH[oldStartIdx] == undefined){
            oldStartVnode = oldCH[ ++ oldStartIdx];
            console.log(oldStartVnode)
        }else if(oldEndVnode == null || oldCH[oldEndIdx] == undefined){
            oldEndVnode = oldCH[ -- oldEndIdx];
        }else if(newStartVnode == null || newCH[newStartIdx] == undefined){
            newStartVnode = newCH[ ++ newStartIdx];
        }else if(newEndVnode == null || newCH[newEndIdx] == undefined){
            newEndVnode = newCH[ -- newEndIdx];
        }else if(checkSameVnode(oldStartVnode,newStartVnode)){
            //新前和旧前
            console.log('新前和旧前')
            patchVNode(oldStartVnode,newStartVnode);
            oldStartVnode  = oldCH[++oldStartIdx];
            newStartVnode  = newCH[++newStartIdx];
        }else if(checkSameVnode(oldEndVnode,newEndVnode)){
            //新后和旧后
            console.log('新后和旧后')
            patchVNode(oldEndVnode,newEndVnode);
            oldEndVnode  = oldCH[--oldEndIdx];
            newEndVnode  = newCH[--newEndIdx];
        }else if(checkSameVnode(oldStartVnode,newEndVnode)){
            //新后和旧前
            console.log('新后和旧前')
            patchVNode(oldStartVnode,newEndVnode);
            parentElm.insertBefore(oldStartVnode.elm,oldEndVnode.elm.nextSibling);
            oldStartVnode  = oldCH[++oldStartIdx];
            newEndVnode  = newCH[--newEndIdx];
        }else if(checkSameVnode(oldEndVnode,newStartVnode)){
            //新前和旧后
            console.log('新前和旧后')
            patchVNode(oldEndVnode,newStartVnode);
            parentElm.insertBefore(oldEndVnode.elm,oldStartVnode.elm);
            newStartVnode  = newCH[++newStartIdx];
            oldEndVnode  = oldCH[--oldEndIdx];
        }else {
            //四种都没有匹配的情况
            console.log('都没有匹配的情况');
            //寻找key的map
            if(!keyMap){
                keyMap = {};
                for (let i = oldStartIdx; i <= oldEndIdx;i++) {
                    const key = oldCH[i].key;
                    if(key != undefined){
                        keyMap[key] = i;
                    }
                }
            }

            //寻找当前对象在keymap映射的位置
            const idxInOld = keyMap[newStartVnode.key];
            console.log(idxInOld);
            if (idxInOld == undefined) {
                //如果是undefined 表示是全新项
                console.log('全新项');
                // return false
                parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.elm)
            }else {
                //如果不是undefined 不是全新项要移动
                console.log('不是全新项要移动');
                const elmToMove = oldCH[idxInOld];
                console.log(elmToMove,newStartVnode)
                patchVNode(elmToMove,newStartVnode);
                oldCH[idxInOld] = undefined;
                //移动。调用insertBefore,表示我已经处理完这项了
                parentElm.insertBefore(elmToMove.elm,oldStartVnode.elm)
            }
            // 指针下移
            newStartVnode = newCH[++newStartIdx];
        }
    }


    //循环结束了startIdx 比endIdx 要小
    if(newStartIdx <= newEndIdx){
        //--- 新增节点
        console.log("new还有剩余节点没有处理");
        //插入的标杆
        // const before = newCH[newEndIdx+1] == null ?null:newCH[newEndIdx+1].elm;

        const before = oldCH[oldStartIdx] == null ?null:oldCH[oldStartIdx].elm;
        for (let i =newStartIdx; i<=newEndIdx; i++) {
            //insertBefor方法可以自动识别null,如果是null会自动排到队尾去，和appendClild一致
            //newCH[i] 没有生成真正dom 所以需要调用createElement
            parentElm.insertBefore(createElement(newCH[i]),before)
        }

    }else if(oldStartIdx <= oldEndIdx){
        //循环结束了oldstartIdx 比oldendIdx 要小 --- 删除老节点
        console.log("old还有剩余节点没有处理");
        for (let i =oldStartIdx; i<=oldEndIdx; i++) {
            //insertBefor方法可以自动识别null,如果是null会自动排到队尾去，和appendClild一致
            //newCH[i] 没有生成真正dom 所以需要调用createElement
            if(oldCH[i]){
                parentElm.removeChild(oldCH[i].elm);
            }
            // oldCH[i].elm = undefined;
        }


    }


}
