export interface IDatabaseService {
  getById(id: string): any;
  getAll(id: string): any;
  create(...args: any): any;
  update(...args: any): any;
  delete(...args: any): any;
}
