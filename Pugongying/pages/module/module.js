var app = getApp();

Page({

  data: {
    sections: [],  //板块名称
    modpic: ['https://www.buleboy.cn/Pugongying/images/picture4.png'],//箭头
    setimg: '../pugongyingimg/reportpic.jpg'//发表图标
  },

  sectionClick: function (res) {
    var section = this.data.section;
    this.setData({ section: res.currentTarget.dataset.section });
    wx.navigateTo({
      url: '../kinds/kinds',
      complete: function (res) {
        console.log('跳转到板块页面')
      }
    })
  },//跳转到板块页面

  onLoad:function(){
    var that=this;
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/sections.php',
      method: "POST",
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data == 'error')
          console.log("无板块信息")
        else {
          that.setData({ sections: res.data.sections });
        }
      }
    });
  },//加载版块数据

  report:function(){
    if (getApp().globalData.userid != null) {
    wx.navigateTo({
      url: "../report/report",
    })
    console.log('跳转发表页面');
    }
    else {
      wx.navigateTo({
      url: "../login/login",
    })
      console.log('跳转登陆页面');
    }
  },//发表按钮

  onShow: function () {
    var that = this;
    var userid = getApp().globalData.userid;
    if (app.globalData.relogin != null) {
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
          if (app.globalData.relogin != res.data) {
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