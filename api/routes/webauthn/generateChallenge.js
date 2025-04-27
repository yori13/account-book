const express = require('express');
const router = express.Router();
const { generateRegistrationOptions } = require('@simplewebauthn/server');

router.post('/', async (req, res) => {
  const { email, userName } = req.body;

  const user = {
    id: Buffer.from(email),
    name: email,
    displayName: userName
  };

  const options = generateRegistrationOptions({
    rpName: 'MyApp',
    rpID: 'localhost',
    user,
    attestationType: 'none'
  });

  res.status(200).json(options);
});

module.exports = router;
