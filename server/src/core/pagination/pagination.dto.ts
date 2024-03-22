export class PaginationDto {
  items: object[];
  count: number;
  pageCount: number;
  constructor(items: object[], totalCount: number, count: number) {
    this.items = items;
    this.count = totalCount;
    this.pageCount = Math.ceil(totalCount / count);
  }
}
