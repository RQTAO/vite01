const env = import.meta.env.MODE || "prod";
const EnvConfig = {
    development: {
        baseApi: "/api",
        // mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
        mockApi: "http://127.0.0.1:4523/m1/4936369-4593829-default/api",
    },
    test: {
        baseApi: "//test.future.com/api",
        // mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
        mockApi: "http://127.0.0.1:4523/m1/4936369-4593829-default/api",
    },
    prod:{
        baseApi: "//future.com/api",
        // mockApi: "https://apifoxmock.com/m1/4068509-0-default/api",
        mockApi: "http://127.0.0.1:4523/m1/4936369-4593829-default/apis",
    }
};

export default {
    env,
    ...EnvConfig[env],
    //mock线上状态:关
    mock: false,
}