<!--  -->
<template>
    <div class='toast' v-show="isShow">
        <span >{{massage}}</span>
    </div>
</template>

<script>

export default {
    name: 'Toast',
    data() {
        return {
            massage: '',
            isShow: false
        };
    },
    methods: {
        toastShow(s,t=1000) {
            this.isShow =true
            this.massage = s
            setTimeout(() => {
                this.isShow =false
                this.massage = ''
            },t)
        }
    },
}
</script>

<style scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    z-index: 99;

    color: #fff;
    background-color: #696969; 
}
</style>