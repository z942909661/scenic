const db = require('../db')
exports.getMenu = (req,res) => {
    const userInfo = req.user
    let getRoleId = 'SELECT m.id,MenuName,m.type,m.parent_id,permission,path from ev_menuinfo m ,ev_userrole ur,ev_rolemenu rm,ev_users u WHERE m.id = rm.MenuId and ur.RoleID = rm.RoleID and ur.UserId = u.id and u.username = ?'
    let roleid = ''
    let menuArr = []
    db.query(getRoleId,[userInfo.username],(err,result)=>{
        if(err) return res.cc(err)
        menuArr = result
        // children:[
        //     {

        //     }
        // ],
        for(const item of result){
            item.children = []
        }
        // console.log(result,'-1-');
        // for (let a =0; a<result.length ;a++) {
        //     if(result[a].parent_Id != 0){
        //         for(let i =0; i<result.length ;i++)
        //         {
        //             if(result[i].id == result[a].parent_id){
        //                 result[i].children.push({
        //                     ...result[a]
        //                 })
        //                 // 添加进children以后删除该元素
        //                 result.splice(a,1)
        //                 a--
        //             }
                    
        //         }      

        //         // for(const item2 of result){
        //         //     console.log(item2.id,'-1-',item.parent_Id);
        //         //     if(item2.id == item.parent_Id){
        //         //         item2.children.push({
        //         //             ...item
        //         //         })
        //         //     }
        //         // }
        //     }
        // }
        function filterArray(data, parent_id = 0) {
            let vm = this;
            var tree = [];
            var temp;
            for (var i = 0; i < data.length; i++) {
                if (data[i].parent_id == parent_id) {
                    var obj = data[i];
                    temp = filterArray(data, data[i].id);
                    if (temp.length > 0) {
                        obj.children = temp;
                    }
                    tree.push(obj);
                }
            }
            return tree;
        }
        console.log(filterArray(result));
        res.send( {
            status:200,
            message:'获取行李列表成功',
            data:{list:filterArray(result),totalCount: 100}
        })


    })
   
}
