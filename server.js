const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express();
const PORT = 5000;


mongoose.connect('mongodb+srv://rehanmohd042:ve4Km5TcucminqI0@rehan07.kst6pfo.mongodb.net/urlShortener')
.then(()=>{
    console.log(`mongodb connected to ${PORT}`);
})
.catch((error)=>{
    console.log(error);
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find()
  res.render('index', { shortUrls: shortUrls })
})

app.post('/shortUrls', async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl })

  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })
  if (shortUrl == null) return res.sendStatus(404)

  shortUrl.clicks++
  shortUrl.save()

  res.redirect(shortUrl.full)
})


app.listen(PORT , ()=>{
    console.log(`server started at ${PORT}`);
})