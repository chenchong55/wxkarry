const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js')
var qqmapsdk
var timer

Page({
  formSubmit: function(e) {
   console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  data: {
    imgUrl:[
      '../../assets/icons/location/where.png'
    ],
    wd:'',
    jd:'',
    address:'',
    addressList:[]
  },
  Location_where(){
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function(res) {
        var latitude = res.latitude
        var longitude = res.longitude
        wx.openLocation({
          latitude: latitude,
          longitude: longitude,
         scale: 28
    })
  }
})
},
bindKeyInput:(e) => {
  console.log(e);
  var that = this
  qqmapsdk = new QQMapWX({
    key: 'NU6BZ-GBTH6-GZLSW-MSY6G-457DS-2JFGV' // 必填
  }),
  qqmapsdk.getSuggestion({
    keyword: e.detail.value,
    success: (res) =>{
        let addressList = res.data
        this.setData({
            addressList:res.data
        });

    },
    fail: function (res) {
        console.log(res);
    },
    complete: function (res) {
      console.log(res);
    }
  })
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
            address: address,
            wd:latitude_1,
            jd:longitude_1
          })
        }
      })
      }
    })
    // Countdown()



  }
});

// 计时器函数
// function Countdown() {
// timer = setTimeout(function () {
//   console.log("----Countdown----");
//   Countdown();
// }, 1000*10);
// };
