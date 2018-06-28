var postData = require('../../data/post-data')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    data:'joe is hand',
    text:'this is text'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.setData({
      postArr: postData.postList
    })
  },
  onSwiperTap(e){
    // console.log(e)
    let id = e.target.dataset.id
    console.log(id)
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+id,
    })
  },
  toDetail(e) {
    // console.log(e)
    // console.log(e.currentTarget.dataset)
    let postId = e.currentTarget.dataset.id
    // console.log(postId)
    wx.navigateTo({
      url:'post-detail/post-detail?id='+ postId
    })
  }

})