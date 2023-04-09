import { Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.REQUEST })
export class WhereBuilder {
  private query = '';

  getQuery() {
    return this.query;
  }

  where(condition: string) {
    this.query = `WHERE ${condition}`;
  }

  andWhere(condition: string) {
    if (this.query) this.query = `${this.query} AND ${condition}`;
    else this.where(condition);
  }
}
