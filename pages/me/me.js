const app = getApp()
const { removeLogin } = app

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
  },
  onTapLogoutButton(){
    removeLogin()
    this.setData({
      czymc:'',
      fwzjc:''
    })

    wx.navigateTo({
          url: '/pages/login/login'
        })

  }

})
