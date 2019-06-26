<template>
  <div class="about">
    <button @click="goHome">点我返回主页</button>
  </div>
</template>


<script>
    export default {
        name: 'About',
        methods: {
            goHome(){
                // 通过代码跳转到 home
                this.$router.push({name: 'home'})
            }
        }
    }
</script>
