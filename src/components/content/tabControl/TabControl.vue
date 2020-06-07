<!--  -->
<template>
    <div class='tab-control'>
        <div v-for="(item, index) in titles" :key="index"
        :class="{active:index===currentIndex}"
        @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        titles: {
            type: Array,
            default() {
                return []
            }
        }
    },
    data() {
        return {
            currentIndex: 0
        }
    },
    methods: {
        itemClick(index) {
            this.currentIndex = index
            this.$emit('tabClick',index)
        }
    }
}
</script>

<style>
.tab-control {
    display: flex;
    text-align: center;
    font-size: 16px;
    height: 40px;
    line-height: 40px;
    background-color: #fff;
}

.tab-control div {
    flex: 1;
}
.tab-control span {
    padding: 5px 0;
}
.tab-control .active span {
    border-bottom: 3px solid var(--color-tint);
    color: var(--color-tint);
}
</style>