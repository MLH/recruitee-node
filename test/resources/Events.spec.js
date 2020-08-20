const nock = require("nock");
const { expect } = require("chai");

const Recruitee = require("../../lib/Recruitee");

const TEST_COMPANY_ID = "FAKECOMPANY";
const TEST_API_TOKEN = "FAKETOKEN";

describe("Events Resource", () => {
  const client = new Recruitee(TEST_COMPANY_ID, TEST_API_TOKEN);

  describe("list", () => {
    it("sends the correct request", () => {
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/interview/events`)
        .reply(200, "test response");

      return client.events.list().then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/interview/events`)
        .reply(200, { interview_events: [1, 2, 3] });

      const result = await client.events.list();

      expect(result)
        .to.be.an("array")
        .with.length(3);

      scope.done();
    });
  });

  describe("fetch", () => {
    it("sends the correct request", () => {
      const eventId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/interview/events/${eventId}`)
        .reply(200, "test response");

      return client.events.fetch(eventId).then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const eventId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/interview/events/${eventId}`)
        .reply(200, { interview_event: { id: "Foo" } });

      const result = await client.events.fetch(eventId);

      expect(result)
        .to.be.an("object")
        .that.includes({ id: "Foo" });

      scope.done();
    });
  });

  describe("create", () => {
    it("sends the correct request", () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .post(
          `/c/${TEST_COMPANY_ID}/interview/candidates/${candidateId}/events`
        )
        .reply(201, {});

      return client.events.create({ candidateId }).then(() => scope.done());
    });

    it("transforms the request params correctly", () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .post(
          `/c/${TEST_COMPANY_ID}/interview/candidates/${candidateId}/events`,
          { interview_event: { id: "Foo" } }
        )
        .reply(201, {});

      return client.events
        .create({ candidateId, id: "Foo" })
        .then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const candidateId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .post(
          `/c/${TEST_COMPANY_ID}/interview/candidates/${candidateId}/events`
        )
        .reply(201, { interview_event: { id: "Foo" } });

      const result = await client.events.create({ candidateId });

      expect(result)
        .to.be.an("object")
        .that.includes({ id: "Foo" });

      scope.done();
    });
  });

  describe("update", () => {
    it("sends the correct request", () => {
      const eventId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .patch(`/c/${TEST_COMPANY_ID}/interview/events/${eventId}`)
        .reply(200, {});

      return client.events.update(eventId, {}).then(() => scope.done());
    });

    it("transforms the request params correctly", () => {
      const eventId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .patch(`/c/${TEST_COMPANY_ID}/interview/events/${eventId}`, {
          interview_event: { id: "Foo" }
        })
        .reply(200, {});

      return client.events
        .update(eventId, { id: "Foo" })
        .then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const eventId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .patch(`/c/${TEST_COMPANY_ID}/interview/events/${eventId}`)
        .reply(200, { interview_event: { id: "Foo" } });

      const result = await client.events.update(eventId, {});

      expect(result)
        .to.be.an("object")
        .that.includes({ id: "Foo" });

      scope.done();
    });
  });

  describe("delete", () => {
    it("sends the correct request", () => {
      const eventId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .delete(`/c/${TEST_COMPANY_ID}/interview/events/${eventId}`)
        .reply(200, "test response");

      return client.events.delete(eventId).then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const eventId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .delete(`/c/${TEST_COMPANY_ID}/interview/events/${eventId}`)
        .reply(200, { interview_event: { id: "Foo" } });

      const result = await client.events.delete(eventId);

      expect(result)
        .to.be.an("object")
        .that.includes({ id: "Foo" });

      scope.done();
    });
  });

  describe("schedule", () => {
    it("sends the correct request", () => {
      const eventId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .post(`/c/${TEST_COMPANY_ID}/interview/events/${eventId}/schedule`)
        .reply(201, {});

      return client.events.schedule(eventId).then(() => scope.done());
    });

    it("transforms the request params correctly", () => {
      const eventId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .post(`/c/${TEST_COMPANY_ID}/interview/events/${eventId}/schedule`, {
          interview_event: { id: "Foo" }
        })
        .reply(201, {});

      return client.events
        .schedule(eventId, { id: "Foo" })
        .then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const eventId = Math.floor(Math.random() * 100);
      const scope = nock("https://api.recruitee.com/")
        .post(`/c/${TEST_COMPANY_ID}/interview/events/${eventId}/schedule`)
        .reply(201, { interview_event: { id: "Foo" } });

      const result = await client.events.schedule(eventId);

      expect(result)
        .to.be.an("object")
        .that.includes({ id: "Foo" });

      scope.done();
    });
  });
});
