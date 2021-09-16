import { getToken } from '@/common/util'
import { APIHOST as apiRoot } from './config'

function uniGet (url, cb = null) {
    const token = getToken()
    return uni.request({
        method: 'GET',
        url: `${apiRoot}${url}`,
        header: {
            'X-Access-Token': token
        },
        success: (res) => {
            console.log('uni-get-url', url)
            console.log('uni-get-result', res.data)
            if(res.data.code == 'E401') {
                uni.hideLoading()
                uni.reLaunch({
                    url: '/pages/home/index'
                })
                return
            }
            cb && cb(res)
        },
        error: (res) => {
            console.log('uni-get-error', res)
        }
    })
}

function uniGetPromise (url) {
    const token = getToken()
    return uni.request({
        method: 'GET',
        url: `${apiRoot}${url}`,
        header: {
            'X-Access-Token': token
        }
    })
}

function uniPost (url, data = {}, cb = null) {
    const token = getToken()
    return uni.request({
        method: 'POST',
        url: `${apiRoot}${url}`,
        data: data,
        header: {
            'X-Access-Token': token
        },
        success: (res) => {
            console.log('uni-post-url', url)
            console.log('uni-post-result', res.data)
            cb && cb(res)
        },
        error: (res) => {
            console.log('uni-post-error', res)
        }
    })
}

export const getShopList = (cb) => {
    uniGet(`/customer/shop/list?pageNo=1&pageSize=100`, cb)
}

export const couponMy = (status, cb) => {
    uniGet(`/customer/coupon/customer/my?pageNo=1&pageSize=10&status=${status}`, cb)
}

export const couponStatus = (code, cb) => {
    uniGet(`/customer/coupon/customer/status/${code}`, cb)
}

export const shopDetail = (shopId, cb) => {
    uniGet(`/customer/coupon/customer/shop-detail/${shopId}`, cb)
}

export const douyinAppletsLogin = (data, cb) => {
    data.avatar = data.avatar || ''
    data.nickname = data.nickname || ''
    uniGet(`/customer/login/douyinAppletsLogin?anonymousCode=${data.anonymousCode}&code=${data.code}&avatar=${encodeURIComponent(data.avatar)}&nickname=${encodeURIComponent(data.nickname)}`, cb)
}

export const couponStatusCount = async () => {
    const status = {
        all: 0,
        status0: 0,
        status1: 0,
        status2: 0
    }

    const arrStatus = [0, 1, 2]
    const promises = []
    arrStatus.map(item=> {
        promises.push(new Promise(reslove=> {
            uniGetPromise(`/customer/coupon/customer/my?pageNo=1&pageSize=1&status=${item}`).then(([err, res])=> {
                reslove(res.data.result.total)
            })
        }))
    })
    const arr = await Promise.all(promises)
    status.all = arr.reduce((pre, next) => { return next + pre })
    status.status0 = arr[0]
    status.status1 = arr[1]
    status.status2 = arr[2]
    
    return status
}

export const couponList = (shopId, cb) => {
    uniGet(`/customer/coupon/customer/${shopId}?pageNo=1&pageSize=10`, cb)
}

export const couponDetail = (couponId, cb) => {
    uniGet(`/customer/coupon/customer/coupon-user-detail/${couponId}`, cb)
}

export const couponGet = (data, cb) => {
    uniPost(`/customer/coupon/customer/mini-program`, data, cb)
}

export const useCouponList = (data, cb) => {
    uniPost('/customer/coupon/customer/myCouponList', data, cb)
}

export const useCoupon = (data, cb) => {
    uniPost('/customer/coupon/customer/useCoupon', data, cb)
}