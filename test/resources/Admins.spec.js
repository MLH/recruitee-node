const nock = require("nock");
const { expect } = require("chai");

const Recruitee = require("../../lib/Recruitee");

const TEST_COMPANY_ID = "FAKECOMPANY";
const TEST_API_TOKEN = "FAKETOKEN";

describe("Admin Resource", () => {
  const client = new Recruitee(TEST_COMPANY_ID, TEST_API_TOKEN);

  describe("list", () => {
    it("sends the correct request", () => {
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/admins`)
        .reply(200, "test response");

      return client.admins.list().then(() => scope.done());
    });

    it("transforms the response correctly", async () => {
      const scope = nock("https://api.recruitee.com/")
        .get(`/c/${TEST_COMPANY_ID}/admins`)
        .reply(200, { admins: [1, 2, 3] });

      const result = await client.admins.list();

      expect(result)
        .to.be.an("array")
        .with.length(3);

      scope.done();
    });
  });
});
