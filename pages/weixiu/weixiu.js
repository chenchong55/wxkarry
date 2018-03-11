const app = getApp()

const API_BASE = 'http://sanbao.karryauto.cn/KarryShouhou/mobile_json/'
const API_ROUTE = 'getWTSListAction.action?fwzh=00000&fch='

Page({
  data: {
    entities: [],
    pageSize:10,
    total: 0,
    totalPages: 0.,
    isLoading: true,

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
          entities,
          total: response.data.data.total,
          totalPages:  Math.floor(response.data.data.total/10)
        })

      }

    })

  }

})
