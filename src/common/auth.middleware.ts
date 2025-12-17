import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AuthMiddeware implements NestMiddleware {
  private publicRoutes = ['/login', '/users'];
  constructor(private prismaService: PrismaService) {}
  async use(req: any, res: any, next: (error?: any) => void) {
    // jika login skip
    const url = (req.url as string).split('/');

    if (this.publicRoutes.includes(`/${url[url.length - 1]}`)) {
      return next();
    }
    // check token
    const token = req.headers['authorization'] as string;

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
