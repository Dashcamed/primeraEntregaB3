import jwt from 'jsonwebtoken';
import SessionServices from '../services/session.services';
import { Request, Response } from 'express';
import config from '../config/config';

const sessionServices = new SessionServices();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const result = await sessionServices.registerUser(user);
    res.status(201).json({ status: 'success', payload: result });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .json({ status: 'error', error: 'Error al registrar usuario' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await sessionServices.login(req.body);
    const token = jwt.sign(
      {
        email: user.email,
        role: user.role,
        userId: user._id,
      },
      config.JWT_PRIVATE_KEY,
      {
        expiresIn: Number(config.JWT_EXPIRES_IN),
      },
    );
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'prod',
        sameSite: 'lax',
        maxAge: Number(config.JWT_EXPIRES_IN),
        signed: true,
      })
      .status(200)
      .json({
        token,
        user: {
          email: user.email,
          role: user.role,
          userId: user._id,
        },
      });
  } catch (error) {
    req.logger.error(error);
    res
      .status(400)
      .json({ error: error instanceof Error ? error.message : String(error) });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'prod',
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'Logout exitoso' });
};
