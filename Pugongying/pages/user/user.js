var app=getApp();

Page({

  data: {
    username:'',//用户昵称
    userimg: '',//用户默认头像
    userbgimg: '',//背景图片
    yhpicture: [
      'https://www.buleboy.cn/Pugongying/images/picture1.png',
      'https://www.buleboy.cn/Pugongying/images/picture2.jpg',
      'https://www.buleboy.cn/Pugongying/images/picture3.png',
      'https://www.buleboy.cn/Pugongying/images/picture4.png',
      'https://www.buleboy.cn/Pugongying/images/picture5.png'
    ],//图标,箭头
    section: '',//跳转到板块的名称
    hide:''//隐藏意见模块
  },
 

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
            wx.clearStorageSync();
            app.globalData.userimg = 'https://www.buleboy.cn/Pugongying/images/touxiang.png';
            app.globalData.userbgimg = 'https://www.buleboy.cn/Pugongying/images/background-info.png';
            app.globalData.username = '点击登陆';
            that.setData({ username: getApp().globalData.username });
            that.setData({ hide: getApp().globalData.opinionhide });
            that.setData({ userimg: getApp().globalData.userimg });
            that.setData({ userbgimg: getApp().globalData.userbgimg });
            wx.showToast({
              title: '有人已经登陆本账号，重登吧',
              icon: 'none',
              duration: 2000
            })
          }
          else {
            if (getApp().globalData.supuser == 1)
              that.setData({ hide: false });
            else that.setData({ hide: getApp().globalData.opinionhide });
            if (getApp().globalData.userid != null) {
              var userid1 = getApp().globalData.userid;
              wx.request({
                url: 'https://www.buleboy.cn/Pugongying/userinformation.php',
                method: "POST",
                data: {
                  userid: userid1
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log('用户信息接收成功');
                  if (res.data == 'error'){
                    that.setData({ username: getApp().globalData.username });
                    that.setData({ userimg: getApp().globalData.userimg });
                    that.setData({ userbgimg: getApp().globalData.userbgimg });
                    console.log("无用户信息")
                  }
                  else {
                    that.setData({ userimg: res.data[4] });
                    that.setData({ username: res.data[0] });
                    that.setData({ userbgimg: res.data[5] });
                  }
                }
              })
            } 
            else {
              that.setData({ username: getApp().globalData.username });
              that.setData({ userimg: getApp().globalData.userimg });
              that.setData({ userbgimg: getApp().globalData.userbgimg });
            }
          }
        }
      })
    } 
    else {
    that.setData({ username: getApp().globalData.username });
    that.setData({ hide: getApp().globalData.opinionhide});
    that.setData({ userimg: getApp().globalData.userimg });
    that.setData({ userbgimg: getApp().globalData.userbgimg });
    }
  },//接收用户信息

  login:function(){
   if(getApp().globalData.userid == null) {
      wx.navigateTo({
        url: "../login/login",
      })
      console.log('跳转登陆页面');
    }
  },//登陆

  settings:function(){
    if (getApp().globalData.userid != null) {
    wx.navigateTo({
      url: '../setting/setting',
      complete: function (res) {
        console.log('跳转到设置页面')
      }
    })
    }
  },//跳转到设置页面

  myarticles:function(res){
    var section = this.data.section;
    this.setData({ section: res.currentTarget.dataset.section });
    if (getApp().globalData.userid != null) {
      wx.navigateTo({
        url: '../kinds/kinds',
        complete: function (res) {
          console.log('跳转到我的文章');
        }
      })
    }
  },//跳转到我的文章

  mycomments:function(res){
    var section = this.data.section;
    this.setData({ section: res.currentTarget.dataset.section });
    if (getApp().globalData.userid != null) {
      wx.navigateTo({
        url: '../kinds/kinds',
        complete: function (res) {
          console.log('跳转到我的评论');
        }
      })
    }
  },//跳转到我的评论

  userinformation:function(){
    if (getApp().globalData.userid != null) {
      wx.navigateTo({
        url: '../userinformation/userinformation',
        complete: function (res) {
          console.log('跳转到我的资料页面');
        }
      })
    }
  },//跳转到我的资料页面

  pointClick:function(){
    wx.navigateTo({
      url: '../point/point',
      complete: function (res) {
        console.log('跳转到我的评论');
      }
    })
  }

})