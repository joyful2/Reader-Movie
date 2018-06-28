Page({
	tap() {
    console.log('to')
		// wx.redirectTo({
		// 	url: '../post/post'
		// })
    // wx.navigateTo({
    //   url: '../post/post'
    // })
    wx.switchTab({
      url: '../post/post'
    })
	}


})