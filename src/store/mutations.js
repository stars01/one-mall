import {ADD_TO_CART,ADD_COUNTER,CHECKED_CHANGE,ALL_SELECTOR_CHECK} from './mutation-types'

const mutations = {
    [ADD_COUNTER](state,oldCartObj){
        oldCartObj.count += 1
    },
    [ADD_TO_CART](state,cartObj) {
        cartObj.count = 1
        cartObj.checked = true
        state.cartList.push(cartObj)
    },
    [CHECKED_CHANGE](state,cartItem) {
        cartItem.checked =! cartItem.checked
    },
    [ALL_SELECTOR_CHECK](state,allCheck) {
        state.cartList.forEach(item => {
            item.checked = ! allCheck
        });
    }
}
export default mutations