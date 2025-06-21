// pages/main/main.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //主页面编号
    pageid: '0',
    //视频地址api
    js_url: "",
    v_url: "",
    //中央导航
    v_m_nav_id: '0',
    //视频数据
    v_hot_data: {},
    //当前播放
    v_playing_url: "",
    v_playing_bv: "",
    //海报图片
    v_head_url: ["", "", ""],

    a_search_text: "点击搜索",
  },

  onTaptop: function (e) {
    console.log("hot-" + e.currentTarget.id);
    this.setData({
      pageid: e.currentTarget.id
    });
  },
  onTap_v_m: function (e) {
    console.log("hot-v-" + e.currentTarget.id);
    this.setData({
      v_m_nav_id: e.currentTarget.id,
    });
  },
  onTap_v_d: function (e) {
    console.log("goto-" + e.currentTarget.id);
    const url = "https://www.bilibili.com/video/" + e.currentTarget.id;
    this.setData({
      v_playing_url: url,
      v_playing_bv: e.currentTarget.id,
      v_m_nav_id: '1',
    });
    console.log(this.data.v_playing_url);
    wx.setStorageSync('v_play_url', url);
    wx.navigateTo({
      url: '/pages/new/new',
    });
  },

  onTap_v_look:function(e){
    console.log("sub goto-" + e.currentTarget.id);
    wx.navigateTo({
      url: '/pages/new/new',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.clearStorageSync();
    this.getHotV();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //唯一标识（其它设置不同的整数）  
        selected: 0
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onFinishget() {
    console.log("Vedio data got");
  },

  //获取视频列表
  getHotV() {
    const jsurl = "https://json.xn--10v.link:3000/get-latest-json";
    wx.request({
      url: jsurl,
      success: (res) => {
        var js = res.data.filename;
        this.setData({
          js_url: js.toString()
        });
        var url = "https://online.xn--10v.link/rank/" + this.data.js_url;
        this.setData({
          v_url: url
        });
        console.log(url);
        wx.request({
          url: this.data.v_url,
          success: (res) => {
            this.setData({
              v_hot_data: res.data,
            });
            // console.log(this.data.v_hot_data);
            wx.setStorageSync('v_data', this.data.v_hot_data)//放到缓存
            //加载完成触发回调
            this.onFinishget();
          },
          fail: (err) => {
            console.log("err:", err);
          }
        });
      },
      fail: (err) => {
        console.log("err:", err);
      },
    });
  },
})
