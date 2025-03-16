const mongoose = require("mongoose")
const { Usermodel } = require("../model/userModel")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = {
	async registerUser(req, res) {
		try {
			const { email, password, role } = req.body
			const existingUser = await Usermodel.findOne({ email })
			if (existingUser) {
				res.status(400).send({ message: "User Alredy Registered", access: false })
			} else {
				const hashedPassword = bcrypt.hashSync(password, 8);
				const LastUserId = await Usermodel.findOne().sort({ id: -1 }).limit(1)
				const id = LastUserId ? parseInt(LastUserId.id) + 1 : 1
				const strID = id.toString()

				const newUser = await new Usermodel({ id: strID, email: email, password: hashedPassword, role: role })
				await newUser.save()
				res.status(201).send({ message: "User registered successfully", access: true });
			}
		} catch (e) {
			res.status(400).send("Error")
		}
	},

	async verifyUser(req, res) {
		const { email, password } = req.body
		try {
			const UserPresent = await Usermodel.findOne({ email })
			if (UserPresent) {
				const passwordIsValid = bcrypt.compareSync(password, UserPresent.password);
				if (!passwordIsValid) return res.status(401).send({ message: 'Invalid password', auth: false });

				const token = jwt.sign({ id: UserPresent.email }, 'secret', { expiresIn: 86400 });
				res.status(200).send({ message: "Successfully Logedin", auth: true, token,data : UserPresent });
			} else {
				res.status(404).send({ message: "Please Register YourSelf", auth: false });
			}
		} catch (e) {
			res.status(404).send({ message: "server error null", auth: false });
		}
	}
}
