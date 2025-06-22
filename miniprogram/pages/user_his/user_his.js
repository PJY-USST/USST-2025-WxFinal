// pages/user_his/user_his.js
Page({
  data: {
    uid:"",
    his_data:[],
    v_data:{},
  },
  onLoad(options) {
    this.setData({
      uid:wx.getStorageSync('uid'),
      v_data:wx.getStorageSync('v_data')
    })
    setTimeout(this.timeout,500);
    this.FromCloud(this.data.uid);
  },
  onShow() {

  },
  timeout(){},
  FromCloud(uid) {
    if (uid === "") {
      console.error("uid为空 from<main.js>");
      return -1;
    }
    const data = {
      uid: uid,
    }
    console.log("查询", data);
    wx.cloud.callFunction({
      name:"Upload-To-DB",
      data: {
        action: "findData",
        params: data,
      },
    }).then(res=>{
      console.log('调用成功 from<user_his.js>', res.result.data);
      this.setData({
        his_data:res.result.data,
      })
    }).catch(err => {
      console.error('调用失败 from<user_his.js>', err);
    })
  },
})