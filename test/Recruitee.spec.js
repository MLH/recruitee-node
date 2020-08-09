const nock = require('nock');
const { expect } = require('chai');

const Recruitee = require('../lib/Recruitee');
const RecruiteeError = require('../lib/RecruiteeError');

const TEST_COMPANY_ID = 'FAKECOMPANY';
const TEST_API_TOKEN = 'FAKETOKEN';

describe('Recruitee', () => {
  const client = new Recruitee(TEST_COMPANY_ID, TEST_API_TOKEN);

  after(() => {
    nock.cleanAll();
  });

  describe('request', () => {
    describe('request', () => {
      it('returns a response object on successful request', async () => {
        const scope = nock('https://api.recruitee.com')
          .get(`/c/${TEST_COMPANY_ID}/somepath`)
          .reply(200, 'test response');

        const res = await client.request('GET', '/somepath');

        expect(res.statusCode).to.deep.equal(200);
        expect(res.body).to.deep.equal('test response');

        scope.done();
      });

      it('throws a recruitee error object on exceptional response', async () => {
        const scope = nock('https://api.recruitee.com')
          .get(`/c/${TEST_COMPANY_ID}/somepath`)
          .reply(401, { error: ['an error occurred'] });

        try {
          await client.request('GET', '/somepath');
          throw Error('An error was not thrown as expected');
        } catch (e) {
          expect(e).to.be.an.instanceOf(RecruiteeError);
          expect(e.statusCode).to.deep.equal(401);
          expect(e.toString()).to.deep.equal(
            'RecruiteeError: [HTTP 401] an error occurred',
          );
        } finally {
          scope.done();
        }
      });

      it('throws a normal error object on exceptional request', async () => {
        const scope = nock('https://api.recruitee.com')
          .get(`/c/${TEST_COMPANY_ID}/somepath`)
          .replyWithError('something awful happened');

        try {
          await client.request('GET', '/somepath');
          throw Error('An error was not thrown as expected');
        } catch (e) {
          expect(e).to.be.an.instanceOf(Error);
          expect(e.statusCode).to.be.undefined;
          expect(e.toString()).to.deep.equal('Error: something awful happened');
        } finally {
          scope.done();
        }
      });

      it('sets the Authorization and Content-Type headers', () => {
        const scope = nock('https://api.recruitee.com', {
          reqheaders: {
            Authorization: `Bearer ${TEST_API_TOKEN}`,
            'Content-Type': 'application/json',
          },
        })
          .get(`/c/${TEST_COMPANY_ID}/somepath`)
          .reply(200, 'test response');

        return client.request('GET', '/somepath').then(() => scope.done());
      });

      it('maps body to the request body', () => {
        const random = Math.random();
        const scope = nock('https://api.recruitee.com')
          .post(`/c/${TEST_COMPANY_ID}/somepath`, { random })
          .reply(200, 'test response');

        return client
          .request('POST', '/somepath', { body: { random } })
          .then(() => scope.done());
      });

      it('maps query to the request query', () => {
        const random = Math.random();
        const scope = nock('https://api.recruitee.com')
          .get(`/c/${TEST_COMPANY_ID}/somepath`)
          .query({ random })
          .reply(200, 'test response');

        return client
          .request('GET', '/somepath', { query: { random } })
          .then(() => scope.done());
      });
    });
  });
});
