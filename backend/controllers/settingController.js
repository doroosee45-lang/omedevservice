const Setting = require('../models/Setting');

// Récupérer tous les paramètres
const getSettings = async (req, res) => {
  const settings = await Setting.find();
  const settingsObj = {};
  settings.forEach(s => { settingsObj[s.key] = s.value; });
  res.json(settingsObj);
};

// Mettre à jour un ou plusieurs paramètres
const updateSettings = async (req, res) => {
  const updates = req.body;
  for (const [key, value] of Object.entries(updates)) {
    await Setting.findOneAndUpdate(
      { key },
      { key, value },
      { upsert: true, new: true }
    );
  }
  res.json({ message: 'Paramètres mis à jour' });
};

module.exports = { getSettings, updateSettings };