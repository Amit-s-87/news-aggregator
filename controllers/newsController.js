const axios = require('axios');
const fs = require('fs');
const { NEWSAPI_KEY } = require("../configs/env.config");

const usersFilePath = './data/users.json';
const URI_NEWSAPI_TOP = "https://newsapi.org/v2/top-headlines";

const fetchNews = async (req, res) => {
    const { username } = req.user;
    const usersData = JSON.parse(fs.readFileSync(usersFilePath));
    const user = usersData.find(user => user.username === username);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const preferences = user.preferences;
    try {
        const newsArticles = await Promise.all(
            preferences.map(async preference => {
                const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${preference}&apiKey=your-api-key`);
                (URI_NEWSAPI_TOP, {
                    params: {
                        preferences,
                        apiKey: NEWSAPI_KEY,
                    },
                  });
                return response.data.articles;
            })
        );
        // Flatten the array of arrays
        const flattenedNewsArticles = newsArticles.flat();
        res.status(200).json(flattenedNewsArticles);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { fetchNews };
