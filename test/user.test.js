// test/post.js
const expect = require('chai').expect
const chai = require('chai')
const fetch = require('node-fetch')

const URL = 'http://localhost:3000/api/users'

describe('API Users', () => {
  describe('CREATE USER', () => {
    it('create user status 201', async () => {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          username: Math.random().toString(36).substring(7),
          password: 'Password',
          email: 'email@email.com',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(URL, options)
      expect(res.status).to.equal(201)
    })

    it('create user status 400', async () => {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          username: Math.random().toString(36).substring(7),
          password: 'Password',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(URL, options)
      expect(res.status).to.equal(400)
    })
  })

  describe('GET BY ID', () => {
    it('get user status 200', async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const json = await this.createUser()
      const response = await fetch(`${URL}/${json.res.data.id}`, options)
      expect(response.status).to.equal(200)
    })

    it('get user status 404', async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(`${URL}/60a51f20abbecb38ec0883ee`)
      expect(res.status).to.equal(404)
    })

    it('get user status 400', async () => {
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

  describe('GET POST BY USER', () => {
    it('get posts user status 200', async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const json = await this.createUser()
      const response = await fetch(`${URL}/posts/${json.res.data.id}`, options)
      expect(response.status).to.equal(200)
    })

    it('get posts user status 404', async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(`${URL}/posts/60a51f20abbecb38ec0883ee`)
      expect(res.status).to.equal(404)
    })

    it('get posts user status 400', async () => {
      const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      const res = await fetch(`${URL}/posts/1111`, options)
      expect(res.status).to.equal(400)
    })
  })
})

exports.createUser = async () => {
  const options = {
    method: 'POST',
    body: JSON.stringify({
      username: Math.random().toString(36).substring(7),
      password: 'Password',
      email: 'email@email.com',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  }
  const res = await fetch(URL, options)
  const json = await res.json()
  return json
}
