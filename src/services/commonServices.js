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

  createMany = async ({
    schemaName,
    body,
    query,
    skip,
    limit,
    select,
    populate,
  }) => {
    return await schemaName.insertMany(body);
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
      .findOneAndUpdate(query, body, { new: true , lean : true })
      .populate(populate)
      .select(select)
  };

  deleteOne = async ({
    schemaName,
    body,
    query,
    skip,
    limit,
    select,
    populate,
  }) => {
    return await schemaName.findOneAndDelete(body);
  };

  getOne = async ({
    schemaName,
    body,
    query,
    skip,
    limit,
    select,
    populate,
  }) => {
    return await schemaName.findOne(body).populate(populate).select(select);
  };

  getMany = async ({
    schemaName,
    body,
    query,
    skip = 0,
    limit = 100,
    select,
    populate,
    sort
  }) => {
    return await schemaName
      .find(query)
      .sort(sort)
      .populate(populate)
      .skip(skip)
      .limit(limit)
      .select(select)
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

  getRandom = async({
    schemaName,
    count
  }) =>{
    return schemaName.aggregate().sample(count? count: 1)
  };
}

module.exports = new Service();
