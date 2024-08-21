import {createRouterMatcher as Promise} from "vue-router";

export default {
    getTableData: () =>{
        return{
            "code":200,
            "data":{
                "tableData":[
                    {
                        "name":"oppo",
                        "todayBuy":500,
                        "monthBuy":3500,
                        "totalBuy":22000
                    },
                    {
                        "name":"vivo",
                        "todayBuy":300,
                        "monthBuy":2200,
                        "totalBuy":24000
                    },
                    {
                        "name":"苹果",
                        "todayBuy":100,
                        "monthBuy":200,
                        "totalBuy":300
                    },
                    {
                        "name":"小米",
                        "todayBuy":1200,
                        "monthBuy":6500,
                        "totalBuy":45000
                    },
                    {
                        "name":"三星",
                        "todayBuy":300,
                        "monthBuy":2000,
                        "totalBuy":34000
                    },
                    {
                        "name":"魅族",
                        "todayBuy":350,
                        "monthBuy":3000,
                        "totalBuy":22000
                    }
                ]
            }
        }
    },
    getCountData() {
        return {
            code:200,
            data: {
                countData:[
                    {
                        name:"今日支付订单",
                        value:1234,
                        icon:"SuccessFilled",
                        color:"#2ec7c9"
                    },
                    {
                        name:"今日收藏订单",
                        value:210,
                        icon:"StarFilled",
                        color:"#ffb980"
                    },
                    {
                        name:"今日未支付订单",
                        value:1234,
                        icon:"GoodsFilled",
                        color:"#5ab1ef"
                    },
                    {
                        name:"本月支付订单",
                        value:1234,
                        icon:"SuccessFilled",
                        color:"#2ec7c9"
                    },
                    {
                        name:"本月收藏订单",
                        value:210,
                        icon:"StarFilled",
                        color:"#ffb980"
                    },
                    {
                        name:"本月未支付订单",
                        value:1234,
                        icon:"GoodsFilled",
                        color:"#5ab1ef"
                    }
                ]
            }
        }
    },
    getChartData: () => {
        return{
            code:200,
            data:{
                orderData:{
                    date:[
                        "2019-10-01",
                        "2019-10-02",
                        "2019-10-03",
                        "2019-10-04",
                        "2019-10-05",
                        "2019-10-06",
                        "2019-10-07"
                    ],
                    data:[
                        {
                            苹果: 3829,
                            小米: 1423,
                            华为: 4965,
                            oppo: 3334,
                            vivo: 2820,
                            一加:4751
                        },
                        {
                            苹果: 3560,
                            小米: 2099,
                            华为: 3192,
                            oppo: 4210,
                            vivo: 1288,
                            一加:1613
                        },
                        {
                            苹果: 1866,
                            小米: 4578,
                            华为: 4553,
                            oppo: 4253,
                            vivo: 4588,
                            一加:4750
                        },
                        {
                            苹果: 4333,
                            小米: 2244,
                            华为: 3255,
                            oppo: 3633,
                            vivo: 2533,
                            一加:1733
                        },
                        {
                            苹果: 2029,
                            小米: 3253,
                            华为: 2595,
                            oppo: 3585,
                            vivo: 3566,
                            一加:1712
                        },
                        {
                            苹果: 2055,
                            小米: 3990,
                            华为: 2865,
                            oppo: 3784,
                            vivo: 1850,
                            一加:2293
                        },
                        {
                            苹果: 2829,
                            小米: 3923,
                            华为: 3665,
                            oppo: 4434,
                            vivo: 3320,
                            一加:3800
                        },
                    ]
                },
                videoData:[
                    {name:"小米",value:2999},
                    {name: "苹果",value:5999},
                    {name: "vivo",value:1499},
                    {name: "oppo",value:1999},
                    {name: "魅族",value:2199},
                    {name: "三星",value:4499},
                ],
                userData: [
                    {date: "周一",new:5,active:200},
                    {date: "周二",new:10,active:500},
                    {date: "周三",new:12,active:550},
                    {date: "周四",new:60,active:800},
                    {date: "周五",new:65,active:550},
                    {date: "周六",new:53,active:770},
                    {date: "周天",new:33,active:170},
                ]
            }
        }
    }
}