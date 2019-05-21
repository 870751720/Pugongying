var app = getApp();

Page({

  data: {
    username: '',//作者名称
    userimg: '',//用户头像
    userid:'',//作者id
    title: '',  //文章的标题
    content:'',//文章的内容
    readid:'',//文章id
    bgimg:'',//文章背景图片
    time:'',//文章发表的时间
    hide:true,//隐藏图片
    hide2: true,//隐藏文章删除按钮
    contents:[],//评论的内容
    usersname:[],//评论人名称
    usersimg:[],//评论人头像
    commentusersid:[],//评论人id
    commentstime:[],//评论发表的时间
    usercontent:'',//用户将发表的评论
    start: 6,//上拉加载开始的地方
    hides:[],//评论删除按钮隐藏
  },

  onLoad: function (options) {
    var that = this;
    var hides = that.data.hides;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    that.setData({ readid: prevPage.data.readid});
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/readarticle.php',
      method: "POST",
      data: {
        readid: prevPage.data.readid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data == 'error')
          console.log("无文章信息")
        else {
          that.setData({ title: res.data[0] });
          that.setData({ content: res.data[1]});
          that.setData({ userid: res.data[2] });
          that.setData({ time: res.data[4] });
          that.setData({ userimg: res.data[6] });
          that.setData({ username: res.data[7] });
          if (res.data[5] !='https://www.buleboy.cn/images/background-info.png'){
            that.setData({ bgimg: res.data[5] });
            that.setData({ hide: false });
            }
          if (getApp().globalData.supuser == 1 || that.data.userid == getApp().globalData.userid){
            that.setData({ bgimg: res.data[5] });
            that.setData({ hide2: false });
          }
        }
      }
    });
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/comments.php',
      method: "POST",
      data: {
        readid: prevPage.data.readid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data == 'error')
          console.log("无评论信息")
        else {
          console.log('评论加载成功');
          that.setData({ contents: res.data.contents });
          that.setData({ commentstime: res.data.times });
          that.setData({ usersname: res.data.usersnicheng });
          that.setData({ usersimg: res.data.usersimg });
          that.setData({ commentusersid: res.data.userids });
          for (var i = 0; i < that.data.contents.length;i++){
            if (getApp().globalData.supuser == 1 || that.data.commentusersid[i] == getApp().globalData.userid)
             hides.push(false);
            else hides.push(true);
            that.setData({ hides: hides });
          }
        }
      }
    });
 
  },//加载文章评论

  commentset:function(){
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
              title: '失败，有人已经登陆本账号，重登吧',
              icon: 'none',
              duration: 2000
            })
          }
          else {
            if (getApp().globalData.userid != null && that.data.usercontent != '') {
              wx.request({
                url: 'https://www.buleboy.cn/Pugongying/commentinput.php',
                method: "POST",
                data: {
                  readid: that.data.readid,
                  usercontent: that.data.usercontent,
                  userid: userid
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  if (res.data == 'success') {
                    wx.showToast({
                      title: '发表成功',
                      duration: 2000
                    })
                    wx.request({
                      url: 'https://www.buleboy.cn/Pugongying/comments.php',
                      method: "POST",
                      data: {
                        readid: that.data.readid
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      success: function (res) {
                        if (res.data == 'error')
                          console.log("无评论信息")
                        else {
                          console.log('评论加载成功');
                          that.setData({ contents: res.data.contents });
                          that.setData({ commentstime: res.data.times });
                          that.setData({ usersname: res.data.usersnicheng });
                          that.setData({ usersimg: res.data.usersimg });
                          that.setData({ commentusersid: res.data.userids });
                        }
                      }
                    });
                  }
                  else wx.showToast({
                    title: '发表失败',
                    duration: 2000
                  })
                }
              })
            }
            else wx.showToast({
              title: '不能发表哦',
              duration: 2000
            })
          }
        }
      })
    } 
    else wx.showToast({
      title: '不能发表哦',
      duration: 2000
    })
    
  },//发表评论

  commentinput: function (res) {
    var usercontent = this.data.usercontent;
    this.setData({
      usercontent: res.detail.value
    })
    console.log("用户输入")
  },//评论输入

  onReachBottom: function () {
    console.log("上拉触底事件");
    var that = this;
    var start = that.data.start;
    that.setData({ start: start + 1 });
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/morecomments.php',
      method: "POST",
      data: {
        readid: that.data.readid,
        page: start
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data == 'error')
          console.log("无评论信息")
        else {
          console.log('评论加载成功');
          that.setData({ contents: res.data.contents });
          that.setData({ usersname: res.data.usersnicheng });
          that.setData({ usersimg: res.data.usersimg });
          that.setData({ commentstime: res.data.times });
          that.setData({ commentusersid: res.data.userids });
        }
      }
    });
  },//下拉刷新

  articledelete:function(){
   var that = this;
   var userid = getApp().globalData.userid;
    wx.showModal({
      title: '提示',
      content: '是否确认删除文章',
      success: function (res) {
        if (res.confirm) {
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
              else {
               if (getApp().globalData.supuser == 1 || that.data.userid == getApp().globalData.userid) {
                wx.request({
                  url: 'https://www.buleboy.cn/Pugongying/deleteac.php',
                  method: "POST",
                  data: {
                    articleid: that.data.readid,
                    articlebgimg: that.data.bgimg,
                    way: 1,
                    time: 0,
                    userid: 0,
                    supuser: 0
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    console.log('接收删除信息');
                    console.log(res);
                    if (res.data == '文章删除成功') {
                      wx.navigateBack({
                        delta: 1
                      });
                      wx.showToast({
                        title: '文章删除成功',
                        icon: 'none',
                        duration: 1000
                      });
                    }
                    else {
                      wx.showToast({
                        title: '文章删除失败',
                        icon: 'none',
                        duration: 2000
                      });
                    }
                  }
                })
              } 
            }
            }
          })     
        }
      }
    })
  },//文章删除

  commentdelete:function(res){
    var that = this;
    var time = res.currentTarget.dataset.commentstime;
    var commentuserid = res.currentTarget.dataset.commentusersid;
    var userid = app.globalData.userid;
    if (getApp().globalData.supuser == 1 || commentuserid == getApp().globalData.userid){
    wx.showModal({
      title: '提示',
      content: '是否确认删除评论',
      success: function (res) {
        if (res.confirm) {
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
              else {
              if (getApp().globalData.supuser == 1 || commentuserid == getApp().globalData.userid) {
                wx.request({
                  url: 'https://www.buleboy.cn/Pugongying/deleteac.php',
                  method: "POST",
                  data: {
                    articleid: 0,
                    articlebgimg: that.data.bgimg,
                    way: 0,
                    time: time,
                    userid: getApp().globalData.userid,
                    supuser: getApp().globalData.supuser
                  },
                  header: {
                    'content-type': 'application/x-www-form-urlencoded'
                  },
                  success: function (res) {
                    console.log('接收删除信息');
                    if (res.data == '评论删除成功') {
                      wx.showToast({
                        title: '评论删除成功',
                        icon: 'none',
                        duration: 2000
                      });
                      wx.request({
                        url: 'https://www.buleboy.cn/Pugongying/comments.php',
                        method: "POST",
                        data: {
                          readid: that.data.readid
                        },
                        header: {
                          'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: function (res) {
                          if (res.data == 'error')
                            console.log("无评论信息")
                          else {
                            console.log('评论加载成功');
                            that.setData({ contents: res.data.contents });
                            that.setData({ commentstime: res.data.times });
                            that.setData({ usersname: res.data.usersnicheng });
                            that.setData({ usersimg: res.data.usersimg });
                            that.setData({ commentusersid: res.data.userids });
                          }
                        }
                      });
                    }
                    else {
                      wx.showToast({
                        title: '评论删除失败',
                        icon: 'none',
                        duration: 2000
                      });
                    }
                  }
                })
              }
              }
            }
          })
        }
      }
    })
    }
    else 
      wx.showToast({
        title: '您不能删除哦',
        icon: 'none',
        duration: 2000
      });
  },//评论删除

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