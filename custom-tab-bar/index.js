// tabbar/inddex.js
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#ff77aa",
    list: [{
      pagePath: "/pages/main/main",
      iconPath: "/src/house_0.png",
      selectedIconPath: "/src/house_2.png",
      text: "首页"
    }, {
      pagePath: "/pages/user/user",
      // iconPath: "/image/icon_API.png",
      // selectedIconPath: "/image/icon_API_HL.png",
      text: "我的"
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})