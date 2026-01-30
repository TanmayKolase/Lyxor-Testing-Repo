import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes';
import { config } from './config/app';

// Missing audit logs
// Performance bottlenecks

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Missing audit log middleware
// Performance bottleneck - no request logging middleware

app.use('/api', routes);

app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;

