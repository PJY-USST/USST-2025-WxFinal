const cloud = require("wx-server-sdk")
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

const addDataToCloudAsync = async(data)=>{
  try{
    try {
      db.createCollection("user_his");
    } catch (err) {
      console.error("创建失败")
    }
    await db.collection("user_his").add({
      data:{
        uid:data.uid,
        type:data.type,
        content:ddata.content,
        createTime:db.serverDate()
      }
    })
    console.log('添加成功 from<index.js>')
  }catch(err){
    console.error('添加失败 from<index.js>',err)
    // return err;
  }
}
// 云函数入口函数
exports.main=async(event,context) =>{
  switch(event.action){
    case "addData":
      return await addDataToCloudAsync(event.params);
  }
}
