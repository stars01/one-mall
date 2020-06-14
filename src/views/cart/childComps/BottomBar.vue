<!--  -->
<template>
    <div class='bottom-bar'>
        <div class="bottom-bar-left">
            <check-button class="check-button" :checkedChange='allCheck' @click.native="allSelector"/>
            <span>全选</span>
        </div>
        <span class="bottom-bar-center">合计￥{{allPrice}}</span>
        <span class="bottom-bar-right" @click="balance">去结算({{checkLendth}})</span>
    </div>
</template>

<script>
import CheckButton from '../../../components/content/checkButton/CheckButton'

import {mapGetters} from 'vuex'

export default {
    name: 'BottomBar',

    components: {
        CheckButton
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(['cartList']),
    allPrice() {
        return this.cartList.filter((item) => {
            return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.Price
        }, 0)
    },
    checkLendth() {
        return this.cartList.filter((item) => {
            return item.checked
        }).length
    },
    allCheck() {
        return this.checkLendth === this.cartList.length && this.checkLendth > 0
        //方式2 有一个不选择 就为false
        // if (this.cartList.length === 0) {return false}
        // return !this.cartList.filter((item) => {return !item.checked}).length
        //方式3 有一个不选择 就为false 相对于方式2性能更高，find 找到一个就停下 部分情况想会影响结果
        // if (this.cartList.length === 0) {return false}
        // return !this.cartList.find((item) => {return !item.checked})
    },
    },
    methods: {
        allSelector() {
            this.$store.dispatch('allSelector',this.allCheck)
        },
        balance() {
            
            if(this.checkLendth === 0) {
                this.$toast.toastShow('没有选择商品')
            }
        }
    },
}
</script>

<style scoped>
.bottom-bar {
height: 40px;
position: fixed;
bottom: 49px;
left: 0;
right: 0;
display: flex;

line-height: 40px;

background-color: #e6e6e6;
}
.bottom-bar-left {
    width: 60px;
    display: flex;
}
.check-button {
    position: relative;
    top: 7px;
    margin-right: 5px;
}
.bottom-bar-center {
    flex: 1;
    padding-left: 20px;
}
.bottom-bar-right {
    width: 100px;
    background-color: #e96565;
    color: #fff;
    text-align: center;
}

</style>