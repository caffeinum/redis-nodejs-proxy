import * as supertest from 'supertest';
import app from './App';

describe('App', () => {
  it('works',
    () => supertest(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/));

  it('can fetch some keys',
    () => supertest(app)
      .get('/test1')
      .expect(200)
      .expect('Content-Type', /json/));

  it('can fetch another key from storage',
    () => supertest(app)
      .get('/test2-test')
      .expect(200)
      .expect('Content-Type', /json/));

  it('can fetch general info',
    () => supertest(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/));
});
