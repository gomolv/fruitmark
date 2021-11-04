const request = require('../src/index');
const supertest = require('supertest');
const expect = require('chai').expect;


describe("GET /user", (_) => {
    it("Testing route", (done) => {
        supertest(request)
        .get('/user')
        .expect(200)
        .expect((response) => {
            expect(response.body.status)===true;
            expect(response.body.res)==="BIENVENUE";
    }).end((err) => {
        if (err) return done(err);

        return done();
    });
});
});