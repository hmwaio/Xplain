type OffsetPaginationOptions = {
  page?: number;
  limit?: number;
  where?: any;
  include?: any;
  orderBy?: any;
  model: any;
};

export const offsetPaginate = async ({
  page = 1,
  limit = 20,
  where = {},
  include = {},
  orderBy = { created_at: "desc" },
  model,
}: OffsetPaginationOptions) => {
  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    model.findMany({
      where,
      include,
      skip,
      take: limit,
      orderBy,
    }),
    model.count({ where }),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      hasMore: page < Math.ceil(total / limit),
    },
  };
};
