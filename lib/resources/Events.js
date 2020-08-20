class Events {
  constructor(recruitee) {
    this.recruitee = recruitee;
  }

  list(query = {}) {
    return this.recruitee
      .request("GET", "/interview/events", { query })
      .then(res => res.body.interview_events);
  }

  fetch(id, query = {}) {
    return this.recruitee
      .request("GET", `/interview/events/${id}`, { query })
      .then(res => res.body.interview_event);
  }

  create({ candidateId, ...params }) {
    return this.recruitee
      .request("POST", `/interview/candidates/${candidateId}/events`, {
        body: {
          interview_event: params
        }
      })
      .then(res => res.body.interview_event);
  }

  update(id, params = {}) {
    return this.recruitee
      .request("PATCH", `/interview/events/${id}`, {
        body: { interview_event: params }
      })
      .then(res => res.body.interview_event);
  }

  delete(id, query = {}) {
    return this.recruitee
      .request("DELETE", `/interview/events/${id}`, { query })
      .then(res => res.body.interview_event);
  }

  schedule(id, params = {}) {
    return this.recruitee
      .request("POST", `/interview/events/${id}/schedule`, {
        body: {
          interview_event: params
        }
      })
      .then(res => res.body.interview_event);
  }
}

module.exports = Events;
