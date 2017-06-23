process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var passportStub = require('passport-stub');

chai.use(chaiHttp);

var server = require('../../app');
var knex = require('../../db/knex');

passportStub.install(server);

describe('POST /auth/register', () => {
	it('should throw an error if a user is logged in', (done) => {
		passportStub.login({
			user_emailAddress: 'ebcedillo@gmail.com',
			user_password: 'T3chEvents'
		});

		chai.request(server)
			.post('/auth/register')
			.send({
				user_emailAddress: 'ebcedillo@gmail.com',
				user_password: 'herman'
			})
			.end((err, res) => {
				should.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(401);
				res.type.should.eql('application/json');
				res.body.status.should.eql('You are already logged in');
				done();
			});
	});
	it('should throw an error if the passwod is less than 6 characters', (done) => {
		chai.request(server)
			.post('/auth/register')
			.send({
				user_emailAddress: 'ebcedillo@gmail.com',
				user_password: 'aaaa'
			})
			.end((err, res) => {
				should.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(400);
				res.type.should.eql('application/json');
				res.body.status.should.eql('Password must be at least 6 characters');
				done();
			});
	});
});