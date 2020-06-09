<!--  -->
<template>
    <div class='wrapper' ref="wrapper">
        <div class="content"><slot></slot></div>
    </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
    name: 'Scroll',
    props: {
        probeType: {
            type: Number,
            default: 0
        }
    },

    components: {},
    data() {
        return {
            scroll: null
        };
    },
    methods: {
        scrollTo(x,y,time=300) {
            this.scroll && this.scroll.scrollTo(x,y,time)
            //console.log('调用了') //调试的时候不要用滚轮！！
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        //上拉加载完成
        finishPullUp() {
            this.scroll && this.scroll.finishPullUp()
        }
    },
    mounted() {
        //创建scroll对象实例
        this.scroll = new BScroll(this.$refs.wrapper,{
            click: true,
            probeType: this.probeType,//根据传递进来的值决定是否监听滚动
            pullUpLoad: true
        })
        //监听滚动的位置，严禁模式
        if(this.probeType == 2 || this.probeType == 3) {
            this.scroll.on('scroll',(position) => {
            //console.log(position,this.probeType)
            this.$emit('scroll',position)
        })
        }
        //监听上拉事件
        this.scroll.on('pullingUp',() => {
            //console.log('上拉事件')
            this.$emit('pullingUp')
        })
        
    }

}
</script>

<style scoped>



</style>