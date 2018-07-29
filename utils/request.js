/** 
 * {boolean} connectUrl 是否需要拼接配置好的url域名前缀
 * 
*/

import { prod, dev, env } from '../configs/env.config';
import regeneratorRuntime from '../libs/regeneratorRuntime';

//获取验证信息
let OATH_CONF_ENV = dev;
//生产环境的 oath 配置
if (env === 'prod') {
  OATH_CONF_ENV = prod;
}

//默认的参数
const defaultArgs = {
  timeout: 8000
};
//开始一个request
const Request = async (args, codes) => {

  //headers 增加slug
  args.headers = {
    ...args.headers,
    'Content-Type': 'application/json;charset=utf-8'
  };

  //默认method
  args.method = (args.method || 'GET').toLocaleUpperCase();
  //请求url
  args.url = args.connectUrl !== false ? OATH_CONF_ENV.url + args.url : args.url;
  //合并默认参数和业务参数
  const opts = { ...defaultArgs, ...args };

  opts['data'] = args.method == 'POST' ? JSON.stringify(opts.params) : opts.params;
  delete opts['params'];

  //如果业务层需要getALl 此时 删除调请求的 getall
  if (opts['getAll']) {
    delete opts['getAll'];
  }

  //返回一个promise 用来 await调用
  return new Promise((resolve, reject) => {
    //发起请求
    wx.request({
      ...opts,
      success: function (res) {
        resolve(res);
      },
      fail: function (res) {
        wx.showToast({
          title: '网络繁忙，请稍后再试',
          icon: 'loading',
          duration: 2000
        })
        reject(res);
      },
      complete: function (res) {
        opts.complete && opts.complete(res);
      }
    });
  });

};

export default Request;