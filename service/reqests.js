import { baseapi } from "./config";
class MyRequest {
  constructor(baseapi){
    this.baseapi=baseapi
  }
  getall(options){
    this.baseapi.forEach(element => {
      const{ url } = options;
      return new Promise((reslove,reject) => {
        wx.request({
          url: element + url,
          success:(res) => {
            reslove(res.data);
          },
          fail: (err) => {
            console.log("err:",err);
          },
        })
      })
    });
  }
}

export const myRequest = new MyRequest(baseapi);