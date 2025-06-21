// tabbar/inddex.js
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#ff77aa",
    list: [{
      pagePath: "/pages/main/main",
      iconPath: "/src/house_00.png",
      selectedIconPath: "/src/house_11.png",
      text: "首页"
    }, {
      pagePath: "/pages/user/user",
      iconPath: "/src/me_0.png",
      selectedIconPath: "/src/me_1.png",
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