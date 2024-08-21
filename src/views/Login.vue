<script setup>
import {getCurrentInstance, reactive} from "vue";
import {useAllDataStore} from "../stores/index.js";
import {useRouter} from "vue-router";

const loginForm = reactive({
  username:'',
  password:''
})
const {proxy} = getCurrentInstance()
const store = useAllDataStore()
const router = useRouter()
const handlelogin = async ()=>{
  const res = await proxy.$api.getMenu(loginForm)
  console.log(res)
  //拿到菜单后在哪里显示
  store.updateMenuList(res.menuList)
  store.state.token = res.token
  store.addMenu(router)
  router.push('/home')

}
</script>

<template>
  <div class="body-login">
    <el-form :model="loginForm" class="login-container">
      <h1>欢迎登录</h1>
      <el-form-item>
        <el-input type="input" placeholder="请输入账号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlelogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="less">
.body-login{
  width: 100vw; // 宽度设置为视口宽度
  height: 100vh; // 高度设置为视口高度
  background-image: url("../assets/images/background.png");
  background-size: cover; // 修改为cover使图片自适应并铺满
  background-position: center; // 可选，使图片居中显示
  overflow: hidden;
  display: flex; // 使用flex布局以便更好地居中内部内容
  justify-content: center; // 水平居中
  align-items: center; // 垂直居中
}
.login-container{
  width: 350px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 15px;
  padding: 35px 35px 15px 35px;
  box-shadow: 0 0 25px #cacaca;
  margin:250px auto;
  h1{
    text-align: center;
    margin-bottom: 20px;
    color: #505450;
  }
  :deep(.el-form-item__content ){
    justify-content: center;
  }
}
</style>