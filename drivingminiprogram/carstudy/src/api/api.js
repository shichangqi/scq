import {request,request1} from './request'
import {formatGetUri} from '../utils/index'

const hostName = 'https://h5.xingjiadao.cn' 
const hostName1 = 'http://120.79.113.109:81' 
export const phoneUrl = hostName+'/miniapp/getPhone';
export const uploadimg = hostName1+'/upload/image';

/**
 * 获取授权openid
 * @param {*} data 
 */
export const getopenid = data => request.get(hostName+'/miniapp/coachLogin', formatGetUri(data))

/**
 * 获取授权手机号openid
 * @param {*} data 
 */
export const getphone = data => request.post(hostName+'/miniapp/getPhone', data)


/**
 * 获取教练详情
 * @param {*} data 
 */
export const coachdetail = data => request1.post(hostName1+'/coach/show',data)


/**
 * 获取教练首页信息
 * @param {*} data 
 */
export const coachindex = data => request1.post(hostName1+'/coach/index',data)


/**
 * 获取教练设备
 * @param {*} data 
 */
export const coachEquipments = data => request1.post(hostName1+'/coach/equipments',data)


/**
 * 身份认证提交
 * @param {*} data 
 */
export const coachAuth = data => request1.post(hostName1+'/coach/auth',data)



/**
 * 获取未支付账单
 * @param {*} data 
 */
export const coachUnpay = data => request1.post(hostName1+'/coach/unpay',data)


/**
 * 获取账户
 * @param {*} data 
 */
export const coachAccount = data => request1.post(hostName1+'/account/show',data)


/**
 * 账户提现
 * @param {*} data 
 */
export const coachWithdraw = data => request1.post(hostName1+'/account/withdraw',data)


/**
 * 支付宝绑定
 * @param {*} data 
 */
export const coachBindAccount = data => request1.post(hostName1+'/account/bind',data)


/**
 * 获取城市
 * @param {*} data 
 */
export const cityList = data => request1.post(hostName1+'/city/lists',data)


/**
 * 获取未支付账单明细
 * @param {*} data 
 */
export const unpayList = data => request1.post(hostName1+'/coach/unpayList',data)


/**
 * 获取练车记录
 * @param {*} data 
 */
export const coachorder = data => request1.post(hostName1+'/coach/order',data)

/**
 * 获取订单详情
 * @param {*} data 
 */
export const coachorderdetail = data => request1.post(hostName1+'/order/show',data)
