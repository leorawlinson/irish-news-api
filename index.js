const PORT = 3000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();

const articles = [];

const newspapers = [{}];

app.get("/", (req, res) => {
  res.json("Welcome to Irish news");
});

app.get("/news", (req, res) => {
  axios
    .get(`https://www.irishnews.com/news/`)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      const article = $(`article`);

      console.log(article);

      //!Only targets first anchor tag on the page!/

      //target each article and use the child elements in the article tag?? or use cheerio twice to target different elements??

      $(`article:contains("irishnews")`, html).each(function () {
        const url = $(this).attr(`href`);
        articles.push({
          url,
        });
      });
      res.json(articles);
    })
    .catch((err) => console.log(err));
});

app.listen(PORT, () => console.log(`Server running on port${PORT}`));
