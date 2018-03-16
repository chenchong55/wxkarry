const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
var Base64 = require('../../libs/base64.modified')
var bmap = require('../../libs/bmap-wx.min.js')
var qqmapsdk
var timer
var that

const API_BASE = 'http://localhost:8080/KarryShouhou/mobile_json/'
const API_ROUTE = 'uploadImageAction.action'

Page({
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  data: {
    imgUrl: [
      '../../assets/icons/location/where2.png'
    ],
    wd: '',
    jd: '',
    address: '',
    city: '',
    sugData: '',
    sugList: '',
    inputValue: '',
    images: [],
    addressList: []
  },
  Location_where() {
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
  // 目的地
  bindKeyInput: function(e) {
    var that = this
      // qqmapsdk = new QQMapWX({
      //   key: 'NU6BZ-GBTH6-GZLSW-MSY6G-457DS-2JFGV' // 必填
      // })
      // qqmapsdk.getSuggestion({
      //   keyword: e.detail.value,
      //   region: that.data.city,
      //   success: function(res) {
      //     console.log(res.data);
      //     that.setData({
      //       addressList: res.data
      //     })
      //   }
      // })

    // 新建百度地图对象
    var BMap = new bmap.BMapWX({
      ak: 'h3D8BGfHNQ3DszKD4ASZKnCuW7P03isK'
    });
    var fail = function(data) {
      console.log(data)
    };
    var success = function(data) {
        var sugData = '';
        var arrs = [];
        that.setData({
          sugList: data.result
        })
      } // 发起suggestion检索请求
    BMap.suggestion({
      query: e.detail.value,
      region: '绍兴',
      city_limit: true,
      fail: fail,
      success: success
    });
  },
  where_nr: function(e) {
    console.log(e);
    this.setData({
      inputValue: e.target.id,
      sugList: []
    })
  },
  onLoad() {
    that = this;
    // 实例化腾讯地图API核心类
    qqmapsdk = new QQMapWX({
      key: 'NU6BZ-GBTH6-GZLSW-MSY6G-457DS-2JFGV' // 必填
    })
    qqmapsdk.getSuggestion({

      }),
      wx.getLocation({
        type: 'wgs84',

        success: (res) => {
          console.log(res);
          var latitude_1 = res.latitude
          var longitude_1 = res.longitude
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: latitude_1,
              longitude: longitude_1
            },
            success: function(addressRes) {
              var address = addressRes.result.formatted_addresses
                .recommend;
              console.log(address);

              that.setData({
                address: address,
                wd: latitude_1,
                jd: longitude_1,
                city: addressRes.result.address_component.city
              })
            }
          })
        }
      })
      // Countdown()
  },

  //增加图片上传文件
  onChooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (response) => {
        const images = response.tempFilePaths

        this.setData({
          images
        })

        images.map((filePath, index) => {
          const upLoadTask = wx.uploadFile({
            url: `${ API_BASE }/${ API_ROUTE }?jycfdImg=` +
              filePath,
            filePath,
            name: 'file',
            success: (response) => {
              console.log(response);
            }
          })

          upLoadTask.onProgressUpdate((response) => {
            const progress = [...this.data.progress]
            progress[index] = response.progress

            this.setData({
              progress
            })
          })
        })

      }
    })
  },

  onPreviewImage(event) {
    wx.previewImage({
      current: event.target.dataset.src,
      urls: this.data.images
    })
  }



});

// 计时器函数
// function Countdown() {
// timer = setTimeout(function () {
//   console.log("----Countdown----");
//   Countdown();
// }, 1000*10);
// };
