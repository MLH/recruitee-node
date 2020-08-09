class Offers {
  constructor(recruitee) {
    this.recruitee = recruitee;
  }

  list(query = {}) {
    return this.recruitee
      .request('GET', '/offers', { query })
      .then((res) => res.body.offers);
  }

  fetch(id, query = {}) {
    return this.recruitee
      .request('GET', `/offers/${id}`, { query })
      .then((res) => res.body.offer);
  }

  create(params = {}) {
    return this.recruitee
      .request('POST', '/offers', { body: { offer: params } })
      .then((res) => res.body.offer);
  }

  update(id, params = {}) {
    return this.recruitee
      .request('PATCH', `/offers/${id}`, { body: { offer: params } })
      .then((res) => res.body.offer);
  }

  delete(id, query = {}) {
    return this.recruitee
      .request('DELETE', `/offers/${id}`, { query })
      .then((res) => res.body.offer);
  }
}

module.exports = Offers;
