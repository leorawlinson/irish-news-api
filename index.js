const PORT = 3000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

app.listen(PORT, () => console.log(`Server running on port${PORT}`));
