const app = getApp()

Page({
  formSubmit: function(e) {
   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  data: {
  },
  onLoad () {
  }
})
