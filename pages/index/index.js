//获取应用实例
const app = getApp()
import mobx, { observer } from "../../libs/mobx/index.js";
import store from './store/home.store';
import regeneratorRuntime from '../../libs/regeneratorRuntime';
Page(observer(
  {
    props: store,
    data: {
    },
    //事件处理函数
    bindViewTap: function (event) {
      let url = event.currentTarget.dataset.url + '';
      url = url.replace('https://juejin.im/post/','');
      url = '../detail/detail?url=' + url;
      wx.navigateTo({
        url
      })
    },
    async onLoad() {
      wx.showLoading({
        title: '数据加载中',
        mask: true
      });

      await this.props.getArticalList();

      wx.hideLoading();
    },
    /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
    onPullDownRefresh: function () {
      this.props.clearAll();
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
      this.props.rankIndex = this.props.lastRankIndex;
    },
  }
))
