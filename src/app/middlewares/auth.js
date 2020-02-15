import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(410).json({ error: 'Token not provided' });
  }

  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
  // o split é para pegar o token apenas e retirar o Bearer
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }

  return next();
};
