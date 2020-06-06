import {request} from "./request"

export function getHomeMullData() {
    return request({
        url: '/home/multidata'
    })
}