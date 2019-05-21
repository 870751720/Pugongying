var app = getApp();

Page({

  data: {
    slideimgs:[], //头版图片这里
    recommendimgs:[], //推荐图片
    sections:[],  //板块名称
    bgimgs:[], //最新发布文章的图片
    userimgs:[],  //最新发布文章作者的头像
    titles:[],  //最新发布文章的标题
    contents:[],//最新发布文章的内容预告
    articleids: [],//最新发布文章的id,
    readid:'',//跳转到阅读的文章的id
    section: '',//跳转到板块的名称
    start:11,//上拉加载开始的地方
  }, 

  sectionClick:function(res){
    var section = this.data.section;
    this.setData({ section: res.currentTarget.dataset.section });
    wx.navigateTo({
      url: '../kinds/kinds',
      complete: function (res) {
        console.log('跳转到板块页面')
      }
    })
  },//跳转到板块页面

  allClick:function(){
    var section = this.data.section;
    this.setData({ section:'all' });
    wx.navigateTo({
      url: '../kinds/kinds',
      complete: function (res) {
        console.log('跳转全部文章')
      }
    })
  },//跳转全部文章

  readingClick:function(res){
    var readid = this.data.readid;
    this.setData({readid: res.currentTarget.dataset.articleid});
    wx.navigateTo({
      url: '../readpage/readpage?id=1',
      complete: function (res) {
        console.log('跳转到readpage页面')
      }
    })
  },//跳转到readpage页面

  module:function(){
    wx.switchTab({
      url: '../module/module',
      complete: function (res) {
        console.log('跳转到板块')
      }
    })
  },//跳转到板块

  onLoad: function (options) {
    console.log("监听首页加载");
    wx.showLoading({
      title: '加载中',
    })
    var value1 = wx.getStorageSync('relogin');
    var value2 = wx.getStorageSync('userInfo');
    var value3 = wx.getStorageSync('supuser');
    var value4 = wx.getStorageSync('userid');
    var value5 = wx.getStorageSync('password');
    if (value1) {
      app.globalData.relogin = value1
    }
    if (value2) {
      app.globalData.userInfo = value2
    }
    if (value3) {
      app.globalData.supuser = value3
    }
    if (value4) {
      app.globalData.userid = value4
    }
    if (value5) {
      app.globalData.password = value5
    }
    var that = this;
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/index.php',
      method: "POST",
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data == 'error')
          console.log("无文章信息");
        else {
          that.setData({ titles: res.data.titles });
          that.setData({ contents: res.data.contents });
          that.setData({ articleids: res.data.articleids });
          that.setData({ userimgs: res.data.userimgs});
          that.setData({ slideimgs: res.data.slideimgs });
          that.setData({ sections: res.data.sections });
          that.setData({ recommendimgs: res.data.recommendimgs });
          that.setData({ bgimgs: res.data.bgimgs });
        }
      }
    })
  },//load加载功能

  onShow:function(){
    console.log("监听首页加载");
    wx.showLoading({
      title: '加载中',
    })
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

    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/index.php',
      method: "POST",
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data == 'error')
          console.log("无文章信息");
        else {
          that.setData({ titles: res.data.titles });
          that.setData({ contents: res.data.contents });
          that.setData({ articleids: res.data.articleids });
          that.setData({ userimgs: res.data.userimgs });
          that.setData({ slideimgs: res.data.slideimgs });
          that.setData({ sections: res.data.sections });
          that.setData({ recommendimgs: res.data.recommendimgs });
          that.setData({ bgimgs: res.data.bgimgs });
        }   
      }
    })
  },//出现页面刷新

  onPullDownRefresh: function () {
    console.log("监听首页用户下拉动作");
    wx.showNavigationBarLoading() ;
    var that = this;
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/index.php',
      method: "POST",
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('刷新成功');
        wx.hideNavigationBarLoading();
        if (res.data == 'error')
          console.log("无文章信息")
        else {
          that.setData({ titles: res.data.titles });
          that.setData({ contents: res.data.contents });
          that.setData({ articleids: res.data.articleids });
          that.setData({ userimgs: res.data.userimgs });
          that.setData({ slideimgs: res.data.slideimgs });
          that.setData({ sections: res.data.sections });
          that.setData({ recommendimgs: res.data.recommendimgs });
          that.setData({ bgimgs: res.data.bgimgs });
        }
      }
    })
  },//下拉刷新
 
  onReachBottom: function () {
    console.log("首页上拉触底事件");
    var that = this;
    var start = that.data.start;
    that.setData({ start: start + 1 })
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/moreindex.php',
      method: "POST",
      data: {
        page: start
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      complete: function (res) {
        if (res.data == 'error')
          console.log("无文章信息")
        else {
          console.log('刷新成功')
          that.setData({ titles: res.data.titles });
          that.setData({ contents: res.data.contents });
          that.setData({ articleids: res.data.articleids });
          that.setData({ userimgs: res.data.userimgs });
          that.setData({ bgimgs: res.data.bgimgs });
        }
      }
    })  
  },//上拉加载
  
})