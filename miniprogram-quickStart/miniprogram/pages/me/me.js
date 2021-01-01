var app=getApp()
Page({
  data:{
    userInfo:app.globalData.userInfo,
    myCampustrip:[],
    myShophelp:[],//todo
    myFoundthing:[],//todo
    myGoodsList:[]//todo
  },
  //这里怎么跳转的细节还没有搞懂
 toSend:function(){
   wx.navigateTo({
     url: 'pages/campustrip/mytrip'
   })
 },
 jump(){                        //返回注册页面
  wx.navigateTo({
    url: '/pages/mytask/mytask'
  })
},
})