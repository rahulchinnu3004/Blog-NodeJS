const express = require("express");
const bodyPaser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });
const app = express();

app.use(bodyPaser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

const contentSchema = {
    title: String,
    content: String
}

const Content = mongoose.model("Content", contentSchema);


const homecontent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const aboutcontent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
const contactcontent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";



app.get('/', (req, res) => {
    Content.find({}, (err, posts) => {
        res.render('home', {
            data: homecontent,
            posts: posts
        })



    });
});


app.get('/about', (req, res) => {
    res.render('about', { data: aboutcontent });
});
app.get('/contact', (req, res) => {
    res.render('contact', { data: contactcontent });
});
app.get('/compose', (req, res) => {
    res.render('compose');
});
app.post('/compose', (req, res) => {
    var details =
    {
        inputvalue: req.body.input,
        inputtitle: req.body.title
    };
    const content = new Content({
        title: details.inputtitle,
        content: details.inputvalue
    });
    content.save();
    // Content.push(details);
    res.redirect('/');

});

app.get('/contents/:postId', (req, res) => {
    const requestedPostId = req.params.postId;

    Content.findOne({ _id: requestedPostId }, function (err, post) {
        res.render("content", {
            title: post.title,
            msg: post.content
        });
    });


});






app.listen(3000, () => {
    console.log("sever is running on port:3000");
});