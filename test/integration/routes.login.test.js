process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var passportStub = require('passport-stub');

chai.use(chaiHttp);

var server = require('../../app');
var knex = require('../../db/knex');

passportStub.install(server);

describe('POST /auth/login', function(){
	it('should login a user', (done) => {
		chai.request(server)
			.post('/auth/login')
			.send({
				user_emailAddress: 'redperiabras@gmail.com', 
				user_password: '$2a$10$ZlT6wMb4UQ19SYb8p9kbU..FE.ZAJhnijPat4PYz.AFp9lZW/Ikkq'
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

	it('should not login an unregistered user', (done) => {
		chai.request(server)
			.post('/auth/login')
			.send({
				user_emailAddress: 'someone@gmail.com',
				user_password: 'some-password'
			})
			.end((err, res) => {
				should.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(404);
				res.type.should.eql('application/json');
				res.body.status.should.eql('User not found');
				done();
			});
	});

	it('should throw an error if a user is already logged in', (done) => {
		passportStub.login({
			user_emailAddress: 'ebcedillo@gmail.com',
			user_password: 'T3chEvents'
		});
		chai.request(server)
			.post('/auth/login')
			.send({
				user_emailAddress: 'ebcedillo@gmail.com',
				user_password: 'T3chEvents'
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
});