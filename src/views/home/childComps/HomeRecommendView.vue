<!--  -->
<template>
    <div class='recommend'>
        <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image" alt="">
                <p>{{item.title}}</p>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    name: 'HomeRecommendView',
    props: {
        recommends: {
            type: Array,
            default() {
                return []
            }
        }
    },
    components: {},
//方法集合
    methods: {

    },

}
</script>

<style>
.recommend{
    display: flex;
    text-align: center;
    font-size: 14px;
    padding: 15px 0 10px;
    border-bottom: 7px solid #aaa;
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    width: 85%;
    margin-bottom: 10px;
}
</style>