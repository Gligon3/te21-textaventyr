const express = require('express')
const router = express.Router()

const story = require('../data/story.json')

router.get('/', function (req, res) {
  console.log(story.parts[0])
  res.render('index.njk', {
    title: 'Welcome',
    part: story.parts[0],
    username: req.session.username,
  })
})

router.post('/username', function (req, res) {
  req.session.username = req.body.username
  console.log(req.session.username)
  res.redirect('/story/0')
})



router.post('/username', function (req, res) {
  req.session.username = req.body.username
  console.log(req.session.username)
  res.redirect('/story/0')
})

router.get('/story/:id', function (req, res) {
  console.log(req.params.id)
  let part = story.parts.find((part) => part.id === parseInt(req.params.id))
  if (!part) {
    res.status(404).render('404.njk', { title: '404' })
    return
  }

  const name = part.name.replace('[PLAYER]', req.session.username)
  console.log(part)
  part = { ...part, name: name }
  console.log(part)
  res.render('part.njk', { title: part.name, part: part })
})



module.exports = router
