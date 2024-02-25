const fs = require('fs');

const usersFilePath = './users.json';

const ENUM_CATEGORIES = [
    "business",
    "entertainment",
    "general",
    "health",
    "science",
    "sports",
    "technology",
  ];


const getPreferences = (req,res)=>{
    console.log(req.user);
    const usersData = JSON.parse(fs.readFileSync(usersFilePath));
    const userIndex = usersData.findIndex(user => user.username === req.user.username);
    res.json(usersData[userIndex].preferences);
}

const isValidPreference = (preference) => ENUM_CATEGORIES.includes(preference);

const updatePreferences = (req, res) => {
    const { username } = req.user;
    const newPreferences = req.body.preferences.toLowerCase();
    // Assume that preferences are stored in an array
    
    if (isValidPreference(newPreferences) ) {
        const usersData = JSON.parse(fs.readFileSync(usersFilePath));
        const userIndex = usersData.findIndex(user => user.username === username);
        if (userIndex === -1) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        usersData[userIndex].preferences = newPreferences;
        fs.writeFileSync(usersFilePath, JSON.stringify(usersData, null, 2));
    
        res.status(200).json({ message: 'Preferences updated successfully' });
    }
    else{
        const enumOPtions = 'Invalid Preferencce! Valid preferences are: ' + ENUM_CATEGORIES.join(', ');
        console.log(enumOPtions)
        res.status(401).json({ message: enumOPtions });
    }
   
};

module.exports = { getPreferences, updatePreferences };
