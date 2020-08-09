const nock = require('nock');
const { expect } = require('chai');

const Recruitee = require('../../lib/Recruitee');

const TEST_COMPANY_ID = 'FAKECOMPANY';
const TEST_API_TOKEN = 'FAKETOKEN';

describe('Evaluations Resource', () => {
  const client = new Recruitee(TEST_COMPANY_ID, TEST_API_TOKEN);

  describe('list', () => {
    it('sends the correct request', () => {
      const scope = nock('https://api.recruitee.com/')
        .get(`/c/${TEST_COMPANY_ID}/interview/results`)
        .reply(200, 'test response');

      return client.evaluations.list().then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const scope = nock('https://api.recruitee.com/')
        .get(`/c/${TEST_COMPANY_ID}/interview/results`)
        .reply(200, { interview_results: [1, 2, 3] });

      const result = await client.evaluations.list();

      expect(result)
        .to.be.an('array')
        .with.length(3);

      scope.done();
    });
  });

  describe('fetch', () => {
    it('sends the correct request', () => {
      const evaluationId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .get(`/c/${TEST_COMPANY_ID}/interview/results/${evaluationId}`)
        .reply(200, 'test response');

      return client.evaluations.fetch(evaluationId).then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const evaluationId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .get(`/c/${TEST_COMPANY_ID}/interview/results/${evaluationId}`)
        .reply(200, { interview_result: { id: 'Foo' } });

      const result = await client.evaluations.fetch(evaluationId);

      expect(result)
        .to.be.an('object')
        .that.includes({ id: 'Foo' });

      scope.done();
    });
  });

  describe('create', () => {
    it('sends the correct request', () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .post(
          `/c/${TEST_COMPANY_ID}/interview/candidates/${candidateId}/results`,
        )
        .reply(201, {});

      return client.evaluations
        .create(candidateId, {})
        .then(() => scope.done());
    });

    it('transforms the request params correctly', () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .post(
          `/c/${TEST_COMPANY_ID}/interview/candidates/${candidateId}/results`,
          { interview_result: { id: 'Foo' } },
        )
        .reply(201, {});

      return client.evaluations
        .create(candidateId, { id: 'Foo' })
        .then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .post(
          `/c/${TEST_COMPANY_ID}/interview/candidates/${candidateId}/results`,
        )
        .reply(201, { interview_result: { id: 'Foo' } });

      const result = await client.evaluations.create(candidateId, {});

      expect(result)
        .to.be.an('object')
        .that.includes({ id: 'Foo' });

      scope.done();
    });
  });

  describe('update', () => {
    it('sends the correct request', () => {
      const evaluationId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .patch(`/c/${TEST_COMPANY_ID}/interview/results/${evaluationId}`)
        .reply(200, {});

      return client.evaluations
        .update(evaluationId, {})
        .then(() => scope.done());
    });

    it('transforms the request params correctly', () => {
      const evaluationId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .patch(`/c/${TEST_COMPANY_ID}/interview/results/${evaluationId}`, {
          interview_result: { id: 'Foo' },
        })
        .reply(200, {});

      return client.evaluations
        .update(evaluationId, { id: 'Foo' })
        .then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const evaluationId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .patch(`/c/${TEST_COMPANY_ID}/interview/results/${evaluationId}`)
        .reply(200, { interview_result: { id: 'Foo' } });

      const result = await client.evaluations.update(evaluationId, {});

      expect(result)
        .to.be.an('object')
        .that.includes({ id: 'Foo' });

      scope.done();
    });
  });

  describe('delete', () => {
    it('sends the correct request', () => {
      const evaluationId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .delete(`/c/${TEST_COMPANY_ID}/interview/results/${evaluationId}`)
        .reply(200, 'test response');

      return client.evaluations.delete(evaluationId).then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const evaluationId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .delete(`/c/${TEST_COMPANY_ID}/interview/results/${evaluationId}`)
        .reply(200, { interview_result: { id: 'Foo' } });

      const result = await client.evaluations.delete(evaluationId);

      expect(result)
        .to.be.an('object')
        .that.includes({ id: 'Foo' });

      scope.done();
    });
  });
});
