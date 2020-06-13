<!--  -->
<template>
    <div class='cart-list'>
        <scroll class="content" ref="scroll" >
            <cart-list-item 
            v-for="(item, index) in cartList" :key="index" 
            :cartItem='item' />
        </scroll>
    </div>
</template>

<script>
import CartListItem from './CartListItem'
import {mapGetters} from 'vuex'

import Scroll from '../../../components/common/scroll/Scroll'

export default {
    name:'CartList',
    components: {
        CartListItem,
        Scroll
    },
    data() {
//这里存放数据
        return {};
    },
    computed: {
        ...mapGetters([
            'cartList'
        ])
    },
    methods: {

    },
    activated() {
        this.$refs.scroll.refresh()
    }
}
</script>

<style scoped>
.cart-list {
    height: calc(100vh - 44px - 49px);
    overflow: hidden;
}
.content {
    height: 100%;
}
</style>