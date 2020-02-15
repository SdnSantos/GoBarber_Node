import 'dotenv/config';

import Queue from './lib/Queue';

// porque não será executado a fila junto com o backend
// para não atrapalhar o desempenho ou perfomance da aplicação
Queue.processQueue();
