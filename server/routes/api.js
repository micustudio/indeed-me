const express = require('express');
const router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* Talk to B indeed. */
router.get('/b', (req, res) => {
  res.send('Bro to the B works');
});

module.exports = router;