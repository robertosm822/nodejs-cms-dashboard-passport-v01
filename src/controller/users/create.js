const mongoose = require('mongoose')
const bcrypt = require('bcrypt-nodejs')
const User = require('./../../model/user')

module.exports = (req, res) => {
    let user = new User(req.body)

    user.password = user.genHash(user.password)
	/*
    user
        .save()
        .then((user) => {
            return res.redirect('/')
        })
        .catch((error) => {
            console.log(error)
            return res.send("Ok")
        })
	*/
		// create a new user
		  
		user
			.save()
			.then((created) => {
				if (!created) {
					return res.status(404)
							  .json({ status: false, data: {} })
				}

				return res.status(201)
						  .json({ status: true, data: created })
			})
			.catch(err => res.status(500)
							 .json({ status: false, data: {} }) 
			)	
		
}