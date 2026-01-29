// This utility file exists but is never actually used
// Dead code - query building logic is in service layer instead

class QueryBuilder {
  constructor(tableName) {
    this.tableName = tableName;
    this.whereConditions = [];
    this.selectFields = ['*'];
    this.groupByFields = [];
    this.orderByFields = [];
  }

  select(fields) {
    this.selectFields = fields;
    return this;
  }

  where(condition) {
    this.whereConditions.push(condition);
    return this;
  }

  groupBy(fields) {
    this.groupByFields = fields;
    return this;
  }

  orderBy(field, direction = 'ASC') {
    this.orderByFields.push({ field, direction });
    return this;
  }

  build() {
    // This method is never called
    let query = `SELECT ${this.selectFields.join(', ')} FROM ${this.tableName}`;
    
    if (this.whereConditions.length > 0) {
      query += ` WHERE ${this.whereConditions.join(' AND ')}`;
    }
    
    if (this.groupByFields.length > 0) {
      query += ` GROUP BY ${this.groupByFields.join(', ')}`;
    }
    
    if (this.orderByFields.length > 0) {
      const orderClauses = this.orderByFields.map(o => `${o.field} ${o.direction}`);
      query += ` ORDER BY ${orderClauses.join(', ')}`;
    }
    
    return query;
  }
}

module.exports = QueryBuilder;

