var app = getApp();

Page({

  data: {
    password1: '',//用户修改的密码
    password2: '',//用户新的密码
  },

  passward1Input:function(res){
    var password1 = this.password1;
    this.setData({
      password1: res.detail.value
    })
    console.log("用户旧密码输入")
  },//用户旧密码输入

  passward2Input: function (res) {
    var password2 = this.data.password2;
    this.setData({
      password2: res.detail.value
    })
    console.log("用户新密码输入")
  },//用户新密码输入
  
  correctClick1:function(){
    var userid = getApp().globalData.userid;
    if (this.data.password1 == '' || this.data.password2 == '')
      wx.showToast({
      title: '新旧密码不能为空',
      icon: 'none',
      duration: 1000
      })
    else {
    if (this.data.password1 != app.globalData.password)
      wx.showToast({
        title: '旧密码不正确',
        icon: 'none',
        duration: 1000
      })
      else {
      var that=this;
      wx.request({
        url: 'https://www.buleboy.cn/Pugongying/userpasswordreset.php',
        method: "POST",
        data: {
          password: that.data.password2,
          userid: userid
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function () {
          app.globalData.password = that.data.password2;
          wx.navigateTo({
            url: '../setting/setting',
            complete: function (res) {
              wx.showToast({
                title: '修改成功',
                icon: 'none',
                duration: 1000
              })
            }
          })
        }
      })
      }
    }
  },//修改密码

  onShow:function(){
    var that = this;
    var userid = getApp().globalData.userid;
    if (app.globalData.relogin != null){
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/relogin.php',
      method: "POST",
      data: {
        userid: userid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('接收重复登陆检测信息');
        if (app.globalData.relogin !=res.data){
          app.globalData.userInfo = null;
          app.globalData.userid = null;
          app.globalData.supuser = null;
          app.globalData.password = null;
          app.globalData.opinionhide = true;
          app.globalData.relogin = null;
          app.globalData.username = '点击登陆';
          wx.clearStorageSync();
          wx.showToast({
                title: '有人已经登陆本账号，重登吧',
                icon: 'none',
                duration: 2000
              })
        }
      }
    })
    } 
  }//重复登陆检测
})