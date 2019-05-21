var app = getApp();

Page({

  data: {
    array: ['男', '女'],//性别
    objectArray: [
      {
        id: 0,
        name: '男'
      },
      {
        id: 1,
        name: '女'
      },//性别选择
    ],
    userbgimg: '',//用户背景
    usernicheng:'',//用户昵称
    sex:'',//用户性别
    age:'',//用户年龄
    qianming:'',//用户个性签名
    userimg:''//用户头像
  },

  onShow: function () {
    var that=this;
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
            wx.showToast({
              title: '有人已经登陆本账号，重登吧',
              icon: 'none',
              duration: 2000
            })
          }
        }
      })
    } 
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/userinformation.php',
      method: "POST",
      data: {
        userid: userid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('接收用户信息');
        if (res.data == 'error')
          console.log("无用户信息")
        else {
          that.setData({ usernicheng:res.data[0]});
          that.setData({ sex: res.data[1] });
          that.setData({ age: res.data[2] });
          that.setData({ qianming: res.data[3] });
          that.setData({ userimg:res.data[4] });
          that.setData({ userbgimg: res.data[5] });
        }
      }
    }) 
  },//从服务器接受用户个人资料

  touxiangset:function(){
    var userid = getApp().globalData.userid;
    var that = this;
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
              title: '失败，有人已经登陆本账号，重登吧',
              icon: 'none',
              duration: 2000
            })
          }
          else wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
              var tempFilePaths = res.tempFilePaths
              wx.uploadFile({
                url: 'https://www.buleboy.cn/Pugongying/userimgupload.php',
                filePath: tempFilePaths[0],
                name: 'file',
                formData: {
                  userid: userid,
                  userimg: that.data.userimg
                },
                success: function (res) {
                  console.log('头像设置完成');
                }
              })
            }
          })
        }
      })
  },//用户头像设置

  bgimgset: function () {
    var userid = getApp().globalData.userid;
    var that = this;
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
            title: '失败，有人已经登陆本账号，重登吧',
            icon: 'none',
            duration: 2000
          })
        }
        else
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {
            var tempFilePaths = res.tempFilePaths;
            wx.uploadFile({
              url: 'https://www.buleboy.cn/Pugongying/userbgimgupload.php',
              filePath: tempFilePaths[0],
              name: 'file',
              formData: {
                userid: userid,
                userbgimg: that.data.userbgimg
              },
              success: function (res) {
              console.log('背景设置完成');
              }
            })
            }
          })
      }
    })
  },//用户背景设置

  unameInput: function (res){
    var usernicheng = this.data.usernicheng;
    this.setData({
      usernicheng: res.detail.value
    })
    console.log("用户昵称输入")
  },//用户昵称输入

  qianmingInput:function(res){
    var qianming = this.data.qianming;
    this.setData({
      qianming: res.detail.value
    })
    console.log("用户个性签名输入")
  },//用户个性签名输入

  save:function () {
    var userid = getApp().globalData.userid;
    var that = this;
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
            title: '失败，有人已经登陆本账号，重登吧',
            icon: 'none',
            duration: 2000
          })
        }
        else  
        wx.request({
          url: 'https://www.buleboy.cn/Pugongying/userinformationset.php',
            method: "POST",
            data: {
              usernicheng: that.data.usernicheng,
              sex: that.data.sex,
              age: that.data.age,
              qianming: that.data.qianming,
              userid: getApp().globalData.userid
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function ()  { 
              wx.switchTab({
                url: '../user/user',
                complete: function (res) {
                 console.log('保存成功');
                }
              })
            }
        })
      }
    })
  },//用户信息保存

  bindPickerChange: function (e) {
   if ( e.detail.value==0 )
   this.setData({
    sex:'男'
   })
   else this.setData({
     sex: '女'
   })
   console.log("用户性别输入")
  },//用户性别输入

  bindDateChange: function (e) {
   console.log('picker发送选择改变，携带值为', e.detail.value)
   this.setData({
     age: e.detail.value
   })
   console.log("用户年龄输入")
  },//用户年龄输入

})