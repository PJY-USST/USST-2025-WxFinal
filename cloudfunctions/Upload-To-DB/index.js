const cloud = require("wx-server-sdk")
cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})

const db = cloud.database();

const addDataToCloudAsync = async (data) => {
  const test = await db.collection('user_his').count();
  console.log('集合文档数:', test);
  try {
    await db.collection("user_his").add({
      data: {
        uid: data.uid,
        type: data.type,
        content: data.content,
        createTime: db.serverDate()
      }
    })
    console.log('添加成功 from<index.js>')
    return "添加成功";
  } catch (err) {
    console.error('添加失败 from<index.js>', err)
    return err;
  }
}

const searchDataFromCloudAsync = async(data)=>{
  try {
    var his_data=await db.collection("user_his").where({
      uid:data.uid,
    }).get();
    console.log('查询成功 from<index.js>')
    return his_data;
  } catch (err) {
    console.error('查询失败 from<index.js>', err)
    return err;
  }

}
// 云函数入口函数
exports.main = async (event, context) => {
  switch (event.action) {
    case "addData":
      return await addDataToCloudAsync(event.params);
    case "findData":
      return await searchDataFromCloudAsync(event.params);
  }
}
