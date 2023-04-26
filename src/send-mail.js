import 'dotenv/config'
import { send } from './services/emailService.js';

send({
  email: 'bowavi6553@pixiil.com',
  subject: 'Test response',
  html: 'You are invited',
})

/* Тестовый файл */
