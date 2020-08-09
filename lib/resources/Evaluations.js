class Evaluations {
  constructor(recruitee) {
    this.recruitee = recruitee;
  }

  list(query = {}) {
    return this.recruitee
      .request('GET', '/interview/results', { query })
      .then((res) => res.body.interview_results);
  }

  fetch(id, query = {}) {
    return this.recruitee
      .request('GET', `/interview/results/${id}`, { query })
      .then((res) => res.body.interview_result);
  }

  create(candidateId, params = {}) {
    return this.recruitee
      .request('POST', `/interview/candidates/${candidateId}/results`, {
        body: { interview_result: params },
      })
      .then((res) => res.body.interview_result);
  }

  update(id, params = {}) {
    return this.recruitee
      .request('PATCH', `/interview/results/${id}`, {
        body: { interview_result: params },
      })
      .then((res) => res.body.interview_result);
  }

  delete(id, query = {}) {
    return this.recruitee
      .request('DELETE', `/interview/results/${id}`, { query })
      .then((res) => res.body.interview_result);
  }
}

module.exports = Evaluations;
