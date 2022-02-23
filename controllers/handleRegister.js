const handleRegister = (req, res, db, bcrypt) => {
    const { name, email, password } = req.body
    if(!name || !email || !password){
        return res.status(400).json('Incorrect Details: All fields must be filled in')
    }
    const hash = bcrypt.hashSync(password)

    db.transaction(trx => {

        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
                    .returning('*')
                    .insert({
                    email: loginEmail[0].email,
                    name: name,
                    joined: new Date()
                })
        .then(user => res.json(user[0]))   
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('could not register user'))
}

module.exports = { 
        handleRegister
}