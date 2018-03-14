const app = getApp()

Page({
  data: {

  },
  onShow (options) {

    var czymc = app.globalData.czymc
    var fwzjc = app.globalData.fwzjc
    this.setData({
      czymc,
      fwzjc
    })

  }
})
