import 'reflect-metadata';
import 'express-async-errors';
import '@/configs/dotenv';

import { app } from './app';

app.listen(process.env.PORT || 3333, () => {
  console.log(`API rodando na porta ${process.env.PORT || 3333}!`);
});
