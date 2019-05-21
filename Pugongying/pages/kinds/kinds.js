var app = getApp();

Page({

  data: {
    section:'',//板块名称
    titles:[],//文章标题
    contents:[],//文章内容
    articleids:[],//文章id
    userimgs:[],//作者头像
    sections: [],//文章板块
    start:11//加载开始位置
  },

  readingClick: function (res) {
    var readid = this.data.readid;
    this.setData({ readid: res.currentTarget.dataset.articleid });
    wx.navigateTo({
      url: '../readpage/readpage?id=1',
      complete: function (res) {
        console.log('跳转到readpage页面')
      }
    })
  },//跳转到readpage页面
 
  onLoad: function (options) {
    var that = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    that.setData({ section: prevPage.data.section });
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/sectionarticle.php',
      method: "POST",
      data: {
        section: that.data.section,
        id: getApp().globalData.userid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('接收数据完成');
        if (res.data == 'error')
          console.log("无文章信息")
        else {
          that.setData({ titles: res.data.titles });
          that.setData({ contents: res.data.contents });
          that.setData({ articleids: res.data.articleids });
          that.setData({ userimgs: res.data.userimgs });
          that.setData({ sections: res.data.sections });
        }
      }
    })
  },//接收板块文章数据

  onReachBottom: function () {
    console.log("上拉触底事件");
    var that = this;
    var start = that.data.start;
    that.setData({ start: start + 1 });
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/moresectionarticle.php',
      method: "POST",
      data: {
        page: start,
        section: that.data.section,
        id: getApp().globalData.userid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      complete: function (res) {
        if (res.data == 'error')
          console.log("无文章信息")
        else {
          console.log('刷新成功');
          that.setData({ titles: res.data.titles });
          that.setData({ contents: res.data.contents });
          that.setData({ articleids: res.data.articleids });
          that.setData({ userimgs: res.data.userimgs });
          that.setData({ sections: res.data.sections });
        }
      }
    })
  },//上拉刷新

  onPullDownRefresh: function () {
    console.log("监听用户下拉动作");
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/sectionarticle.php',
      method: "POST",
      data: {
        section: that.data.section,
        id: getApp().globalData.userid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideNavigationBarLoading();
        if (res.data == 'error')
          console.log("无文章信息")
        else {
          console.log('加载成功')
          that.setData({ titles: res.data.titles });
          that.setData({ contents: res.data.contents });
          that.setData({ articleids: res.data.articleids });
          that.setData({ userimgs: res.data.userimgs });
          that.setData({ sections: res.data.sections });
        }
      }
    })
  },//下拉加载
  
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