import { SelectQueryBuilder } from 'typeorm';

export default function paginate<T>(
  qb: SelectQueryBuilder<T>,
  options?: { page?: number; applyToResults?: boolean; limit?: number },
) {
  const { page = 1, limit = 20, applyToResults = false } = options;

  // start from page 1
  const offset = (page - 1) * limit;

  // consider all results together as a table
  if (applyToResults) {
    return qb.offset(offset).limit(limit);
  }

  // consider only the result object or array
  return qb.skip(offset).take(limit);
}
