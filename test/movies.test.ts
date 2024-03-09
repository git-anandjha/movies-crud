import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

chai.use(chaiHttp);
const { expect } = chai;

describe('Movies API', () => {
  let movieId;
  let token = 'your_auth_token';

  beforeAll(() => {
    it('should login a user', (done) => {
      chai
        .request(server)
        .post('/user/login')
        .send({
          email: 'tosendanandss@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.property('token');
          token = res.body.token;
          done();
        });
    });
  });

  it('should create a new movie', (done) => {
    chai
      .request(server)
      .post('/movies')
      .send({
        title: 'The Dark Knight',
        genre: 'Action',
        rating: 9.0,
        streamingLink: 'https://www.youtube.com/watch?v=EXeTwQWrcwY',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        movieId = res.body._id;
        done();
      });
  });

  it('should list movies', (done) => {
    chai
      .request(server)
      .get('/movies?page=1&limit=1')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should search movies', (done) => {
    chai
      .request(server)
      .get('/movies/search?page=1&limit=1&q=knight')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  it('should update a movie', (done) => {
    chai
      .request(server)
      .put(`/movies/${movieId}`)
      .set('x-auth-token', token)
      .send({
        title: 'Updated Movie Title',
        genre: 'Updated Genre',
        rating: 8.5,
        streamingLink: 'https://www.example.com',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should delete a movie', (done) => {
    chai
      .request(server)
      .delete(`/movies/${movieId}`)
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
