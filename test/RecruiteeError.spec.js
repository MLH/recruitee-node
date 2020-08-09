const { expect } = require('chai');

const RecruiteeError = require('../lib/RecruiteeError');

describe('RecruiteeError', () => {
  describe('constructor', () => {
    it('accepts api error responses with one error', () => {
      const response = {
        status: 403,
        data: {
          error: ['Forbidden'],
        },
      };

      const error = new RecruiteeError(response);

      expect(error.toString()).to.deep.equal(
        'RecruiteeError: [HTTP 403] Forbidden',
      );
    });

    it('accepts api error responses with multiple errors', () => {
      const response = {
        status: 422,
        data: {
          error: ["Name can't be blank", "Abilities can't be blank"],
          error_fields: {
            abilities: ["can't be blank"],
            name: ["can't be blank"],
          },
        },
      };

      const error = new RecruiteeError(response);

      expect(error.toString()).to.deep.equal(
        "RecruiteeError: [HTTP 422] Name can't be blank, Abilities can't be blank",
      );
    });

    it('accepts request level error objects', () => {
      const response = {
        status: 400,
        data: {
          error: 'Token not found.',
          error_code: 'invalid_token',
        },
      };

      const error = new RecruiteeError(response);

      expect(error.toString()).to.deep.equal(
        'RecruiteeError: [HTTP 400] Token not found.',
      );
    });

    it('gracefully falls back on unexpected error formats', () => {
      const response = {
        status: 400,
        data: 'An unexpected error format',
      };
      const error = new RecruiteeError(response);

      expect(error.toString()).to.deep.equal(
        'RecruiteeError: [HTTP 400] An unexpected error format',
      );
    });
  });
});
