import { Request, Response } from 'express';
import CreateSessionsService from '../services/CreateSessionsService';
import { instanceToInstance } from 'class-transformer';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const createSession = new CreateSessionsService();

    try {
      const user = await createSession.execute({
        email,
        password,
      });

      return response.json(instanceToInstance(user));
    } catch (err) {
      if (err.message === 'User is inactive.') {
        return response.status(401).json({ error: 'User is inactive. Please contact support.' }); 
      }
      return response.status(401).json({ error: err.message }); 
    }
  }
}