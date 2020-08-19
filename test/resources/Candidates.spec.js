const nock = require("nock");
const { expect } = require("chai");

const Recruitee = require("../../lib/Recruitee");

const TEST_COMPANY_ID = "FAKECOMPANY";
const TEST_API_TOKEN = "FAKETOKEN";

describe("Candidates Resource", () => {
  const client = new Recruitee(TEST_COMPANY_ID, TEST_API_TOKEN);

  describe("list", () => {
    it("sends the correct request", () => {
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/candidates`)
        .reply(200, "test response");

      return client.candidates.list().then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/candidates`)
        .reply(200, { candidates: [1, 2, 3] });

      const result = await client.candidates.list();

      expect(result)
        .to.be.an("array")
        .with.length(3);

      scope.done();
    });
  });

  describe("fetch", () => {
    it("sends the correct request", () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/candidates/${candidateId}`)
        .reply(200, "test response");

      return client.candidates.fetch(candidateId).then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/candidates/${candidateId}`)
        .reply(200, { candidate: { name: "Foo" } });

      const result = await client.candidates.fetch(candidateId);

      expect(result)
        .to.be.an("object")
        .that.includes({ name: "Foo" });

      scope.done();
    });
  });

  describe("fetchByEmail", () => {
    it("sends the correct request", () => {
      const email = "foo@example.com";
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/search/new/quick`)
        .query({
          query: email,
          limit: 1
        })
        .reply(200, { candidates: { hits: [] } });

      return client.candidates.fetchByEmail(email).then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const email = "foo@example.com";
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/search/new/quick`)
        .query(true)
        .reply(200, {
          candidates: { hits: [{ name: 1 }, { name: 2 }, { name: 3 }] }
        });

      const result = await client.candidates.fetchByEmail(email);

      expect(result)
        .to.be.an("object")
        .that.includes({ name: 1 });

      scope.done();
    });
  });

  describe("create", () => {
    it("sends the correct request", () => {
      const scope = nock("https://api.recruitee.com/")
        .post(`/c/${TEST_COMPANY_ID}/candidates`)
        .reply(201, {});

      return client.candidates.create({}).then(() => scope.done());
    });

    it("transforms the request params correctly", () => {
      const scope = nock("https://api.recruitee.com/")
        .post(`/c/${TEST_COMPANY_ID}/candidates`, {
          candidate: { name: "Foo" },
          offers: [1, 2, 3]
        })
        .reply(201, {});

      return client.candidates
        .create({ name: "Foo", offers: [1, 2, 3] })
        .then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const scope = nock("https://api.recruitee.com/")
        .post(`/c/${TEST_COMPANY_ID}/candidates`)
        .reply(201, { candidate: { name: "Foo" } });

      const result = await client.candidates.create({});

      expect(result)
        .to.be.an("object")
        .that.includes({ name: "Foo" });

      scope.done();
    });
  });

  describe("update", () => {
    it("sends the correct request", () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .patch(`/c/${TEST_COMPANY_ID}/candidates/${candidateId}`)
        .reply(200, {});

      return client.candidates.update(candidateId, {}).then(() => scope.done());
    });

    it("transforms the request params correctly", () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .patch(`/c/${TEST_COMPANY_ID}/candidates/${candidateId}`, {
          candidate: { name: "Foo" }
        })
        .reply(200, {});

      return client.candidates
        .update(candidateId, { name: "Foo" })
        .then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .patch(`/c/${TEST_COMPANY_ID}/candidates/${candidateId}`)
        .reply(200, { candidate: { name: "Foo" } });

      const result = await client.candidates.update(candidateId, {});

      expect(result)
        .to.be.an("object")
        .that.includes({ name: "Foo" });

      scope.done();
    });
  });

  describe("delete", () => {
    it("sends the correct request", () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .delete(`/c/${TEST_COMPANY_ID}/candidates/${candidateId}`)
        .reply(200, "test response");

      return client.candidates.delete(candidateId).then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .delete(`/c/${TEST_COMPANY_ID}/candidates/${candidateId}`)
        .reply(200, { candidate: { name: "Foo" } });

      const result = await client.candidates.delete(candidateId);

      expect(result)
        .to.be.an("object")
        .that.includes({ name: "Foo" });

      scope.done();
    });
  });
});
