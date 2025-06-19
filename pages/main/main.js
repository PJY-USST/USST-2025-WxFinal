// pages/main/main.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageid:'0',
    v_m_nav_id:'0',
    v_data:[{

    }],

    a_search_text:"点击搜索",
  },

  onTaptop:function(e){
    console.log("hot-"+e.currentTarget.id)
    this.setData({
      pageid:e.currentTarget.id
    })
  },
  onTap_v_m:function(e){
    console.log("hot-v-"+e.currentTarget.id)
    this.setData({
      v_m_nav_id:e.currentTarget.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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

  }
})
