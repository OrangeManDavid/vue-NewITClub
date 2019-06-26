<template>
   <el-row>
      <el-col :span="24">
          <el-menu
                  class="el-menu-demo"
                  mode="horizontal"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"
                  :router="true"
                  >
                  <el-menu-item :index="item.name" v-for="(item, index) in navLinks" :key="index">{{ item.title }}</el-menu-item>

                </el-menu>
      </el-col>
   </el-row>
</template>

<script>
    export default {
        name: "my-header",
        data(){
            return {
                navLinks: [
                    {name: 'home', title: '首页'},
                    {name: 'course', title: '免费课程'},
                    {name: 'lite-course', title: '轻课'},
                    {name: 'degree-course', title: '学位课程'},
                ]
            }
        }
    }
</script>

<style scoped>

</style>