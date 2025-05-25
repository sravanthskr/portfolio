const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;
    if (!fullname || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }
    const newContact = new Contact({ fullname, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Contact saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};