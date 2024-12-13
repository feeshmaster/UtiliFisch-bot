const express = require("express");
const axios = require("axios");
const cors = require("cors");
require('dotenv').config()
const app = express();
const PORT = 3000;


app.use(cors());
app.use(express.json());


app.get("/proxy/private-servers", async (req, res) => {
  const { gameId } = req.query;

  if (!gameId) {
    return res.status(400).send({ error: "game id is required :/" });
  }

  try {
    const robloxUrl = `https://games.roblox.com/v1/games/${gameId}/private-servers`;
    const response = await axios.get('https://games.roblox.com/v1/games/16732694052/private-servers', {
        headers: {
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
          'accept-language': 'en-US,en;q=0.9',
          'cache-control': 'max-age=0',
          'cookie': process.env.COOKIES,
          'priority': 'u=0, i',
          'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
          'sec-ch-ua-mobile': '?0',
          'sec-ch-ua-platform': '"Windows"',
          'sec-fetch-dest': 'document',
          'sec-fetch-mode': 'navigate',
          'sec-fetch-site': 'none',
          'sec-fetch-user': '?1',
          'upgrade-insecure-requests': '1',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
        }
      });
      

    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error fetching data from Roblox API:", error.message);
    res.status(500).send({ error: `Failed to fetch data
        
        error:${error}` });//this looks weird when you view it lol
  }
});

function serve() {
  app.listen(PORT, () => {
    console.log(`Proxy server is running on http://localhost:${PORT}`);
  });
}

module.exports = serve; 
