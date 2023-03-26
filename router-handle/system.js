const db = require('../db')
module.exports = (req,res) => {
    let sql = 'select * from ev_roleinfo'
    db.query(sql,(err,result) => {
        if(err) return err
        const totalCount = result.length
        res.send({
            status: 200,
            data:{
                list:result,
                totalCount:totalCount
            }
        })
    })
}
