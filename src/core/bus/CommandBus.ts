interface ICommand {}

interface ICommandHandler<T extends ICommand> {
  handle(command: T): Promise<any>;
}

export default class CommandBus {
  private handlers: Map<string, ICommandHandler<any>> = new Map();

  register<T extends ICommand>(commandType: new (...args: any[]) => T, handler: ICommandHandler<T>): void {
    this.handlers.set(commandType.name, handler);
  }

  async execute<T extends ICommand>(command: T): Promise<any> {
    const handler = this.handlers.get(command.constructor.name);
    if (!handler) {
      throw new Error(`No handler found for command: ${command.constructor.name}`);
    }
    return handler.handle(command);
  }
}
