const API_BASE = 'http://sanbao.karryauto.cn/KarryShouhou/mobile_json/'
const API_ROUTE = 'getRescueInfoAction.action'

const app = getApp()
Page({
  data:{
    title:'',
    fwzh:'',
    jyxcImg: null
  },
  onLoad(options){

    // const id = options.id
    const fwzh = app.globalData.fwzh
    const sqdh = options.sqdh


    wx.request({
      url:`${ API_BASE }/${ API_ROUTE }?fwzh=${ fwzh }&sqdh=${ sqdh }`,
      success:(response) => {
        console.log(response);
        const entity = response.data.data
        const jyxcImg = entity.jyxcImg
        const title = entity.sqdh

        this.setData({
          title,
          fwzh:getApp().globalData.fwzh,
          jyxcImg
        })

        wx.setNavigationBarTitle({
          title:"申请单号："+sqdh
        })
      }
    })

  }
})
