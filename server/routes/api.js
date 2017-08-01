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

  const query = req.body.query;
  const location = req.body.location;
  const sort = req.body.sort;
  const radius = req.body.radius;
  const start = req.body.start;
  const limit = req.body.limit;
  const fromage = req.body.fromage;
  const sitetype = req.body.sitetype;
console.log(`${query} ${location} ${sort} ${radius} ${start} ${limit} ${fromage} ${sitetype}`)

  const builtLink = `
    http://api.indeed.com/ads/apisearch?publisher=8280467879034728&q=${query}&format=json&l=${location}&sort=${sort}&radius=${radius}&st=${sitetype}&jt=&start=${start}&limit=${limit}&fromage=${fromage}&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2`

    console.log("The built link is...");
    console.log(builtLink);

  let indeedLink = 'http://api.indeed.com/ads/apisearch?publisher=8280467879034728&q=java&format=json&l=austin%2C+tx&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=1&co=us&chnl=&userip=1.2.3.4&useragent=Mozilla/%2F4.0%28Firefox%29&v=2';
  request(builtLink, function (error, response, body) {
        res.status(200).send(body);
  });
});

/* Talk to Indeed. */
router.post('/description', (req, res) => {
  console.log("the incoming url is.....");
  console.log(req.body.url);
  request(req.body.url, function (error, response, body) {
        let html = body;
        let descriptionAlpha = html.substring(html.indexOf('<span id="job_summary"'));
        let description = descriptionAlpha.substring(0, descriptionAlpha.indexOf('</span>') + ('</span>').length);

        console.log(description);
        
        res.status(200).send({
          description: description
        });
  });
});

module.exports = router;