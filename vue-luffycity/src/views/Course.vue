<template>
    <div>
        <!--课程的分类或筛选-->
        <el-row style="margin-top: 20px">
            <el-col :span="16" :offset="4">
                <el-card class="box-card">
                    <el-row type="flex">
                        <span class="category-title">课程分类：</span>
                        <el-button
                                v-for="item in categoryList"
                                :key="item.id"
                                :autofocus="true"
                                @click="clickCategoty(item.id)"
                        >
                            {{ item.name }}
                        </el-button>
                    </el-row>
                    <div class="line"></div>
                    <el-row type="flex">
                        <span class="filter-title">筛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;选：</span>
                        <el-button
                                v-for="item in filterList"
                                :key="item.id"
                                type="text"
                                :style="{color: currentFilter===item.id?'#E6A23C':''}"
                                @click="clickFilter(item.id, item.ordering)"
                        >
                            {{ item.name }}
                            <i v-if="item.id === 2" class="el-icon-d-caret"></i>
                        </el-button>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>
        <!--课程列表-->
        <div class="course-list" v-loading="loading">
            <el-row v-for="item in courseList" :key="item.id" style="margin: 20px 0">
            <el-col :span="16" :offset="4">
                <el-card>
                    <div>
                        <img :src="item.course_img" alt="" class="course-img">
                    </div>
                    <h1>{{item.name}}</h1>
                    <h2>{{item.price}}</h2>
                </el-card>
            </el-col>
        </el-row>
        </div>
    </div>


</template>

<script>
    export default {
        name: "course",
        data() {
            return {
                loading: true,  // 课程列表页面的加载动画
                currentOrdering: '',   // 默认的排序参数
                categoryList: [],  // 课程分类列表
                filterList: [
                    {"id": 0, "name": "默认", "hide": false, ordering: ''},
                    {"id": 1, "name": "人气", "hide": false, ordering: '-learn_number'},
                    {"id": 2, "name": "价格", "hide": false, ordering: 'price'},
                ],
                currentCategory: 0,  // 默认选中 全部
                currentFilter: 0,  // 默认选中 默认
                courseList: [],  // 课程列表
            }
        },
        methods: {
            clickFilter(id, ordering) {
                this.currentFilter = id;
                // 1. 先判断一下当前的排序条件是不是 -price或price
                if (this.currentOrdering.endsWith('price')) {
                    // 如果满足上面的条件
                    //     原来是  price  --> -price
                    if (this.currentOrdering === 'price'){
                        this.currentOrdering = '-price'
                    }else {
                        this.currentOrdering = 'price'
                    }
                    //     原本始 -price  --> price
                    // 不满足上面的条件，就直接赋值了
                }else {
                    this.currentOrdering = ordering;
                }




                this.getCourseList()
            },
            getCategoryList(){
                // 1. 发请求到后端请求数据
            this.$axios.get('/course_sub/category/list/')
                .then((res) => {
                    // console.log(res)
                    if (res.data.error_no === 0) {
                        // 请求数据成功
                        // console.log(res.data.data)
                        // 2. 把数据赋值给组件的数据属性
                        // console.log(this);
                        this.categoryList = res.data.data;
                        // 3. 在前面加一个全部的默认选项
                        let obj = {
                            id: 0,
                            name: '全部',
                            category: 0,
                            hide: false
                        };
                        this.categoryList.unshift(obj)
                    }
                })
            },
            getCourseList(){
                this.$axios.get(`/courses/?sub_category=${this.currentCategory}&ordering=${this.currentOrdering}`)
                    .then((res)=>{
                        console.log(res);
                        if (res.data.error_no === 0){
                            this.courseList = res.data.data;
                            // 去掉加载动画
                            this.loading = false
                        }
                    })
            },
            clickCategoty(id){
                console.log('要请求的章节是', id);
                this.currentCategory = id;
                // 重新请求一下 课程列表
                this.getCourseList()
            }
        },
        created() {
            console.log(this);
            this.getCategoryList();
            this.getCourseList()

        }
    }
</script>

<style scoped>
    .line {
        height: 1px;
        background-color: #eee;
        margin: 10px 0;
    }

    .category-title,
    .filter-title {
        line-height: 40px;
    }

    .course-img {
        width: 423px;
        height: 210px;
        float: left;
    }
</style>