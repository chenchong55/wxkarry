const app = getApp()

Page({
  data: {
  },
  onLoad (options) {
    console.log(options);
    const cyzmc_ = app.globalData.czymc
    this.setData({
      czymc
    })

  }
})
