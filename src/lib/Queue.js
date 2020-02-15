import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

// array que armazena todos os jobs
const jobs = [CancellationMail];

class Queue {
  constructor() {
    // uma fila para armazenar os jobs
    this.queues = {};

    this.init();
  }

  // inicializar as filas
  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        // bee é a fila
        bee: new Bee(key, {
          // conexão com o banco redis
          redis: redisConfig,
        }),
        // vem de dentro do job
        handle,
      };
    });
  }

  //-----------------------------------------------------------------------
  //        MÉTODO PARA ADD NOVOS TRABALHOS DENTRO DAS FILAS
  //-----------------------------------------------------------------------
  // método para adicionar cada trabalho dentro das filas
  // queue é para qual fila irá adicionar a próxima tarefa, exemplo CancellationMail
  // job é os dados que vão vir do controller para entrar na fila
  add(queue, job) {
    return this.queues[queue].bee.createJob(job).save();
  }

  //-----------------------------------------------------------------------
  //        MÉTODO PARA EXECUTAR AS FILAS
  //-----------------------------------------------------------------------
  // pegará cada fila e vai ficar processando
  processQueue() {
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
    });
  }

  // verificação de erro na fila
  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
