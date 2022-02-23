const handleProfile = (req, res, db) => {
    const { id } = req.params
    db.select('*').from('users').where({
        id:id
    })
    .then(user => {
        if(user.length < 1){
            res.status(400).json('user doesn\'t exist')
        }else{
            res.json(user[0])
        }
    })
}

module.exports = {
            handleProfile
}