Page({

  data: {
    usersnicheng:[],//用户昵称
    userids:[],//用户id
    times:[],//建议发表的时间
    opinions:[],//用户反馈的建议
    start: 11,//上拉加载开始的地方
  },

  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/getopinions.php',
      method: "POST",
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.data == 'error')
          console.log("无内容");
        else {
          that.setData({ usersnicheng: res.data.usersnicheng });
          that.setData({ opinions: res.data.opinions });
          that.setData({ userids: res.data.userids });
          that.setData({ times: res.data.times });
        }
      }
    })
  },//展示用户建议

  deleteopinion:function(res){
    var that = this;
    var time = res.currentTarget.dataset.times;
    var userid = res.currentTarget.dataset.userids;
      wx.showModal({
        title: '提示',
        content: '是否确认删除意见',
        success: function (res) {
          if (res.confirm) {
              wx.request({
                url: 'https://www.buleboy.cn/Pugongying/deleteopinion.php',
                method: "POST",
                data: {
                  time: time ,
                  userid: userid
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  console.log(res);
                  console.log('接收删除信息');
                  if (res.data == '删除成功') {
                    wx.showToast({
                      title: '删除成功',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                  else {
                    wx.showToast({
                      title: '删除失败',
                      icon: 'none',
                      duration: 2000
                    });
                  }
                }
              })
          }
        }
      })
  },//意见删除

  onReachBottom: function () {
    console.log("首页上拉触底事件");
    var that = this;
    var start = that.data.start;
    that.setData({ start: start + 1 })

    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/moreopinions.php',
      method: "POST",
      data: {
        page: start
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      complete: function (res) {
        if (res.data == 'error')
          console.log("无内容");
        else {
          that.setData({ usersnicheng: res.data.usersnicheng });
          that.setData({ opinions: res.data.opinions });
          that.setData({ userids: res.data.userids });
          that.setData({ times: res.data.times });
        }
      }
    })
  },//上拉加载

  onPullDownRefresh: function () {
    console.log("监听首页用户下拉动作");
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/getopinions.php',
      method: "POST",
      data: {
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        wx.hideNavigationBarLoading();
        if (res.data == 'error')
          console.log("无内容");
        else {
          that.setData({ usersnicheng: res.data.usersnicheng });
          that.setData({ opinions: res.data.opinions });
          that.setData({ userids: res.data.userids });
          that.setData({ times: res.data.times });
        }
      }
    })
  },//下拉刷新

})