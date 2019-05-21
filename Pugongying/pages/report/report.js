var app = getApp();

Page({

  data: {
    array: [],//版块数组
    sections: '',//选择的版块
    index:'',//选择的版块的数字
    setbgimg:'../pugongyingimg/picture.png',//选择图标
    successimg:'../pugongyingimg/successpic.png',//选择成功图标
    titles:'',//标题
    contents:'',//内容
    tempFilePaths:'',//图片上传路径
    hide:true//隐藏图片选择确认图标
  },

  onLoad:function(){
    var that = this;
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
          console.log('设置版块数组');
          that.setData({ array: res.data.sections });
        }
      }
    });
  },//设置版块数组

  bindPickerChange: function(e) {
    var sections = this.data.sections;
    var array = this.data.array;
    var index = this.data.index;
    this.setData({
      sections: array[e.detail.value]
    })
    this.setData({
      index: e.detail.value
    })
    console.log('版块选择');
  },//板块输入

  intitle: function (res){
    var titles = this.data.titles;
    this.setData({
      titles: res.detail.value
    })
    console.log("标题输入")
  },//标题输入

  bgimgset:function(){
    var that=this;
    var tempFilePaths = that.data.tempFilePaths;
    var hide = that.data.hide;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'], 
      success: function (res) {
        that.setData({ tempFilePaths: res.tempFilePaths});
        that.setData({ hide:false });
      }
    })
  },//图片上传

  intext: function (res){
    var contents = this.data.contents;
    this.setData({
      contents: res.detail.value
    })
    console.log("内容输入");
  },//内容输入

  submitClick:function(){
    var that =this;
    if (that.data.sections == '' || that.data.titles == '' || that.data.contents == '' )
      wx.showToast({
        title: '不能发表',
        icon: 'none',
        duration: 2000
      })
    else if (getApp().globalData.userid == null)
      wx.showToast({
        title: '请先登陆',
        icon: 'none',
        duration: 2000
      })
    else{
      if (that.data.tempFilePaths != ''){
      var userid = getApp().globalData.userid;
      var hide = that.data.hide;
      var tempFilePaths = that.data.tempFilePaths;
      wx.uploadFile({
        url: 'https://www.buleboy.cn/Pugongying/articlereport.php',
        filePath: tempFilePaths[0],
        name: 'file',
        formData: {
          sections: that.data.sections,
          titles: that.data.titles,
          contents: that.data.contents,
          userid: userid
        },
        success: function (res) {
          that.setData({ hide: false });
          if (res.data == 'error') {wx.showToast({
            title: '发表失败',
            duration: 2000
          })
            console.log(res.data)}
          else  {
            wx.switchTab({
              url: '../module/module',
              complete: function (res) {
                console.log('发表成功')
              }
            })
            wx.showToast({
              title: '发表成功',
              duration: 2000
            })
          }
        }
      }
      )}
      else {
        var userid = getApp().globalData.userid;
        var hide = that.data.hide;
        wx.request({
          url: 'https://www.buleboy.cn/Pugongying/articlereport2.php',
          method: "POST",
          data: {
            sections: that.data.sections,
            titles: that.data.titles,
            contents: that.data.contents,
            userid: userid
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            that.setData({ hide: false });
            if (res.data == 'success') {
              wx.switchTab({
                url: '../module/module',
                complete: function (res) {
                  console.log('发表成功')
                }
              })
              wx.showToast({
                title: '发表成功',
                duration: 2000
              })
            }
            else {
              wx.showToast({
                title: '发表失败',
                duration: 2000
              })
              console.log('发表失败')
            };
          }
        })
      }
    }
  },//发表文章

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