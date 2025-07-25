Page({
    // 选择头像（相册/拍摄）
    chooseAvatar() {
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
              }
            });
          }
        },
        fail: (err) => {
          console.error('ActionSheet 调用失败：', err);
        }
      });
    }
  });