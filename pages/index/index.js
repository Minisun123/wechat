//获取应用实例
const app = getApp()
import mobx, { observer } from "../../libs/mobx/index.js";
import store from './store/home.store';
import regeneratorRuntime from '../../libs/regeneratorRuntime';
Page(observer(
  {
    props: store,
    data: {
      motto: 'Hello World',
      userInfo: {},
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
    },
    //事件处理函数
    bindViewTap: function () {
      wx.navigateTo({
        url: '../logs/logs'
      })
    },
    async onLoad() {
      await this.props.getList();
    }
  }
))
