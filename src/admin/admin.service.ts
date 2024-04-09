import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as brcypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private readonly jwtService: JwtService,
  ) {}

  async getTokens(admin: AdminDocument) {
    const payload = {
      id: admin._id,
      isActive: admin.is_active,
      isOwner: admin.is_crator,
    };
    const [accessToken, refreshToken] = await Promise.all([
      // Signing access token with specified expiration and secret key
      this.jwtService.signAsync(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      // Signing refresh token with specified expiration and secret key
      this.jwtService.signAsync(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_jpassword } = createAdminDto;
    if (password !== confirm_jpassword) {
      throw new BadRequestException("Passwords don't match");
    }

    const hashed_password = await brcypt.hash(password, 7);

    const newAdmin = await this.adminModel.create({
      ...createAdminDto,
      hashed_password,
    });

    const tokens = await this.getTokens(newAdmin);
    const hashed_refresh_token = await brcypt.hash(tokens.refresh_token, 7);

    const updatedAdmin = await this.adminModel.findByIdAndUpdate(
      newAdmin._id,
      { hashed_refresh_token },
      { new: true },
    );

    return updatedAdmin;
  }

  findAll() {
    return this.adminModel.find();
  }

  findOne(id: string) {
    return this.adminModel.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminModel.findByIdAndUpdate(id, updateAdminDto)
  }

  remove(id: string) {
    return this.adminModel.deleteOne({ '_id': id })
  }
}
