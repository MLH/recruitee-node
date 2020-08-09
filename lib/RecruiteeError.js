class RecruiteeError extends Error {
  constructor({ status = 500, data = {}, config }) {
    const errors = data.error || data;
    const message = `[HTTP ${status}] ${[].concat(errors).join(', ')}`;

    super(message);

    this.name = this.constructor.name;
    this.statusCode = status;
    this.config = config;
  }
}

module.exports = RecruiteeError;
