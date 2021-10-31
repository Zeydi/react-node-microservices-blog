const express = require('express');
const { randomBytes } = require('crypto');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const port = 4001;

const posts = {};

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    res.send(commentsByPostId[postId] || [])
})

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const  postId  = req.params.id;
    const { content } = req.body;
    
    const comments = commentsByPostId[postId] || [];
    comments.push({id : commentId, content});
    commentsByPostId[postId] = comments;

    res.status(201)
})

app.listen(port, () => {
    console.log(`listening on ${port}`)
})


 