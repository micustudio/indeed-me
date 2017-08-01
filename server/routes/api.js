const express = require('express');
const router = express.Router();
const request = require('request');

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/* Talk to Indeed. */
router.post('/posts', (req, res) => {
  console.log("the incoming body is.....");
  console.log(req.body);

  const builtLink = `
    http://api.indeed.com/ads/apisearch?publisher=8280467879034728
    &q=java
    &format=json
    &l=austin%2C+tx
    &sort=
    &radius=
    &st=
    &jt=
    &start=
    &limit=
    &fromage=
    &filter=
    &latlong=1
    &co=us
    &chnl=
    &userip=1.2.3.4
    &useragent=Mozilla/%2F4.0%28Firefox%29
    &v=2
    `

  let indeedLink = 'http://api.indeed.com/ads/apisearch?publisher=8280467879034728&q=java&format=json&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2';
  request(indeedLink, function (error, response, body) {
        res.status(200).send(body);
  });
});

module.exports = router;