const db = require("../db");
exports.getLuggageList = (req, res) => {
    let sql = 'SELECT * from ev_luggage'
    db.query(sql,(err,result) => {
        if(err) return res.cc(err)
        const length = result.length
        res.send({ 
            status:200,
            message:'获取行李列表成功',
            data:{list:result,totalCount: length}
        })
    })
};
