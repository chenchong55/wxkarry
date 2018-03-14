const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
var qqmapsdk

Page({
  formSubmit: function(e) {
   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  data: {
    imgUrl:[
      '../../assets/icons/location/where.png'
    ],
    wd:'',
    jd:''
  },
  Location_where(){
    // wx.request(){
    //   header: {
    //       'content-type': 'get'
    //   },
    //   url: `http://apis.map.qq.com/ws/direction/v1/driving/?from=${wd+","+jd}`,
    // }
  },

  onLoad () {
    var that = this
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'NU6BZ-GBTH6-GZLSW-MSY6G-457DS-2JFGV' // 必填
    })
    qqmapsdk.getSuggestion({
      
    }),
    wx.getLocation({
      type: 'wgs84',

      success:(res) => {
        console.log(res);
        var latitude_1= res.latitude
        var longitude_1= res.longitude
        qqmapsdk.reverseGeocoder({
        location: {
          latitude: latitude_1,
          longitude: longitude_1
        },
        success: function (addressRes) {
         var address = addressRes.result.formatted_addresses.recommend;
         console.log(address);

          that.setData({
            address,
            wd:latitude_1,
            jd:longitude_1
          })
        }
      })
      }
    })
  }
})
