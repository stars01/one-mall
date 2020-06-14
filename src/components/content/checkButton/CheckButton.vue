<!--  -->
<template>
    <div class='selector' :class="{'selector-active': checkedChange}" >
        <img src="../../../assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>

export default {
    name:'CheckButton',
    props: {
        checkedChange: {
            type :Boolean,
            default() {
                return true
            }
        }
    },
    components: {},
    data() {
        return {};
    },
    methods: {

    },
}
</script>

<style scoped>
.selector {
    height: 22px;
    width: 22px;
    border-radius:50%;
    border:1px solid #aaa;

}
.selector img {
    width: 20px;
    position: relative;
    top: -2px;
    left: 0px;
}
.selector-active {
    background-color: #ff829b;
}
</style>