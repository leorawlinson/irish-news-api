const PORT = 3000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const articles = [];

app.get("/", (req, res) => {
  res.json("Welcome to Irish news");
});

app.get("/news", (req, res) => {
  axios
    .get(`https://www.independent.ie/news/`)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(`a:contains("news")`, html).each(function () {
        const title = $(this).text();
        const url = $(this).attr(`href`);
        articles.push({
          title,
          url,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on port${PORT}`));
