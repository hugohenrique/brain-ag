import express from 'express';
import bodyParser from 'body-parser';
import sequelize from './config/db';
import CommandBus from './core/bus/CommandBus';
import QueryBus from './core/bus/QueryBus';
import ProducerRepository from './core/infrastructure/persistence/ProducerRepository';
import CreateProducerCommandHandler from './core/handlers/CreateProducerCommandHandler';
import UpdateProducerHandler from './core/handlers/UpdateProducerHandler';
import DeleteProducerHandler from './core/handlers/DeleteProducerHandler';
import GetProducersHandler from './core/handlers/GetProducersHandler';
import GetDashboardDataHandler from './core/handlers/GetDashboardDataHandler';
import GetProducers from './core/infrastructure/http/GetProducers';
import PostProducer from './core/infrastructure/http/PostProducer';
import DeleteProducer from './core/infrastructure/http/DeleteProducer';
import PutProducer from './core/infrastructure/http/PutProducer';
import GetDashboard from './core/infrastructure/http/GetDashboard';
import GetDashboardDataQuery from './core/application/queries/GetDashboardDataQuery';
import GetProducersQuery from './core/application/queries/GetProducersQuery';
import CreateProducerCommand from './core/commands/CreateProducerCommand';
import UpdateProducerCommand from './core/commands/UpdateProducerCommand';
import DeleteProducerCommand from './core/commands/DeleteProducerCommand';
import IProducerRepository from './core/domain/repository/IProducerRepository';

const app = express();
app.use(bodyParser.json());

const commandBus: CommandBus = new CommandBus();
const queryBus: QueryBus = new QueryBus();
const producerRepository: IProducerRepository = new ProducerRepository();

// Registra commands handlers
commandBus.register(CreateProducerCommand, new CreateProducerCommandHandler(producerRepository));
commandBus.register(UpdateProducerCommand, new UpdateProducerHandler(producerRepository));
commandBus.register(DeleteProducerCommand, new DeleteProducerHandler(producerRepository));

// Registra queries handlers
queryBus.register(GetProducersQuery, new GetProducersHandler(producerRepository));
queryBus.register(GetDashboardDataQuery, new GetDashboardDataHandler(producerRepository));

app.post('/producers', (req, res) => PostProducer(req, res, commandBus));
app.put('/producers/:id', (req, res) => PutProducer(req, res, commandBus));
app.delete('/producers/:id', (req, res) => DeleteProducer(req, res, commandBus));
app.get('/producers', (req, res) => GetProducers(req, res, queryBus));
app.get('/dashboard', (req, res) => GetDashboard(req, res, queryBus));

sequelize.sync({ force: false }).then(() => {
  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
});
