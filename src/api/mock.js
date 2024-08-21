import Mock from "mockjs";
import homeApi from "./mockData/home.js";
//拦截的路径，方法，制造出假数据
import userApi from "./mockData/user.js";
import mallApi from "./mockData/mall.js";
import menuApi from "./mockData/permission.js";
Mock.mock(/api\/home\/getTableData/,"get", homeApi.getTableData());
Mock.mock(/api\/home\/getCountData/,"get", homeApi.getCountData());
Mock.mock(/api\/home\/getChartData/,"get", homeApi.getChartData());

Mock.mock(/api\/home\/getUserData/,"get", userApi.getUserList);
Mock.mock(/api\/user\/deleteUser/,"get", userApi.deleteUser);
Mock.mock(/api\/user\/addUser/,"post", userApi.createUser);
Mock.mock(/api\/user\/editUser/,"post", userApi.updateUser);

Mock.mock(/api\/home\/getMallData/,"get", mallApi.getMallList);
Mock.mock(/api\/mall\/deleteMall/,"get", mallApi.deleteMall);
Mock.mock(/api\/mall\/addMall/,"post", mallApi.createMall);
Mock.mock(/api\/mall\/editMall/,"post", mallApi.updateMall);

Mock.mock(/api\/permission\/getMenu/,"post", menuApi.getMenu);