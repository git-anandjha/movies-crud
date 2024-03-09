import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';

chai.use(chaiHttp);
const { expect } = chai;

describe('User API', () => {
  it('should register a new user', (done) => {
    chai
      .request(server)
      .post('/user/register')
      .send({
        email: 'tosendanandss@gmail.com',
        password: 'password',
        firstName: 'Anand',
        lastName: 'Jha',
        role: 'admin',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('email');
        done();
      });
  });

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
        done();
      });
  });
});
