Page({
  data:
  {
    avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
    userID: "点击登录"
  },
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //唯一标识（其它设置不同的整数）  
        selected: 1
      })
    }
    if (wx.getStorageSync('uid')) {
      this.setData({
        avatarUrl: wx.getStorageSync('avatar_url'),
        userID: wx.getStorageSync('uid'),
      })
    }
  },
  onLoad(options) {
    if (wx.getStorageSync('uid')) {
      this.setData({
        avatarUrl: wx.getStorageSync('avatar_url'),
        userID: wx.getStorageSync('uid'),
      })
    }
  },
  // 选择头像（相册/拍摄）
  chooseAvatar(e) {
    wx.showActionSheet({
      itemList: ['从相册选择', '拍摄照片'],
      success: (res) => {
        if (res.tapIndex === 0) {
          // 相册选择
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album'],
            success: (res) => {
              // 此处可添加「上传头像到服务器」逻辑
              console.log('选择的头像地址：', res.tempFilePaths[0]);
              this.setData({
                avatarUrl: res.tempFilePaths[0],
              });
            }
          });
        } else if (res.tapIndex === 1) {
          // 拍摄照片
          wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['camera'],
            success: (res) => {
              // 此处可添加「上传头像到服务器」逻辑
              console.log('拍摄的头像地址：', res.tempFilePaths[0]);
              this.setData({
                avatarUrl: res.tempFilePaths[0],
              });
            }
          });
        }
      },
      fail: (err) => {
        console.warn('ActionSheet 调用失败：', err);
      }
    });
  },
  chooseID(e) {
    wx.navigateTo({
      url: '../index/index',
    })
  },
  onLogout(e) {
    this.setData({
      avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
      userID: "点击登录"
    })
    wx.removeStorageSync('uid')
    wx.removeStorageSync('avatar_url')
  },
  onTapHistory: function (e) {
    wx.navigateTo({
      url: '../user_his/user_his',
    })
  },
});