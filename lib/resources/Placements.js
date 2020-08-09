class Placements {
  constructor(recruitee) {
    this.recruitee = recruitee;
  }

  create({ candidateId, offerId, stageId, ...params } = {}) {
    const body = {
      candidate_id: candidateId,
      offer_id: offerId,
      stage_id: stageId,
      ...params,
    };

    return this.recruitee
      .request('POST', '/placements', { body })
      .then((res) => res.body.placement);
  }

  delete(id, query = {}) {
    return this.recruitee
      .request('DELETE', `/placements/${id}`, { query })
      .then((res) => res.body.placement);
  }
}

module.exports = Placements;
