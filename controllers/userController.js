const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const { JWT_SECRET } = require("../configs/env.config");

const usersFilePath = './users.json';

function generateAccessToken(username) {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: 86400 });
  }

const registerUser = async (req, res) => {
    const { username, password, preferences } = req.body;
    if (!username || !password ) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const usersData = JSON.parse(fs.readFileSync(usersFilePath));
    const user = usersData.find(user => user.username === username);
    if (user) {
        return res.status(401).json({ message: 'Username is already exist! Provide different Username.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: Date.now().toString(), username, password: hashedPassword, preferences };
    
    usersData.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));

    res.status(201).json({ message: 'User registered successfully' });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    const usersData = JSON.parse(fs.readFileSync(usersFilePath));
    const user = usersData.find(user => user.username === username);
    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(username);
    return res.status(200).json({ message: "Login successful", accessToken });
};

module.exports = { registerUser, loginUser };
