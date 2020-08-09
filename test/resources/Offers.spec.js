const nock = require('nock');
const { expect } = require('chai');

const Recruitee = require('../../lib/Recruitee');

const TEST_COMPANY_ID = 'FAKECOMPANY';
const TEST_API_TOKEN = 'FAKETOKEN';

describe('Offers Resource', () => {
  const client = new Recruitee(TEST_COMPANY_ID, TEST_API_TOKEN);

  describe('list', () => {
    it('sends the correct request', () => {
      const scope = nock('https://api.recruitee.com/')
        .get(`/c/${TEST_COMPANY_ID}/offers`)
        .reply(200, 'test response');

      return client.offers.list().then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const scope = nock('https://api.recruitee.com/')
        .get(`/c/${TEST_COMPANY_ID}/offers`)
        .reply(200, { offers: [1, 2, 3] });

      const result = await client.offers.list();

      expect(result)
        .to.be.an('array')
        .with.length(3);

      scope.done();
    });
  });

  describe('fetch', () => {
    it('sends the correct request', () => {
      const offerId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .get(`/c/${TEST_COMPANY_ID}/offers/${offerId}`)
        .reply(200, 'test response');

      return client.offers.fetch(offerId).then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const offerId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .get(`/c/${TEST_COMPANY_ID}/offers/${offerId}`)
        .reply(200, { offer: { title: 'Foo' } });

      const result = await client.offers.fetch(offerId);

      expect(result)
        .to.be.an('object')
        .that.includes({ title: 'Foo' });

      scope.done();
    });
  });

  describe('create', () => {
    it('sends the correct request', () => {
      const scope = nock('https://api.recruitee.com/')
        .post(`/c/${TEST_COMPANY_ID}/offers`)
        .reply(201, {});

      return client.offers.create({}).then(() => scope.done());
    });

    it('transforms the request params correctly', () => {
      const scope = nock('https://api.recruitee.com/')
        .post(`/c/${TEST_COMPANY_ID}/offers`, {
          offer: { title: 'Foo' },
        })
        .reply(201, {});

      return client.offers.create({ title: 'Foo' }).then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const scope = nock('https://api.recruitee.com/')
        .post(`/c/${TEST_COMPANY_ID}/offers`)
        .reply(201, { offer: { title: 'Foo' } });

      const result = await client.offers.create({});

      expect(result)
        .to.be.an('object')
        .that.includes({ title: 'Foo' });

      scope.done();
    });
  });

  describe('update', () => {
    it('sends the correct request', () => {
      const offerId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .patch(`/c/${TEST_COMPANY_ID}/offers/${offerId}`)
        .reply(200, {});

      return client.offers.update(offerId, {}).then(() => scope.done());
    });

    it('transforms the request params correctly', () => {
      const offerId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .patch(`/c/${TEST_COMPANY_ID}/offers/${offerId}`, {
          offer: { title: 'Foo' },
        })
        .reply(200, {});

      return client.offers
        .update(offerId, { title: 'Foo' })
        .then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const offerId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .patch(`/c/${TEST_COMPANY_ID}/offers/${offerId}`)
        .reply(200, { offer: { title: 'Foo' } });

      const result = await client.offers.update(offerId, {});

      expect(result)
        .to.be.an('object')
        .that.includes({ title: 'Foo' });

      scope.done();
    });
  });

  describe('delete', () => {
    it('sends the correct request', () => {
      const offerId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .delete(`/c/${TEST_COMPANY_ID}/offers/${offerId}`)
        .reply(200, 'test response');

      return client.offers.delete(offerId).then(() => scope.done());
    });

    it('transforms the response correctly', async () => {
      const offerId = Math.floor(Math.random() * 100);
      const scope = nock('https://api.recruitee.com/')
        .delete(`/c/${TEST_COMPANY_ID}/offers/${offerId}`)
        .reply(200, { offer: { title: 'Foo' } });

      const result = await client.offers.delete(offerId);

      expect(result)
        .to.be.an('object')
        .that.includes({ title: 'Foo' });

      scope.done();
    });
  });
});
