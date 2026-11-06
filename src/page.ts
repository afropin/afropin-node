export interface Paging {
  page: number;
  pages: number;
  per_page: number;
  total: number;
  next: string | null;
  previous: string | null;
}

/**
 * One page of a list. Iterate it for the records; paging is null when you asked for page: 'all'. Ask for the next page
 * with { page: page.paging.page + 1 }.
 */
export class Page<T = any> implements Iterable<T> {
  constructor(readonly data: T[], readonly paging: Paging | null = null) {}

  [Symbol.iterator](): Iterator<T> {
    return this.data[Symbol.iterator]();
  }

  get hasMore(): boolean {
    return this.paging !== null && this.paging.page < this.paging.pages;
  }
}
