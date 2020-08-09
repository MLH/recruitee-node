const nock = require('nock');
const { expect } = require('chai');

const Recruitee = require('../../lib/Recruitee');

const TEST_COMPANY_ID = 'FAKECOMPANY';
const TEST_API_TOKEN = 'FAKETOKEN';

describe('Placements Resource', () => {
  const client = new Recruitee(TEST_COMPANY_ID, TEST_API_TOKEN);

  describe('create', () => {
    it('sends the correct request', () => {
      const scope = nock('https://api.recruitee.com/')
        .post(`/c/${TEST_COMPANY_ID}/placements`)
        .reply(201, {});

      return client.placements.create({}).then(() => scope.done());
    });

    it('transforms the request params correctly', () => {
      const params = {
        candidateId: '123',
        offerId: '456',
        stageId: '789',
        otherId: '101',
      };
      const scope = nock('https://api.recruitee.com/')
        .post(`/c/${TEST_COMPANY_ID}/placements`, {
          candidate_id: params.candidateId,
          offer_id: params.offerId,
          stage_id: params.stageId,
          otherId: params.otherId,
        })
        .reply(201, {});

      return client.placements.create(params).then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const scope = nock('https://api.recruitee.com/')
        .post(`/c/${TEST_COMPANY_ID}/placements`)
        .reply(201, { placement: { id: 'Foo' } });

      const result = await client.placements.create({});

      expect(result)
        .to.be.an('object')
        .that.includes({ id: 'Foo' });

      scope.done();
    });
  });

  describe('delete', () => {
    it('sends the correct request', () => {
      const placementId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .delete(`/c/${TEST_COMPANY_ID}/placements/${placementId}`)
        .reply(200, 'test response');

      return client.placements.delete(placementId).then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const placementId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .delete(`/c/${TEST_COMPANY_ID}/placements/${placementId}`)
        .reply(200, { placement: { title: 'Foo' } });

      const result = await client.placements.delete(placementId);

      expect(result)
        .to.be.an('object')
        .that.includes({ title: 'Foo' });

      scope.done();
    });
  });
});
