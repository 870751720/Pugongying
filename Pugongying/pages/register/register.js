
Page({

  data: {
    username: '',//用户注册的账号
    password1: '',//用户注册的密码
    password2: '',//用户确认的密码
  },

  usernumInput:function(res){
    var username = this.data.username;
    this.setData({
      username: res.detail.value
    })
    console.log("用户账号信息输入")
  },//将用户账号框信息传输给页面数据

  passward1Input: function (res) {
    var password1 = this.password1;
    this.setData({
      password1: res.detail.value
    })
    console.log("用户注册密码输入")
  },//将用户注册密码框信息传输给页面数据

  passward2Input: function (res) {
    var password2 = this.data.password2;
    this.setData({
      password2: res.detail.value
    })
    console.log("用户确认密码输入")
  },//将用户账号框信息传输给页面数据
  
  registerClick1: function (event){
    var username = this.data.username;
    var password2 = this.data.password2;
    var password1 = this.data.password1;
    if (username == '' || password2 == ''|| password1=='')
      wx.showToast({
        title: '输入信息',
        icon: 'none',
        duration: 2000
      })
    else{
      if (password1 == password2){
      if (password1.length > 15 || password1.length <6)
        wx.showToast({
          title: '密码长度在6-15位',
          duration: 2000
        })
      else{
      wx.request({
        url: 'https://www.buleboy.cn/Pugongying/register.php',
        method: "POST",
        data: {
          username: this.data.username,
          password: this.data.password1
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res){
          console.log('提交信息成功'); 
          if (res.data == 'success1success2'){
            wx.navigateTo({
              url: '../login/login',
            })
            wx.showToast({
              title: '注册成功',
              icon: 'none',
              duration: 2000
            })
          }
          else{
            wx.showToast({
              title: '注册失败',
              icon: 'none',
              duration: 2000
            })
            }
        }
    })}
    }
    else wx.showToast({
      title: '密码不一致',
      icon: 'none',
      duration: 2000
    })}
  },//将用户注册的账户和密码传输给服务器


  registerClick2:function(){
    wx.redirectTo({
      url: '../login/login',
      complete: function (res) {
        console.log("返回注册页面");
      }
    })
  },//返回注册页面

})