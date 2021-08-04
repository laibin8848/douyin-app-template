import { getToken } from '@/common/util'
const apiRoot = 'https://kedoulai.gdii-yueyun.com/'
//http://10.16.153.243:31023/
//https://kedoulai.gdii-yueyun.com/

export const couponMy = (status, cb) => {
    const token = getToken()
    return uni.request({
        method: 'GET',
        url: `${apiRoot}customer/coupon/customer/my?pageNo=1&pageSize=10&status=${status}`,
        header: {
            'X-Access-Token': token
        },
        success: (res) => {
            cb(res)
        }
    })
}

export const couponStatus = (code, cb) => {
    const token = getToken()
    return uni.request({
        method: 'GET',
        url: `${apiRoot}customer/coupon/customer/status/${code}`,
        header: {
            'X-Access-Token': token
        },
        success: (res) => {
            cb(res)
        }
    })
}

export const shopDetail = (shopId, cb) => {
    const token = getToken()
    return uni.request({
        method: 'GET',
        url: `${apiRoot}customer/coupon/customer/shop-detail/${shopId}`,
        header: {
            'X-Access-Token': token
        },
        success: (res) => {
            cb(res)
        }
    })
}

export const douyinAppletsLogin = (data, cb) => {
    uni.request({
        method: 'GET',
        url: `${apiRoot}customer/login/douyinAppletsLogin?anonymousCode=${data.anonymousCode}&code=${data.code}`,
        success: (res) => {
            cb(res)
        }
    })
}

export const couponStatusCount = async () => {
    const token = getToken()

    const status = {
        all: 0,
        status0: 0,
        status1: 0,
        status2: 0
    }

    const [error, res] = await uni.request({
        method: 'GET',
        url: `${apiRoot}customer/coupon/customer/my?pageNo=1&pageSize=1&status=0`,
        header: {
            'X-Access-Token': token
        }
    })
    status.status0 = res.data.result.total

    const [error1, res1] = await uni.request({
        method: 'GET',
        url: `${apiRoot}customer/coupon/customer/my?pageNo=1&pageSize=1&status=1`,
        header: {
            'X-Access-Token': token
        }
    })
    status.status1 = res1.data.result.total

    const [error2, res2] = await uni.request({
        method: 'GET',
        url: `${apiRoot}customer/coupon/customer/my?pageNo=1&pageSize=1&status=2`,
        header: {
            'X-Access-Token': token
        }
    })
    status.status2 = res2.data.result.total

    status.all = status.status0 + status.status1 + status.status2
    return status
}

export const couponList = (shopId, cb) => {
    const token = getToken()
    uni.request({
        method: 'GET',
        url: `${apiRoot}customer/coupon/customer/${shopId}?pageNo=1&pageSize=10`,
        header: {
            'X-Access-Token': token
        },
        success: (res) => {
            cb(res)
        }
    })
}

export const couponDetail = (couponId, cb) => {
    const token = getToken()
    uni.request({
        method: 'GET',
        url: `${apiRoot}customer/coupon/customer/coupon-user-detail/${couponId}`,
        header: {
            'X-Access-Token': token
        },
        success: (res) => {
            cb(res)
        }
    })
}

export const couponGet = (data, cb) => {
    const token = getToken()
    uni.request({
        method: 'POST',
        url: `${apiRoot}customer/coupon/customer/mini-program`,
        header: {
            'X-Access-Token': token
        },
        data: data,
        success: (res) => {
            cb(res)
        }
    })
}