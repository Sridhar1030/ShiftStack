import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	try {
		const { username, email, password } = req.body;
		const existing = await User.findOne({ email });
		if (existing)
			return res.status(400).json({ message: "User already exists" });

		const hash = await bcrypt.hash(password, 10);
		const newUser = await User.create({ username, email, password: hash });
		res.status(201).json({
			message: "User created",
			user: newUser.username,
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ message: "Invalid credentials" });

		const match = await bcrypt.compare(password, user.password);
		if (!match)
			return res.status(400).json({ message: "Invalid credentials" });

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1h",
		});
		res.status(200).json({ token });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
