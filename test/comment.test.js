// test/comment.js
const expect = require('chai').expect
const chai = require('chai')
const fetch = require('node-fetch')
const { createPost } = require('./post.test')

const URL = 'http://localhost:3000/api/comments'

describe('API Comments', () => {
  describe('CREATE COMMENT', () => {
    it('comment status 200', async () => {
      const json = await createPost()
      const options = {
        method: 'POST',
        body: JSON.stringify({
          content: 'hola soy un comentario',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(`${URL}/${json.res.data.id}`, options)
      expect(res.status).to.equal(200)
    })

    it('comment status 400', async () => {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          content: 'hola soy un comentario',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(`${URL}/60as9e7470220d2970df01e0`, options)
      expect(res.status).to.equal(400)
    })
  })
})
