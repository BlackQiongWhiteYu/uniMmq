
import request from "@/utils/request.js";

export const login = (data) => request.post("/user/login", data)

export const reg = (data) => request.post("/user/reg", data)

// 添加api
export const addApiKey = (data) => request.post("/account/addApiKey", data)

// 获取 api列表
export const apiList = (data) => request.post("/account/apiList", data)

// 启动机器人
export const startRobot = () => request.post("/robot/start")

// 停止机器人
export const stopRobot = () => request.post("/robot/stop")

// 获取首页信息
export const homeInfo = () => request.get("/home/info")

