const request = require('supertest');
const { expect } = require('chai');
const app = require('./index'); 

describe('GET /', () => {
  it('should return a 200 status code and a song with an animal and its sound', async () => {
    const res = await request(app)
      .get('/')
      .expect(200);

    expect(res.text).to.include('George Orwell had a farm.');
    expect(res.text).to.include('E-I-E-I-O');
    expect(res.text).to.match(/And on his farm he had a \w+\./);
    expect(res.text).to.match(/With a \w+-\w+ here\./);
    expect(res.text).to.match(/And a \w+-\w+ there\./);
    expect(res.text).to.match(/Here a \w+, there a \w+\./);
    expect(res.text).to.match(/Everywhere a \w+-\w+\./);
  });
});

describe('GET /api', () => {
  it('should return a 200 status code and the animals JSON', async () => {
    const res = await request(app)
      .get('/api')
      .expect(200);

    expect(res.body).to.be.an('object');
    expect(res.body).to.have.all.keys('cat', 'dog', 'eel', 'bear', 'frog', 'lion', 'bird', 'cow');
  });
});

describe('Error handling', () => {
  it('should return a 500 status code and an error message', async () => {
    // Simulamos un error forzado en la ruta '/'
    app.get('/force-error', (req, res, next) => {
      next(new Error('Forced error'));
    });

    const res = await request(app)
      .get('/force-error')
      .expect(500);

    expect(res.text).to.equal('Something went wrong!');
  });
});