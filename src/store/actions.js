import {ADD_TO_CART,ADD_COUNTER,CHECKED_CHANGE,ALL_SELECTOR_CHECK} from './mutation-types'


const actions = {
    addCart(context,cartObj) {
        //判断cartList中是否有传入对象的iid，如果有获取那个item
        //方法1
        // let oldCartObj = null
        // for (let item in context.state.cartList) {
        //     if(item.iid === cartObj.iid) {
        //         oldCartObj = item
        //     } 
        // }
        //方法2
        let oldCartObj = context.state.cartList.find(item => item.iid === cartObj.iid)
        // //已有商品对象count+1。无=1并添加到cartList里
        if (oldCartObj) {
            // oldCartObj.count += 1
            context.commit(ADD_COUNTER,oldCartObj)
        } else {
            // state.cartList.push(cartObj)
            context.commit(ADD_TO_CART,cartObj)
        }
    },
    checkedChange(context,cartItem) {
        context.commit(CHECKED_CHANGE,cartItem)
    },
    allSelector(context,allCheck) {
        context.commit(ALL_SELECTOR_CHECK,allCheck)
    }
}
export default actions