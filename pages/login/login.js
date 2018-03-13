const app = getApp()

const { setJWT } = app

const API_BASE = 'http://sanbao.karryauto.cn/KarryShouhou/mobile_json/'
const API_ROUTE = 'loginAction.action'

Page({
  data:{
    fwzh:'',
    pwd:'',
    czymc:'',
    fch:'',
    showMessage: false,
    message:'',
    slider: [
      {picUrl: '/assets/images/1.jpeg'},
      {picUrl: '/assets/images/2.jpg'},
      {picUrl: '/assets/images/3.jpg'}
    ]
  },


  onInputFwzh (event){
    this.setData({
      fwzh: event.detail.value
    })
  },

  onInputFch (event){
    this.setData({
      fch: event.detail.value
    })
  },

  onInputGly (event){
    this.setData({
      czymc: event.detail.value
    })
  },

  onInputPassword (event){
    this.setData({
      pwd: event.detail.value
    })
  },

  onTapSubmitButton (event){
    console.log(this.data.fwzh,this.data.fch,this.data.czymc,this.data.pwd)

    wx.request({
    header: {
        'content-type': 'application/json'
    },
    data: {
      fwzh: this.data.fwzh,
      fch: this.data.fch,
      czymc: this.data.czymc,
      pwd: this.data.pwd
    },
    url: `${ API_BASE }/${ API_ROUTE }`,
    success: (response) => {
      console.log(response)
      const data = response.data
      if (data.success=='false') {
        console.log(111);
        switch (data.error) {
          case '密码错误':
          this.setData({
            message: '您输入的信息有误，请确认您的信息！',
          })
            break

          default:
          this.setData({
            message: '您输入的信息有误，请确认您的信息！',
          })
        }

        switch (data.success) {
          case 'false':
            this.setData({
              showMessage:true
            })
            setTimeout(() => {
              this.setData({
                showMessage:false
              })
            },3000)

            break;
          default:
            this.setData({
              showMessage:false
            })

        }



      }else{
        setJWT(response.data)
        wx.switchTab({
              url: '../me/me'
       })
      }
    }
    })
  }
})
