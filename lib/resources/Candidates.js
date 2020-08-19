class Candidates {
  constructor(recruitee) {
    this.recruitee = recruitee;
  }

  list(query = {}) {
    return this.recruitee
      .request("GET", "/candidates", { query })
      .then(res => res.body.candidates);
  }

  fetch(id, query = {}) {
    return this.recruitee
      .request("GET", `/candidates/${id}`, { query })
      .then(res => res.body.candidate);
  }

  fetchByEmail(email, options = {}) {
    const query = {
      limit: 1,
      query: email,
      ...options
    };

    return this.recruitee
      .request("GET", "/search/new/quick", { query })
      .then(res => res.body.candidates.hits[0]);
  }

  create({ offers = [], ...candidate }) {
    return this.recruitee
      .request("POST", "/candidates", {
        body: { candidate, offers }
      })
      .then(res => res.body.candidate);
  }

  update(id, params = {}) {
    return this.recruitee
      .request("PATCH", `/candidates/${id}`, {
        body: { candidate: params }
      })
      .then(res => res.body.candidate);
  }

  updateField(id, params = {}) {
    return this.recruitee
      .request("PATCH", `/custom_fields/candidates/fields/${id}`, {
        body: { field: params }
      })
      .then(res => res.body.field);
  }

  delete(id, query = {}) {
    return this.recruitee
      .request("DELETE", `/candidates/${id}`, { query })
      .then(res => res.body.candidate);
  }
}

module.exports = Candidates;
