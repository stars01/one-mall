import {request} from "./request"

export function getHomeMullData() {
    return request({
        url: '/home/multidata'
    })
}

export function getHomeGoods(type,page){
    return request({
        url: '/home/data',
        params: {//url后为问号(?)，再跟参数，参数之间 & 隔开。例/home/data?type=pop&page=1
            type,
            page
        }
    })
}