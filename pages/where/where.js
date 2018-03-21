const app = getApp()

const API_BASE = 'http://sanbao.karryauto.cn/KarryShouhou/mobile_json/'
const API_ROUTE = 'getRescueListAction.action'

Page({
  data: {
    entities: [],
    isLoading: true,
    hidden: true
  },
  wxSearchFn: function(e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
  },

  onLoad() {
    this.setData({
      hidden: !this.data.hidden
    });
    wx.request({
      header: {
        'content-type': 'application/json'
      },
      url: `${ API_BASE }/${ API_ROUTE }`,
      data: {
        fwzh: getApp().globalData.fwzh,
        fch: getApp().globalData.fch
      },
      success: (response) => {
        console.log(response);
        const entities = response.data.data
        this.setData({
          entities,
          hidden: true
        })
      }
    })
  }
})
