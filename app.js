App({
  onLaunch(options) {},
    onShow(options) {},
    onHide() {},
    onError(error) {},
    removeLogin() {
      this.globalData.czymc = ''
      this.globalData.fwzjc = ''
    },
    globalData: {
      fwzh: '00000',
      czymc: '',
      fwzjc: '',
      fch: ''
    }
})
