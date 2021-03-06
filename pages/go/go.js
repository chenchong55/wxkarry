const app = getApp()
var QQMapWX = require('../../libs/qqmap-wx-jssdk.min.js')
var Base64 = require('../../libs/base64.modified')
var bmap = require('../../libs/bmap-wx.min.js')
var qqmapsdk
var timer
var that
var lat
var lng

const API_BASE = 'http://www.oncegit.top/wp-json'
const API_ROUTE = 'wp/v2/media'

Page({
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  data: {
    imgUrl: '../../assets/icons/location/Location.png',
    wcjyPic: 'https://ws3.sinaimg.cn/large/006tKfTcly1fpey1filp9j30b506uaee.jpg',
    wd: '',
    jd: '',
    address: '',
    city: '',
    sugData: '',
    sugList: '',
    inputValue: '',
    images: [],
    addressList: [],
    lat: '',
    lng: '',
    name: ''
  },
  Location_where: function (e) {
    var latitude = this.data.lat
    var longitude = this.data.lng
    var name = this.data.name
    //console.log(name);
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: function (res) {
        wx.openLocation({
          latitude,
          longitude,
          city: name,
          scale: 28
        })
      }
    })
  },
  // 目的地
  bindKeyInput: function (e) {
    console.log(e);
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
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
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
  where_nr: function (e) {

    var lat = e.currentTarget.dataset.lat
    var lng = e.currentTarget.dataset.lng
    var address = e.currentTarget.dataset.address
    this.setData({
      inputValue: e.target.id,
      sugList: [],
      lat,
      lng,
      address
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
            success: function (addressRes) {
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
    var images = this.data.images;
    wx.chooseImage({
      count: 9 - images.length,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (response) => {
        var imagessrc = response.tempFilePaths;
          images = images.concat(imagessrc); // 使用concat方法可以让数组可以在原来的基础上增加内容
        this.setData({
          images
        })

        images.map((filePath, index) => {
          //console.log(this.data.images.length);
          for (var i = 0; i< this.data.images.length;i++) {
            const upLoadTask = wx.uploadFile({
              url: `${API_BASE}/${API_ROUTE}`,
              filePath:filePath[i],
              name: 'file',

              success: (response) => {
                
                this.setData({
                  
                })
              },
              fail: (response) => {
                 this.setData({
                  
                 })
              }
            })

            upLoadTask.onProgressUpdate((response) => {
              const progress = [...this.data.progress]
              progress[index] = response.progress

              this.setData({
                progress
              })
            })
          }
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
