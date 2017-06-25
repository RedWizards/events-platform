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

	it('should register a user', (done) => {
		chai.request(server)
			.post('/auth/register')
			.send({
				user_emailAddress: 'ebcedillo@gmail.com',
				user_firstName: 'Elaine',
				user_lastName: 'Cedillo',
				user_password: 'T3chEvents'
			})
			.end((err, res) => {
				should.not.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(200);
				res.type.should.eql('application/json');
				res.body.status.should.eql('success');
				done();
			});
	});

	it('should throw an error if a user is logged in', (done) => {
		passportStub.login({
			user_emailAddress: 'redperiabras@gmail.com',
			user_password: 'asdf'
		});
		chai.request(server)
			.post('/auth/register')
			.send({
				user_emailAddress: 'redperiabras@gmail.com',
				user_password: 'asdf'
			})
			.end((err, res) => {
				should.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(400);
				res.type.should.eql('application/json');
				res.body.status.should.eql('You are already logged in');
				done();
			});
	});

	it('should return an error if a registered user is trying to register again', (done) => {
		passportStub.logout();
		chai.request(server)
			.post('/auth/register')
			.send({
				user_emailAddress: 'redperiabras@gmail.com',
				user_password: 'asdf'
			})
			.end((err, res) => {
				should.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(400);
				res.type.should.eql('application/json');
				res.body.status.should.eql('You already signed up');
				done();
			});
	});

});