/* eslint-disable quotes */
const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const favicon = require('serve-favicon');
const path = require('path');
const dotenv = require('dotenv');
const Recaptcha = require('express-recaptcha').RecaptchaV3;

const homeStartingContent =
  'Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.';
const aboutContent =
  'This is a simple blog, created to practice programming concepts with NodeJS. To create a blog post click on the compose option.';
const contactContent = 'Contact me by submitting the form below.';
const posts = [];

const app = express();

app.set('view engine', 'ejs');
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

dotenv.config();
const { RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY } = process.env;
const recaptcha = new Recaptcha(RECAPTCHA_SITE_KEY, RECAPTCHA_SECRET_KEY);

app.get('/', (req, res) => {
  res.render('home', { title: 'Home', homeStartingContent, posts });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About', aboutContent });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact', contactContent });
});

app.get('/compose', (req, res) => {
  res.render('compose', { title: 'Compose' });
});

app.get('/posts/title/:title', (req, res) => {
  const requestedTitle = _.lowerCase(req.params.title);
  console.log(requestedTitle);
  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render('post', { postTitle: post.title, postContent: post.content });
    }
  });
});

app.post('/compose', (req, res) => {
  recaptcha.verify(req, (error, data) => {
    if (!error) {
      // success code
      const post = {
        title: req.body.postTitle,
        content: req.body.postBody,
      };
      posts.push(post);
      res.redirect('/');
    } else {
      // error code
      console.log(`Captcha error ${error}`);
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server started on port 3000');
});
