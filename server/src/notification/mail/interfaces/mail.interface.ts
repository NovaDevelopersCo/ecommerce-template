export interface IMail<T> {
  to: string;
  subject: string;
  template: string;
  context: T;
}
