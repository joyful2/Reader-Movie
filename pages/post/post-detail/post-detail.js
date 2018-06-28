var postData_list = require('../../../data/post-data')
let app = getApp()

Page({
  
  data: {
    
  },

  onLoad: function (options) {
    // console.log(options)
    let postId = options.id
    this.data.postId = postId
    let postData = postData_list.postList[postId]
    // console.log(postData)
    this.setData({
        postData,
    })

    // 收藏信息如果有缓存就获取，没有就设置一个
    var postCollected_List = wx.getStorageSync('postCollected_List')
    if (postCollected_List) {
      var collected = postCollected_List[postId]
      this.setData({
        collected: collected
      })
    }
    else {
      var postCollected_List = {}
      postCollected_List[postId] = false
      var collected = postCollected_List[postId]
      wx.setStorageSync('postCollected_List', postCollected_List)
      this.setData({
        collected, collected
      })
    }
    this.musicControll()
  },
  
  musicControll(){
    let that = this
    let postId = this.data.postId
    let isPlaying 
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicId === postId){
      isPlaying = app.globalData.g_isPlayingMusic
    }
    this.setData({
      isPlaying,
    })
    wx.onBackgroundAudioPlay(() => {
      // console.log("played joe")
      that.setData({
        isPlaying: true
      })
      app.globalData.g_isPlayingMusic = true
      app.globalData.g_currentMusicId = postId
      console.log(app.globalData.g_currentMusicId)
    })

    wx.onBackgroundAudioPause(() => {
      // console.log("paused joe")
      that.setData({
        isPlaying: false
      })
      app.globalData.g_isPlayingMusic = false
      app.globalData.g_currentMusicId = null
      console.log('global', app.globalData)
      console.log(app.globalData.g_currentMusicId)
    })

  },

  handleplay(){
    let isPlaying = this.data.isPlaying

    let postId = this.data.postId
    let postsData = postData_list.postList
    let music = postsData[postId].music
    console.log(music)
    if(isPlaying) {
      // 暂停播放
      wx.pauseBackgroundAudio()
      this.setData({
        isPlaying: false
      })
    }
    else {
      wx.playBackgroundAudio({
        dataUrl: music.url,
        title: music.title,
        coverImgUrl: music.coverImg
      })
      this.setData({
        isPlaying: true
      })
    }
  },

  tapcollect(){
    // this.getPostsCollectedSyc()
    this.getPostsCollectedAsy()
  },

  getPostsCollectedSyc(){
    let postId = this.data.postId

    var postCollected_List = wx.getStorageSync('postCollected_List')
    var collected = postCollected_List[postId]
    collected = !collected
    postCollected_List[postId] = collected
    this.setData({
      collected,
    })
    wx.setStorageSync('postCollected_List', postCollected_List)

    wx.showToast({
      title: collected ? '收藏成功' : '取消成功',
      icon: 'success',
      duration: 1000
    })
  },

  getPostsCollectedAsy(){
    var that = this
    var postId = this.data.postId
   wx.getStorage({
      key: 'postCollected_List',
      success: function(res) {
          var postCollected_List = res.data
          var collected = res.data[postId]

          collected = !collected
          postCollected_List[postId] = collected
          that.showToast(collected, postCollected_List)
      },
    })
  },

  showToast(collected, postCollected_List){
    this.setData({
      collected,
    })
    wx.setStorageSync('postCollected_List', postCollected_List)
    wx.showToast({
      title: collected ? '收藏成功' : '取消成功',
      icon: 'success',
      duration: 1000
    })
  },

  tapshare(){
    // console.log('share')
    var itemList = ['分享到qq', '分享到微博', '分享到朋友圈']
    wx.showActionSheet({
      itemList: itemList,
      success: function(res) {
        // console.log(res)
        wx.showModal({
          title: '用户选择了' + itemList[res.tapIndex],
          content: '是否取消'+res.cancel,
        })
      },
      fail: function(res) {
        console.log(res)
      }
    })
  },


})