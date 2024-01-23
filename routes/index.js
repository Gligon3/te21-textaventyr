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

const pool = require('../db')

router.get('/dbtest/:id', async (req, res) => {
try{
  const id = req.params.id
  const [parts] = await pool
  .promise()
  .query(`SELECT * FROM  william_part WHERE id = ${id}`)
  const [options] = await pool
  .promise()
  .query(`SELECT * FROM william_option WHERE part_id = ${id}`) 
  res.json({ parts, options})
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
}
})



module.exports = router
