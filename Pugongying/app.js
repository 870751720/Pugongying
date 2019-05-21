App({

  onLaunch: function () {
    console.log("当小程序初始化完成时，会触发 onLaunch（全局只触发一次）")
  },

  onShow: function (options) {
    console.log("当小程序启动，或从后台进入前台显示，会触发 onShow")
  },

  onHide: function () {
    console.log("当小程序从前台进入后台，会触发 onHide")
  },

  onError: function (msg) {
    console.log("当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息")
  },
  
  globalData:{
    userInfo:null,//用户账号
    userid:null,//用户id
    password:null,//用户密码
    supuser:null,//超级用户权限
    opinionhide:true,//所有建议按钮隐藏开关
    relogin:null,//用户重复登陆
    username:'点击登陆',//用户昵称
    userimg: 'https://www.buleboy.cn/Pugongying/images/touxiang.png',//用户默认头像
    userbgimg: 'https://www.buleboy.cn/Pugongying/images/background-info.png',//背景图片
  }//全局变量
})

