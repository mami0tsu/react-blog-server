import express from "express";
import cors from "cors";
import * as data from "./sample-data.js";

const app = express();
app.use(cors());

app.get("/articles", async (req, res) => {
    const limit = +req.query.limit || 3;
    const offset = +req.query.offset || 0;
    const tag = req.query.tag || null;
    const articles = data.articles;

    if (!tag) {
        res.json({
            rows: articles.slice(offset, offset + limit),
            count: data.articles.length,
        });
        return;
    }

    res.json({    
        rows: articles.filter((article) => {
            return article.tags.some((t) => {
                return t === tag;
            });
        }),
        count: data.articles.length,
    });
});

app.get("/articles/:articleId", async (req, res) => {
    const articleId = +req.params.articleId;
    const article = data.articles.find(
        (article) => article.id === articleId
    );

    if (!article) {
        res.status(404).send("Not Found");
        return;
    }
    
    res.json(article);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});