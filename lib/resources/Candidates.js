class Candidates {
  constructor(recruitee) {
    this.recruitee = recruitee;
  }

  list(query = {}) {
    return this.recruitee
      .request('GET', '/candidates', { query })
      .then((res) => res.body.candidates);
  }

  fetch(id, query = {}) {
    return this.recruitee
      .request('GET', `/candidates/${id}`, { query })
      .then((res) => res.body.candidate);
  }

  fetchByEmail(email, query = {}) {
    const options = {
      limit: 1,
      sort_by: 'relevance_desc',
      ...query,
    };

    return this.search(email, options).then((res) => res[0]);
  }

  create({ offers = [], ...candidate }) {
    return this.recruitee
      .request('POST', '/candidates', {
        body: { candidate, offers },
      })
      .then((res) => res.body.candidate);
  }

  update(id, params = {}) {
    return this.recruitee
      .request('PATCH', `/candidates/${id}`, {
        body: { candidate: params },
      })
      .then((res) => res.body.candidate);
  }

  updateField(id, params = {}) {
    return this.recruitee
      .request('PATCH', `/custom_fields/candidates/fields/${id}`, {
        body: { field: params },
      })
      .then((res) => res.body.field);
  }

  delete(id, query = {}) {
    return this.recruitee
      .request('DELETE', `/candidates/${id}`, { query })
      .then((res) => res.body.candidate);
  }

  search(searchTerm, query = {}) {
    const filters = [{ field: 'all', query: searchTerm }];
    const options = {
      query: {
        filters_json: JSON.stringify(filters),
        ...query,
      },
    };

    return this.recruitee
      .request('GET', '/search/new/candidates', options)
      .then((res) => res.body.hits);
  }
}

module.exports = Candidates;
