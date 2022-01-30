import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @Post('/register')
    async registerAccount(@Req() req: Request, @Body() userDTO: UserDTO): Promise<any> {
        return await this.authService.registerUser(userDTO);
    }

    @Post('/login')
    async login(@Body() userDTO: UserDTO, @Res() res: Response): Promise<any> {
        const jwt = await this.authService.validateUser(userDTO);
        res.setHeader('Authorization', 'Bearer '+jwt.accessToken);
        return res.json(jwt);
    }
}
