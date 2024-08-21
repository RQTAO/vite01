import Mock from 'mockjs';
import config from "../../config/index.js";

//get请求从config.url获取参数,post从config.body中获取参数
function param2Obj(url){
    const search = url.split("?")[1]
    if(!search){
        return{}
    }
    return JSON.parse(
        '{"'+
        decodeURIComponent(search)
            .replace(/"/g,'\\"')
            .replace(/&/g,'","')
            .replace(/=/g,'":"')+
        '"}'
    )
}

let List = [];
const count = 100;
for (let i = 0; i < count; i++) {
    List.push(
        Mock.mock({
            id: Mock.Random.guid(),
            bid: Mock.mock('@id()'),
            name: Mock.mock('@pick(["耐克运动鞋","阿迪达斯球鞋", "苹果手机", "索尼摄像头", "三星电视", "华为手表", "耐克短袖衫", "小米耳机", "飞利浦电池", "安吉丽娜短裙", "耐克运动包", "海尔冰箱", "康奈尔保健仪器", "格力空调", "奥地利咖啡壶", "西班牙葡萄酒瓶", "意大利面粉袋", "日本纸巾盒", "法兰克福手表盒", "英国威士忌瓶子", "瑞典浴缸水箱", "德国啤酒啤窝器", "荷兰木屎袋", "美洲豹皮革包", "巴西橡胶鞋盒","耐克运动鞋","阿迪达斯球鞋", "苹果手机", "索尼摄像头", "三星电视", "华为手表", "耐克短袖衫", "小米耳机", "飞利浦电池", "安吉丽娜短裙", "耐克运动包", "海尔冰箱", "康奈尔保健仪器", "格力空调", "奥地利咖啡壶", "西班牙葡萄酒瓶", "意大利面粉袋", "日本纸巾盒", "法兰克福手表盒", "英国威士忌瓶子", "瑞典浴缸水箱", "德国啤酒啤窝器", "荷兰木屎袋", "美洲豹皮革包", "巴西橡胶鞋盒","耐克运动鞋","阿迪达斯球鞋", "苹果手机", "索尼摄像头", "三星电视", "华为手表", "耐克短袖衫", "小米耳机", "飞利浦电池", "安吉丽娜短裙", "耐克运动包", "海尔冰箱", "康奈尔保健仪器", "格力空调", "奥地利咖啡壶", "西班牙葡萄酒瓶", "意大利面粉袋", "日本纸巾盒", "法兰克福手表盒", "英国威士忌瓶子", "瑞典浴缸水箱", "德国啤酒啤窝器", "荷兰木屎袋", "美洲豹皮革包", "巴西橡胶鞋盒"])'),
            specs:Mock.Random.integer(0,1), // 随机生成规格
            price: Mock.Random.float(10, 1000, 0, 2), // 随机生成价
            birth:Mock.mock('@datetime("yyyy-MM-dd")'),
            addr:Mock.mock('@county(true)'),
            stock: Mock.Random.integer(0, 1000) // 随机生成库存
        })
    );
}

export default {
    /**
     * 获取商品数据
     * @param config 包含查询参数的URL
     * @return {Object} 模拟的响应
     */
    getMallList: (config) => {
        const { name, page = 1, limit = 10 } = param2Obj(config.url);
        const mockList = List.filter(mall => {
            if (name && mall.name.indexOf(name) === -1) return false;
            return true;
        });
        const pageList = mockList.filter(
            (item,index) =>index<limit*page&&index>=limit*(page-1))
        return {
            code: 200,
            data: {
                list: pageList,
                count: mockList.length
            }
        };
    },

    // 注意：通常删除操作不会通过GET方法发送，这里仅为了演示
    deleteMall: (config) => {
        const { id } = param2Obj(config.url);
        if (!id) {
            return { code: -999, message: "参数不正确" };
        } else {
            List = List.filter(p => p.id !== id);
            return { code: 200, message: "删除成功" };
        }
    },

    // 添加和编辑商品通常使用POST或PUT方法
    // 这里我保留你的原始实现，但请注意实际开发中可能需要调整
    createMall: config => {
        // 假设config.body是JSON格式的字符串
        const { xid,bid, name, specs, price, stock ,addr,birth } = JSON.parse(config.body);
        List.unshift({
            id: Mock.Random.guid(),
            bid:bid,
            name:name,
            specs:specs,
            price:price,
            stock:stock,
            addr:addr,
            birth:birth,
        });
        return { code: 200, data: { message: '添加成功' } };
    },

    updateMall: config => {
        // 同上，解析body并更新列表
        const { bid,id, name, specs, price, stock,addr,birth } = JSON.parse(config.body);
        List.some(m => {
            if (m.id === id) {
                m.bid =bid;
                m.name = name;
                m.specs = specs;
                m.price = price;
                m.stock = stock;
                m.addr =addr;
                m.birth =birth;
                return true;
            }
        });
        return { code: 200, data: { message: '编辑成功' } };

    }
}