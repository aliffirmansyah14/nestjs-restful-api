import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthMiddeware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}
  async use(req: any, res: any, next: (error?: any) => void) {
    // jika login skip
    const url = req.url as string;
    if (url.includes('/login')) {
      next();
      return;
    }
    // check token
    const token = req.headers['Authorization'] as string;

    if (!token) throw new HttpException('Silahkkan login terlebih dahulu', 401);
    // validasi token
    const user = await this.prismaService.user.findFirst({
      where: {
        token,
      },
    });

    if (!user) throw new HttpException('Token tidak valid', 401);

    req.user = user;

    next();
  }
}
