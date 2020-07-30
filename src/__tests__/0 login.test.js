import 'dotenv/config.js';
// import request from 'supertest';
import faker from 'faker';
import chai, { expect } from 'chai';
import chaiuuid from 'chai-uuid';
import { PASSWORD_MIN_LENGTH } from '../constants.js';
// import { INITIAL_USER_LOGIN, INITIAL_USER_PASSWORD } from '../../common/constants.js';

chai.use(chaiuuid);
// const req = request(process.env.TEST_API_URL);

describe('Login check', function () {
  this.timeout(10000000);
  describe('Login schema sanity checks', function () {
    it('[POST] login without email & password ("400 Bad Request" - "invalid schema")', function () {
      // return new Promise((resolve, reject) => {
      //   req
      //     .post('/user/login')
      //     .set('Accept', 'application/json')
      //     .expect(400)
      //     .end((err, res) => {
      //       if (err) return reject(err);
      //       expect(res.body.status).to.equal('error');
      //       expect(res.body.message).to.equal('invalid schema');
      //       resolve();
      //     });
      // });
    });
    // it('[POST] login without email ("400 Bad Request" - "invalid schema")', function () {
    //   return new Promise((resolve, reject) => {
    //     req
    //       .post('/user/login')
    //       .set('Accept', 'application/json')
    //       .send({ password: faker.random.alphaNumeric(PASSWORD_MIN_LENGTH) })
    //       .expect(400)
    //       .end((err, res) => {
    //         if (err) return reject(err);
    //         expect(res.body.status).to.equal('error');
    //         expect(res.body.message).to.equal('invalid schema');
    //         resolve();
    //       });
    //   });
    // });
    // it('[POST] login without password ("400 Bad Request" - "invalid schema")', function () {
    //   return new Promise((resolve, reject) => {
    //     req
    //       .post('/user/login')
    //       .set('Accept', 'application/json')
    //       .send({ email: faker.internet.email() })
    //       .expect(400)
    //       .end((err, res) => {
    //         if (err) return reject(err);
    //         expect(res.body.status).to.equal('error');
    //         expect(res.body.message).to.equal('invalid schema');
    //         resolve();
    //       });
    //   });
    // });
    // it('[POST] login with bad email type ("400 Bad Request" - "invalid schema")', function () {
    //   return new Promise((resolve, reject) => {
    //     req
    //       .post('/user/login')
    //       .set('Accept', 'application/json')
    //       .send({ email: 0 })
    //       .send({ password: faker.random.alphaNumeric(PASSWORD_MIN_LENGTH) })
    //       .expect(400)
    //       .end((err, res) => {
    //         if (err) return reject(err);
    //         expect(res.body.status).to.equal('error');
    //         expect(res.body.message).to.equal('invalid schema');
    //         resolve();
    //       });
    //   });
    // });
    // it('[POST] login with bad password type ("400 Bad Request" - "invalid schema")', function () {
    //   return new Promise((resolve, reject) => {
    //     req
    //       .post('/user/login')
    //       .set('Accept', 'application/json')
    //       .send({ email: faker.internet.email() })
    //       .send({ password: 0 })
    //       .expect(400)
    //       .end((err, res) => {
    //         if (err) return reject(err);
    //         expect(res.body.status).to.equal('error');
    //         expect(res.body.message).to.equal('invalid schema');
    //         resolve();
    //       });
    //   });
    // });
    // it('[POST] login with short password ("400 Bad Request" - "invalid schema")', function () {
    //   return new Promise((resolve, reject) => {
    //     req
    //       .post('/user/login')
    //       .set('Accept', 'application/json')
    //       .send({ email: '' })
    //       .send({ password: faker.random.alphaNumeric(PASSWORD_MIN_LENGTH - 1) })
    //       .expect(400)
    //       .end((err, res) => {
    //         if (err) return reject(err);
    //         expect(res.body.status).to.equal('error');
    //         expect(res.body.message).to.equal('invalid schema');
    //         resolve();
    //       });
    //   });
    // });
    // it('[POST] login with bad email value ("400 Bad Request" - "invalid schema")', function () {
    //   return new Promise((resolve, reject) => {
    //     req
    //       .post('/user/login')
    //       .set('Accept', 'application/json')
    //       .send({ email: 'login' })
    //       .send({ password: faker.random.alphaNumeric(PASSWORD_MIN_LENGTH) })
    //       .expect(400)
    //       .end((err, res) => {
    //         if (err) return reject(err);
    //         expect(res.body.status).to.equal('error');
    //         expect(res.body.message).to.equal('invalid schema');
    //         resolve();
    //       });
    //   });
    // });
    // it('[POST] login with bad valid_days type ("400 Bad Request" - "invalid schema")', function () {
    //   return new Promise((resolve, reject) => {
    //     req
    //       .post('/user/login')
    //       .set('Accept', 'application/json')
    //       .send({ email: faker.internet.email() })
    //       .send({ password: faker.random.alphaNumeric(PASSWORD_MIN_LENGTH) })
    //       .send({ valid_days: 'abc' })
    //       .expect(400)
    //       .end((err, res) => {
    //         if (err) return reject(err);
    //         expect(res.body.status).to.equal('error');
    //         expect(res.body.message).to.equal('invalid schema');
    //         resolve();
    //       });
    //   });
  });
  //   it('[POST] login with bad valid_days value ("400 Bad Request" - "invalid schema")', function () {
  //     return new Promise((resolve, reject) => {
  //       req
  //         .post('/user/login')
  //         .set('Accept', 'application/json')
  //         .send({ email: faker.internet.email() })
  //         .send({ password: faker.random.alphaNumeric(PASSWORD_MIN_LENGTH) })
  //         .send({ valid_days: 0 })
  //         .expect(400)
  //         .end((err, res) => {
  //           if (err) return reject(err);
  //           expect(res.body.status).to.equal('error');
  //           expect(res.body.message).to.equal('invalid schema');
  //           resolve();
  //         });
  //     });
  //   });
  // });
  // describe('Login', function () {
  //   it('[POST] invalid user credentials ("403 Forbidden" - "access denied")', function () {
  //     return new Promise((resolve, reject) => {
  //       req
  //         .post('/user/login')
  //         .set('Accept', 'application/json')
  //         .send({ email: faker.internet.email() })
  //         .send({ password: faker.random.alphaNumeric(PASSWORD_MIN_LENGTH) })
  //         .expect(403)
  //         .end((err, res) => {
  //           if (err) return reject(err);
  //           expect(res.body.message).to.equal('access denied');
  //           resolve();
  //         });
  //     });
  //   });
  //   it('[POST] bad password ("403 Forbidden" - "access denied")', function () {
  //     return new Promise((resolve, reject) => {
  //       req
  //         .post('/user/login')
  //         .set('Accept', 'application/json')
  //         .send({ email: INITIAL_USER_LOGIN })
  //         .send({ password: faker.random.alphaNumeric(PASSWORD_MIN_LENGTH) })
  //         .expect(403)
  //         .end((err, res) => {
  //           if (err) return reject(err);
  //           expect(res.body.message).to.equal('access denied');
  //           resolve();
  //         });
  //     });
  //   });
  //   it('[POST] successful authorization ("200 Ok")', function () {
  //     return new Promise((resolve, reject) => {
  //       req
  //         .post('/user/login')
  //         .set('Accept', 'application/json')
  //         .send({ email: INITIAL_USER_LOGIN })
  //         .send({ password: INITIAL_USER_PASSWORD })
  //         .expect(200)
  //         .end((err, res) => {
  //           if (err) return reject(err);
  //           expect(res.body.token).to.be.a('string');
  //           resolve();
  //         });
  //     });
  //   });
  //   it('[POST] successful login [valid_days=100]  ("200 Ok")', function () {
  //     return new Promise((resolve, reject) => {
  //       req
  //         .post('/user/login')
  //         .set('Accept', 'application/json')
  //         .send({ email: INITIAL_USER_LOGIN })
  //         .send({ password: INITIAL_USER_PASSWORD })
  //         .send({ valid_days: 100 })
  //         .expect(200)
  //         .end((err, res) => {
  //           if (err) return reject(err);
  //           expect(res.body.token).to.be.a('string');
  //           resolve();
  //         });
  //     });
  //   });
  // });
});
