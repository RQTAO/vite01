<script setup>
import {ref,getCurrentInstance,onMounted,reactive} from "vue";
import axios from 'axios';
import * as echarts from 'echarts'
const {proxy} =getCurrentInstance()
const getImageUrl =(user)=>{
  return new URL(`../assets/images/${user}.png`, import.meta.url).href;
};
const tableData = ref([
  // {
  //   name:"Java",
  //   todayBuy:100,
  //   monthBuy:200,
  //   totalBuy:300,
  // },
  // {
  //   name:"Python",
  //   todayBuy:100,
  //   monthBuy:200,
  //   totalBuy:300,
  // }
])
const countData = ref([])
const chartData = ref([])
const observer = ref(null)
const tableLabel = ref({
  name:"产品",
  todayBuy:"今日购买",
  monthBuy:"本月购买",
  totalBuy:"总购买",
})
//这是折线图和柱状图 两个图表共用的公共配置
const xOptions =reactive({
  //图例文字颜色
  textStyle:{
    color:"#333",
  },
  legend: {},
  grid:{
    left:"20%",
  },
  //提示框
  tooltip:{
    trigger:"axis",
  },
  xAxis:{
    type:"category",//类目轴
    data: [],
    axisLine:{
      lineStyle:{
        color:"#17b3a3"
      },
    },
    axisLabel:{
      interval: 0,
      color:"#333",
    },
  },
  yAxis:[
    {
      type:'value',
      axisLine:{
        lineStyle:{
          color:"#17b3a3"
        },
      },
    },
  ],
  color: ["#2ec7c9","#b6a2de","#5ab1ef","#ffb980","#d87a80","#8d98b3"],
  series: [],
})
//这是饼状图
const pieOptions = reactive({
  tooltip:{
    trigger:"item",
  },
  legend:{},
  color:[
      "#0f78f4",
      "#dd536b",
      "#9462e5",
      "#a6a6a6",
      "#e1bb22",
      "#39c362",
      "#3ed1cf",
  ],
  series: []
})


const getTableData =async ()=>{
  const data = await proxy.$api.getTableData();
  tableData.value = data.tableData
}
const getCountData =async ()=>{
  const data = await proxy.$api.getCountData();
  countData.value = data.countData
  // console.log(data);
}
const getChartData =async ()=>{
  const {orderData,videoData,userData} = await proxy.$api.getChartData()
  //对第一个图标进行x轴和series 赋值
  xOptions.xAxis.data =orderData.date;
  xOptions.series = Object.keys(orderData.data[0]).map(val=>({
    name:val,
    data:orderData.data.map(item=>item[val]),
    type:'line',
  }))
  const oneEchart = echarts.init(proxy.$refs['chart'])
  oneEchart.setOption(xOptions)

  //对第二个表格渲染

  xOptions.xAxis.data =userData.map(item=>item.date)
  xOptions.series = [
    {
      name:'新增用户',
      data:userData.map(item=>item.new),
      type:'bar',
    },
    {
      name:'活跃用户',
      data:userData.map(item=>item.active),
      type:'bar',
    },
  ]
  const twoEchart = echarts.init(proxy.$refs['userEchart'])
  twoEchart.setOption(xOptions)

  //对第三个表格渲染
  pieOptions.series = [
    {
      data: videoData,
      type: 'pie'
    }
  ]
  const threeEchart = echarts.init(proxy.$refs['videoEchart'])
  threeEchart.setOption(pieOptions)

  //监听页面的变化
  //如果监听的容器大小发生了变化 改变了以后 会执行回调函数
  observer.value =new ResizeObserver(()=>{
    oneEchart.resize()
    twoEchart.resize()
    threeEchart.resize()
  })

  //容器存在
  if(proxy.$refs['chart']){
    observer.value.observe(proxy.$refs['chart'])
  }

}

onMounted(()=>{
  getTableData()
  getCountData()
  getChartData()
})

// axios({
//   url:'/api/home/getTableData',
//   method:'get'
// }).then(res=>{
//   //制造假数据，把交互请求的流程，根据接口文档跑通 还要制造出数据
//   //工具，拦截住请求，把我们制造的数据 根据接口文档制造出
//   if (res.data.code === 200){
//     console.log(res.data.data.tableData)
//     tableData.value = res.data.data.tableData
//   }
// })
</script>

<template>
    <div class="scrollable-container">
      <el-row class="home" :gutter="20">
        <el-col :span="8" style="margin-top: 10px ">
          <el-card shadow="hover" style="border-radius: 20px">
            <div class="user">
              <img :src="getImageUrl('user') " class="user" alt="用户头像"/>
              <div class="user-info">
                <p class="user-info-admin">Admin</p>
                <p class="user-info-p">超级管理员</p>
              </div>
            </div>
            <div class="login-info">
              <p>上次登录时间：<span>2024-7-30</span></p>
              <p>上次登录地点：<span>厦门</span></p>
            </div>
          </el-card>

          <el-card shadow="hover" class="user-table" style="border-radius: 20px">
            <el-table :data="tableData">
              <el-table-column
                  v-for="(val,key) in tableLabel"
                  :key="key"
                  :prop="key"
                  :label="val"
              >
              </el-table-column>
            </el-table>
          </el-card>
        </el-col>
        <el-col :span="16" style="margin-top: 10px ">
          <div class="num" >
            <el-card
                :body-style="{display:'flex',padding:0}"
                v-for="item in countData"
                :key="item.name"
                style="border-radius: 8px"
                shadow="hover"
            >
              <component
                  :is="item.icon"
                  class="icons"
                  :style="{
                    background: item.color,
                }"
              >
              </component>
              <div class="detail">
                <p class="num">￥{{item.value}}</p>
                <p class="txt">￥{{item.name}}</p>
              </div>
            </el-card>
          </div>
          <el-card class="top-chart" shadow="hover" >
            <div ref="chart" style="height: 280px"></div>
          </el-card>
          <div class="graph" style="border-radius: 8px" >
            <el-card shadow="hover" >
              <div ref="userEchart" style="height: 240px"></div>
            </el-card>
            <el-card shadow="hover" >
              <div ref="videoEchart" style="height: 240px"></div>/
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
</template>

<style scoped lang="less">
//.scrollable-container {
//  height: 100vh; /* 设置为视口高度 */
//  overflow-y: auto; /* 允许垂直滚动 */
//}
.home{
    height: 100%;
    overflow: hidden;
    border-radius: 50px;
  }
  .user{
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
    img{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .user-info{
      p{
        line-height: 40px;
      }
      .user-info-p{
        color: #999999;
      }
      .user-info-admin{
        font-size: 40px;
      }
    }
  }
  .login-info{
    p{
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span{
        color: #666;
        margin-left: 60px;
      }
    }
  }
  .user-table{
    margin-top: 20px;
  }
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
      width: 32%;
      margin-bottom: 20px;
    }
    .icons{
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: #ffffff;
    }
    .detail{
      margin-left:15px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .num{
        font-size: 30px;
        margin-bottom: 10px;
      }
      .txt{
        font-size: 15px;
        text-align: center;
        color: #999999;
      }
    }
  }
  .graph{
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .el-card{
      width: 48%;
      height: 260px;
    }
  }
</style>
