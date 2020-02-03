const request = require('supertest');
const server = require('../server');

describe('server.js module', ()=>{
    describe('/api', ()=>{
        it('returns 200', ()=>{
            request(server).get('/api').expect(200).expect("Server is running")
        })
    })
    
    describe('/api/auth/register', ()=>{
        it('returns 201', ()=>{
            return request(server).post('/api/auth/register').send({
                username:"Bob",
                password:"12345",
                user_type:'volunteer',
                contact_number:"1-234-567-89-01",
                name:'Robert'
            }).expect(201).expect(res=>res.body.id===3)
        })
    })
    describe('/api/auth/login', ()=>{
        it('returns 200', ()=>{
            request(server).get('/api').expect(200).expect("Server is running")
        })
    })

})