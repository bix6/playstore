const app = require('../app');
const expect = require('chai').expect;
const supertest = require('supertest');

describe('GET /apps', () => {
    it('should return json array', () => {
        return supertest(app)
            .get('/apps')
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
            });
    });
    it('should return 400 bad sort', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'ahhh' })
            .expect(400, 'Sort must be rating or app');
    });
    it('should return 400 bad genres', () => {
        return supertest(app)
            .get('/apps')
            .query({ genres: 'ahhhh' })
            .expect(400);
    });
    it('should sort by rating', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: 'rating' })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true;
                let i = 0;

                while(i < res.body.length - 1) {
                    if (res.body[i].Rating < res.body[i+1].Rating) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            });
    });
    it('should sort by app', () => {
        return supertest(app)
            .get('/apps')
            .query({ sort: "app" })
            .expect(200)
            .expect('Content-Type', /json/)
            .then(res => {
                expect(res.body).to.be.an('array');
                let sorted = true
                let i = 0

                while(i < res.body.length - 1) {
                    const curApp = res.body[i].App.toLowerCase();
                    const nextApp = res.body[i+1].App.toLowerCase();
                    if(curApp > nextApp) {
                        sorted = false;
                        break;
                    }
                    i++;
                }
                expect(sorted).to.be.true;
            })
    });
});