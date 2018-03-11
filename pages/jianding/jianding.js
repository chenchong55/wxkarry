const app = getApp()

const API_BASE = 'http://sanbao.karryauto.cn/KarryShouhou/mobile_json/'
const API_ROUTE = 'getAppraiseListAction.action?fwzh=00000&fch='

Page({
  data: {
  },
  onLoad () {
    wx.request({
      header: {
          'content-type': 'application/json'
      },
      url: `${ API_BASE }/${ API_ROUTE }`,
      success: (response) => {
        console.log(response);
        const entities = response.data.data
        this.setData({
          entities
        })
      }
    })
  }
})
