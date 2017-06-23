process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var passportStub = require('passport-stub');

chai.use(chaiHttp);

var server = require('../../app');
var knex = require('../../db/knex');

passportStub.install(server);

describe('GET /user', function(){
	it('should register a success', (done) => {
		passportStub.login({
			user_emailAddress: 'ebcedillo@gmail.com',
			user_password: 'T3chEvents'
		});

		chai.request(server)
			.get('/user')
			.end((err, res) => {
				should.not.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(200);
				res.type.should.eql('application/json');
				res.body.status.should.eql('success');
				done();
			});
	});
	it('should throw an error if a user is not logged in', (done) => {
		chai.request(server)
			.get('/user')
			.end((err, res) => {
				should.exist(err);
				res.redirects.length.should.eql(0);
				res.status.should.eql(401);
				res.type.should.eql('application/json');
				res.body.status.should.eql('Please Log In');
				done();
			})
	})
});