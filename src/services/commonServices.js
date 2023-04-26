class Service {
  createOne = async ({
    schemaName,
    body,
    query,
    skip,
    limit,
    select,
    populate,
  }) => {
    return await schemaName.create(body);
  };

  updateOne = async ({
    schemaName,
    body,
    query,
    skip,
    limit,
    select,
    populate,
  }) => {
    return await schemaName
      .findOneAndUpdate(query, body, { new: true })
      .populate(populate)
      .select(select);
  };

  deleteOne = async ({
    schemaName,
    body,
    query,
    skip,
    limit,
    select,
    populate,
  }) => {};

  getOne = async ({
    schemaName,
    body,
    query,
    skip,
    limit,
    select,
    populate,
  }) => {
     console.log(body)
    return await schemaName.findOne(body).populate(populate);
  };

  getMany = async ({
    schemaName,
    body,
    query,
    skip = 0,
    limit = 100,
    select,
    populate,
  }) => {
    return await schemaName
      .find(query)
      .populate(populate)
      .skip(skip)
      .limit(limit)
      .select(select);
  };
  count = async ({
    schemaName,
    body,
    query,
    skip,
    limit,
    select,
    populate,
  }) => {
    return await schemaName.find(query).count();
  };
}

module.exports = new Service();
