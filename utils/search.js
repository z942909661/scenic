function mapSearch(req,res){
    let gongneng = ''
    let i = 0
    for (const key in req.body) {
        if(key == 'limit' || key == 'offset') continue
        if (Object.hasOwnProperty.call(req.body, key)) {
            if(req.body[key]){
                if(i == 0) {
                    gongneng += `${key} like '%${req.body[key]}%'`
                    i++
                }else{
                    gongneng += ` and ${key} like '%${req.body[key]}%'`
                }
            }
           
        }
    }
    return gongneng
}

module.exports = mapSearch