const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/getGeoJson', async (req, res) => {
  try {
    const adcode = req.query.adcode;
    const url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}_full.json`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});


app.get('/getCenter', async(req, res) => {
  try {
    const adcode = req.query.adcode;
    const url = `https://geo.datav.aliyun.com/areas_v3/bound/${adcode}.json`;
    const response = await axios.get(url);
    const center = response.data.features[0].properties.center;
    console.log("🚀 ~ app.get ~ center:", center)
    
    res.json({data: center});
  } catch (error) {
    res.status(500).send(error.message);
  }
})

const PORT = process.env.PORT || 8888;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});