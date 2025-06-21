// pages/main/main.js
import {baseUrl} from "../../service/config.js";
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
    m_new_rank:[],
    m_cop_rank:[],
    m_upp_rank:[],
    m_banners:[],
    m_playing_pic:"",
    m_playing_title:"",

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
    const url = baseUrl["v_play"] + e.currentTarget.id;
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

  onTapSongNew:function(e){
    console.log("Song playing hot-"+e.currentTarget.id);
    var a = wx.getStorageSync('a_new_data').tracks[e.currentTarget.id];
    wx.setStorageSync('a_playing', a);
    console.log(typeof(a));
    this.setData({
      m_playing_pic:a.al.picUrl,
      m_playing_title:a.name,
    })
  },

  onLoad(options) {
    // console.log(typeof(baseUrl["v_play"]));
    wx.clearStorageSync();
    this.getHotV();
    this.getHotM();
    this.getUPM();
    this.getBannerM();
  },

  onShow() {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      this.getTabBar().setData({
        //唯一标识（其它设置不同的整数）  
        selected: 0
      })
    }
  },

  onFinishget() {
    console.log("Vedio data got");
  },

  //获取视频列表
  getHotV() {
    const jsurl = baseUrl["v_json"];
    wx.request({
      url: jsurl,
      success: (res) => {
        var js = res.data.filename;
        this.setData({
          js_url: js.toString()
        });
        var url = baseUrl["v_hot"] + this.data.js_url;
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
  getHotM(id=3779629){
    wx.request({
      url: baseUrl["m_root"]+"/playlist/detail",
      data:{
        id,
      },
      success:(res) =>{
        wx.setStorageSync('a_new_data', res.data.playlist);
        this.setData({
          m_new_rank:res.data.playlist.tracks,
        })
        console.log(this.data.m_new_rank);
      },
    })
  },
  getUPM(id=19723756){
    wx.request({
      url: baseUrl["m_root"]+"/playlist/detail",
      data:{
        id,
      },
      success:(res) =>{
        wx.setStorageSync('a_upp_data', res.data.playlist);
        this.setData({
          m_upp_rank:res.data.playlist.tracks,
        })
        console.log(this.data.m_upp_rank);
      },
    })
  },
  getBannerM(type=0){
    wx.request({
      url: baseUrl["m_root"]+"/banner",
      data:{
        type,
      },
      success:(res) =>{
        wx.setStorageSync('a_banner_data', res.data.banners);
        this.setData({
          m_banners:res.data.banners,
        })
        console.log(this.data.m_banners);
      },
    })
  }
})
