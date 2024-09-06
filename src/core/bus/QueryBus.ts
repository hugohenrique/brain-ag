interface IQuery {}

interface IQueryHandler<T extends IQuery> {
  handle(query: T): Promise<any>;
}

export default class QueryBus {
  private handlers: Map<string, IQueryHandler<any>> = new Map();

  register<T extends IQuery>(queryType: new (...args: any[]) => T, handler: IQueryHandler<T>): void {
    this.handlers.set(queryType.name, handler);
  }

  async execute<T extends IQuery>(query: T): Promise<any> {
    const handler = this.handlers.get(query.constructor.name);
    if (!handler) {
      throw new Error(`No handler found for query: ${query.constructor.name}`);
    }
    return handler.handle(query);
  }
}
