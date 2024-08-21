/**
 * 整个项目api的统一管理
 */
import request from "./request.js";

//请求首页左侧的表格的数据

export default {
    getTableData(){
        return request({
            // url: "/home/getTable",
            url: "/home/getTableData",
            // url: "http://127.0.0.1:4523/m1/4936369-4593829-default/api/home/getTable",
            method:"get",
            // mock: true,
        })
    },
    getCountData(){
        return request({
            url: "/home/getCountData",
            method:"get",
        })
    },
    getChartData(){
        return request({
            url: "/home/getChartData",
            method:"get",
        })
    },
    getUserData(data){
        return request({
            url: "/home/getUserData",
            method:"get",
            data,
        })
    },
    deleteUser(data){
        return request({
            url: "/user/deleteUser",
            method:"get",
            data:data,
        })
    },
    addUser(data){
        return request({
            url: "/user/addUser",
            method:"post",
            data,
        })
    },
    editUser(data){
        return request({
            url: "/user/editUser",
            method:"post",
            data,
        })
    },
    getMenu(params){
        return request({
            url: "/permission/getMenu",
            method:"post",
            data:params
        })
    },
//商品
    getMallData(data){
        return request({
            url: "/home/getMallData",
            method:"get",
            data,
        })
    },
    deleteMall(data){
        return request({
            url: "/mall/deleteMall",
            method:"get",
            data:data,
        })
    },
    addMall(data){
        return request({
            url: "/mall/addMall",
            method:"post",
            data,
        })
    },
    editMall(data){
        return request({
            url: "/mall/editMall",
            method:"post",
            data,
        })
    },
}