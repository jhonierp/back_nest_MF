import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import { RolesService } from '../roles/roles.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly rolesService: RolesService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    // Verificar si el usuario ya existe
    const userExists = await this.usuariosService.findByEmail(
      registerDto.email,
    );
    if (userExists) {
      throw new BadRequestException('El correo electrónico ya está registrado');
    }

    // Crear el usuario
    const usuario = await this.usuariosService.create({
      ...registerDto,
      tipo_autenticacion: 'telefono', // Por defecto
    });

    // Asignar rol de usuario_free por defecto
    const rolUsuarioFree = await this.rolesService.findByNombre('usuario_free');
    await this.usuariosService.asignarRol(usuario.id, rolUsuarioFree.id);

    // Generar token JWT
    const token = this.generateToken(usuario);

    return {
      usuario,
      token,
    };
  }

  async login(loginDto: LoginDto) {
    let usuario;

    // Buscar por email o teléfono según el tipo de autenticación
    if (loginDto.email) {
      usuario = await this.usuariosService.findByEmail(loginDto.email);
    } else if (loginDto.telefono) {
      usuario = await this.usuariosService.findByTelefono(loginDto.telefono);
    } else {
      throw new BadRequestException('Debe proporcionar email o teléfono');
    }

    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar contraseña si es necesario
    if (loginDto.password) {
      const isPasswordValid = await bcrypt.compare(
        loginDto.password,
        usuario.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Credenciales inválidas');
      }
    }

    // Generar token JWT
    const token = this.generateToken(usuario);

    return {
      usuario,
      token,
    };
  }

  async googleLogin(req, res) {
    if (!req.user) {
      return res.redirect('/login?error=google_auth_failed');
    }

    const { email, nombre } = req.user;

    // Buscar si el usuario ya existe
    let usuario = await this.usuariosService.findByEmail(email);

    // Si no existe, crearlo
    if (!usuario) {
      usuario = await this.usuariosService.create({
        email,
        nombre,
        tipo_autenticacion: 'google',
      });

      // Asignar rol de usuario_free por defecto
      const rolUsuarioFree =
        await this.rolesService.findByNombre('usuario_free');
      await this.usuariosService.asignarRol(usuario.id, rolUsuarioFree.id);
    }

    // Generar token JWT
    const token = this.generateToken(usuario);

    // Redirigir al frontend con el token
    return res.redirect(`/auth/success?token=${token}`);
  }

  private generateToken(usuario: any) {
    const payload = {
      sub: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
      es_pro: usuario.es_pro,
    };

    return this.jwtService.sign(payload);
  }

  async validateUser(payload: any) {
    return this.usuariosService.findOne(payload.sub);
  }
}
