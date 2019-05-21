var app=getApp();

Page({

  data: {
    username:'',//用户登陆账号
    password:'',//用户登陆密码
    userid:'',//返回来的用户id
  },

  usernameInput: function (res) {
    var username=this.data.username;
    this.setData({
      username: res.detail.value
    })
    console.log('账户输入');
  },//将用户账号输入框的数据传入到页面数据

  passwordInput: function (res) {
    var password = this.data.password;
    this.setData({
      password: res.detail.value
    })
    console.log('密码输入');
  },//将用户密码输入框的数据传入页面数据

  loginbtnClick:function(){
    var username = this.data.username;
    var password = this.data.password
    if (username == '' || password == '' )
      wx.showToast({
        title: '输入信息',
        icon: 'none',
        duration: 1000
      })
    else
    wx.request({
      url: 'https://www.buleboy.cn/Pugongying/login.php',
      method:"POST",
      data:{
        username: this.data.username,
        password: this.data.password
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        console.log('登陆接收数据完成');
       if(res.data=='error')
         wx.showToast({
           title: '用户名或密码不正确',
           icon: 'none',
           duration: 1000
         })
       else { 
         app.globalData.relogin = res.data[4];
         app.globalData.userInfo = res.data[3];
         app.globalData.supuser = res.data[2];
         app.globalData.userid = res.data[0];
         app.globalData.password = password;
         wx.setStorageSync('relogin', app.globalData.relogin);
         wx.setStorageSync('userInfo', app.globalData.userInfo);
         wx.setStorageSync('supuser', app.globalData.supuser);
         wx.setStorageSync('userid', app.globalData.userid);
         wx.setStorageSync('password', app.globalData.password);
         wx.switchTab({
           url: '../user/user',
         })
         wx.showToast({
           title: '登陆成功',
           icon: 'none',
           duration: 1000
         })
       }
      }
    })
  },//用户登陆按钮点击，进行服务器登陆，返回用户账号和用户id   

  registerClick: function () {
    wx.redirectTo({
      url: '../register/register',
      complete: function (res) {
        console.log('注册按钮，跳转到注册页面')
      }
    })
  },//注册按钮，跳转到注册页面

  returnback:function(){
    wx.switchTab({
      url: '../index/index',
      complete: function (res) {
        console.log('返回按钮，跳转到首页')
      }
    })
  },//返回按钮，跳转到首页
 
})