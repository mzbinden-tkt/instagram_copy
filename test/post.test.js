// test/post.js
const expect = require('chai').expect
const fetch = require('node-fetch')
const { createUser } = require('./user.test')
const URL = 'http://localhost:3000/api/posts'

describe('API Posts', () => {
  let idPost
  describe('CREATE POST', () => {
    it('create post status 201', async () => {
      const json = await createUser()
      const options = {
        method: 'POST',
        body: JSON.stringify({
          title: 'titulo007',
          image:
            'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=',
          description: 'esto es una descripcion 02',
          author: json.res.data.id,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(URL, options)
      expect(res.status).to.equal(201)
    })

    it('create post status 400', async () => {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          title: 'titulo007',
          description: 'esto es una descripcion 02',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(URL, options)
      expect(res.status).to.equal(400)
    })
  })

  describe('GET ALL', () => {
    it('get post status 200', async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(`${URL}/10/1`, options)
      expect(res.status).to.equal(200)
    })
  })

  describe('GET BY ID', () => {
    it('get post status 200', async () => {
      const json = await this.createPost()
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(`${URL}/${json.res.data.id}`, options)
      expect(res.status).to.equal(200)
    })

    it('get post status 404', async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(`${URL}/60a51f20abbecb38ec0883ee`, options)
      expect(res.status).to.equal(404)
    })

    it('get post status 400', async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(`${URL}/1111`, options)
      expect(res.status).to.equal(400)
    })
  })
})

exports.createPost = async () => {
  const json1 = await createUser()
  const options = {
    method: 'POST',
    body: JSON.stringify({
      title: 'titulo007',
      image:
        'TWFuIGlzIGRpc3Rpbmd1aXNoZWQsIG5vdCBvbmx5IGJ5IGhpcyByZWFzb24sIGJ1dCBieSB0aGlzIHNpbmd1bGFyIHBhc3Npb24gZnJvbSBvdGhlciBhbmltYWxzLCB3aGljaCBpcyBhIGx1c3Qgb2YgdGhlIG1pbmQsIHRoYXQgYnkgYSBwZXJzZXZlcmFuY2Ugb2YgZGVsaWdodCBpbiB0aGUgY29udGludWVkIGFuZCBpbmRlZmF0aWdhYmxlIGdlbmVyYXRpb24gb2Yga25vd2xlZGdlLCBleGNlZWRzIHRoZSBzaG9ydCB2ZWhlbWVuY2Ugb2YgYW55IGNhcm5hbCBwbGVhc3VyZS4=',
      description: 'esto es una descripcion 02',
      author: json1.res.data.id,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const response = await fetch(URL, options)
  const json = await response.json()
  return json
}
