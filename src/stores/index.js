import { defineStore } from "pinia";
import {ref,watch} from "vue";//watch监听解决路由持久化


function initState(){
    return{
        isCollapse:false,
        tags:[
            {
                path:'/home',
                name:'home',
                label:'首页',
                icon:'home',
            }
        ],
        currentMenu: null,
        menuList:[],//监听
        token:"",
        routerList:[]
    };
}
export const useAllDataStore = defineStore('allData', () => {
    // ref stare属性
    //computed getters
    //function actions

    const state =ref(initState());
    //登陆后页面持久化处理
    watch(state,(newObj)=>{
        if(!newObj.token) return;
        localStorage.setItem("store",JSON.stringify(newObj));
    },
        {deep:true}//存储
    );



    function selectMenu(val){
        if (val.name === "home"){
            state.value.currentMenu = null;
        }else {
            state.value.currentMenu = val;
            let index = state.value.tags.findIndex((items) => items.name === val.name);
            index === -1 ? state.value.tags.push(val) : "";
        }
    }
    function undateTags(tag){
        let index = state.value.tags.findIndex((items) => items.name === tag.name);
        state.value.tags.splice(index, 1);
    }
    function updateMenuList(val){
        state.value.menuList=val
    }

    function addMenu(router,type){
        if (type ==="refresh"){
            if(JSON.parse(localStorage.getItem("store"))){
                state.value = JSON.parse(localStorage.getItem("store"));
                state.value.routerList =[];
            }else {
                return;
            }
        }

        const menu = state.value.menuList;
        const module = import.meta.glob("../views/**/*.vue");
        //定义菜单格式化后的路由数组
        const routeArr = [];
        //格式化菜单路由
        menu.forEach(item => {
            //菜单有children
            if(item.children){
                item.children.forEach((val) => {
                    let url =`../views/${val.url}.vue`;
                    val.component = module[url];
                });
                routeArr.push(...item.children);
            }else {
                let url =`../views/${item.url}.vue`;
                item.component = module[url];
                routeArr.push(item);
            }
        });
        state.value.routerList = []
        // console.log(router.getRoutes());//打印找出多账号路由问题
        let routers =router.getRoutes()
        routers.forEach(item => {
            if(item.name === 'main' || item.name === 'login' || item.name === "404"){
                return
            }else{
                router.removeRoute(item.name);
            }
        })
        routeArr.forEach(item=>{
            state.value.routerList.push(router.addRoute("main",item))
        })
    }
    function clean(){
        state.value.routerList.forEach((item)=>{
            if(item)item();
        })
        state.value = initState();
        //删除本地的缓存
        localStorage.removeItem("store")
        // 重置状态到初始状态
        this.$state = { ...initState() }; // 使用对象展开来复制初始状态对象
        // 重置某些属性，可以这样做：
        // this.routerList = [];
        // this.user = null;
        // ...

        // 清除 localStorage 中的项
        // localStorage.removeItem("someStoreKey"); // 注意：这里通常不会存整个store，而是存具体的数据
        localStorage.removeItem('userToken');

    }



    // 返回给模板的数据和方法
    return {
        state,
        selectMenu,
        undateTags,
        updateMenuList,
        clean,
        addMenu,
    }
})