class Admins {
  constructor(recruitee) {
    this.recruitee = recruitee;
  }

  list(query = {}) {
    return this.recruitee
      .request("GET", "/admins", { query })
      .then(res => res.body.admins);
  }
}

module.exports = Admins;
