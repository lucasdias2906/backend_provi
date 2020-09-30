import { Request, Response, NextFunction } from 'express';

import { verify } from 'jsonwebtoken';

import authConfig from '../../../config/auth';

import AppError from '../../../errors/AppError';

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
): void {
    const authHeader = `Bearer ${req.body.token}`;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        console.log(decoded);

        const { sub } = decoded as ITokenPayload;

        req.user = { id: sub };

        return next();
    } catch (error) {
        console.log('ERRRRRRRRROOORRRRR', error);
        throw new AppError('Invalid JWT token', 401);
    }
}
