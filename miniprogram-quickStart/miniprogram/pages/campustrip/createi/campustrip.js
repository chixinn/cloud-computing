const db=wx.cloud.database()//获取数据库
const invites=db.collection('campusInvitations')//获取数据集
var id

Page({
    /**页面初始化数据 */
    data:{
        invites:[],//用来存储邀请
        _page:0,
        hasMore:true,
    },
    onLoad:async function(options){//获取id
        var res=await wx.cloud.callFunction({
          name:'getopenid'
        })
        id1=res.result.openid
        console.log(id)
       this.loadListData()
    },

  async loadListData(){  //加载数据
    let that=this
    const LIMIT =20 //限制每次获得数据条数
    let {_page,invites}=this.data
    wx.showLoading({
      title: 'Loading',
    })
    let res= await invites_col.where({
      member:id
    }).limit(LIMIT).skip(_page*LIMIT).get()  //从数据库获取数据
    wx.stopPullDownRefresh({
      complete: (res) => {},
    })
    wx.hideLoading({
      complete: (res) => {},
    })
    this.setData({
      invites : [...invites,...res.data],  //刷新获得data，链接数据
      _page:++_page,
      hasMore:res.data.length === LIMIT
    })
  },
  onReachBottom(){  //上拉刷新
    if(!this.data.hasMore){
      wx.showToast({
        title: 'Nomore Data',
        icon:"none"
      })
      return console.log('没有数据')
    }
    console.log('刷新')
    this.loadListData()
  },
  onPullDownRefresh(){  //下拉刷新
    this.setData({
      tasks:[],
      _page:0,
      hasMore:true
    })
    this.loadListData()
  }


})