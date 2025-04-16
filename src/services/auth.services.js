import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const authServices = {
  register: async (req) => {
    const { userName, email, password, phone, avata } = req.body;
    const userExists = await prisma.users.findFirst({
      where: { email: email },
    });

    if (userExists) {
      throw new BadRequestException("Tài khoản đã tồn tại !");
    }

    const passwordHash = bcrypt.hashSync(password, 10);

    const newUser = await prisma.users.create({
      data: {
        userName: userName,
        email: email,
        password: passwordHash,
        phone: phone,
        avata: avata,
      },
    });

    delete newUser.password;

    return newUser;
  },

  login: async (req) => {
    const { email, password } = req.body;
    const userExists = await prisma.users.findFirst({
      where: { email: email },
    });

    if (!userExists) {
      throw new BadRequestException("Tài khoản không tồn tại !");
    }

    if (!userExists.password) {
      if (userExists.facebook_app_id) {
        throw new BadRequestException(
          "Vui lòng đăng nhập bằng tài khoản Facebook !"
        );
      }
      if (userExists.google_app_id) {
        throw new BadRequestException(
          "Vui lòng đăng nhập bằng tài khoản Google !"
        );
      }

      throw new BadRequestException("Liên hệ trung tâm chăm sóc khách hàng !");
    }

    const isPassword = bcrypt.compareSync(password, userExists.password);

    if (!isPassword) {
      throw new BadRequestException("Mật khẩu không chính xác !");
    }

    const tokens = authServices.createTokens(userExists.user_id);

    return tokens;
  },

  loginFacebook: async (avata, email, id, name) => {
    let userExists = await prisma.users.findFirst({
      where: { email: email },
    });

    if (!userExists) {
      userExists = await prisma.users.create({
        data: {
          email: email,
          userName: name,
          avata: avata,
          facebook_app_id: id,
        },
      });
    }

    const tokens = authServices.createTokens(userExists.user_id);

    return tokens;
  },

  loginGoogle: async (req) => {
    const { name, email, avata } = req.body;
    console.log({ name, email, avata });
    let userExists = await prisma.users.findFirst({
      where: { email: email },
    });

    if (!userExists) {
      userExists = await prisma.users.create({
        data: {
          userName: name,
          email: email,
          avata: avata,
        },
      });
    }

    const tokens = authServices.createTokens(userExists.user_id);

    return tokens;
  },

  createTokens: (userId) => {
    if (!userId) throw new BadRequestException(`Không có userId để tạo token`);

    const accessToken = jwt.sign(
      { userId: userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRED }
    );

    const refreshToken = jwt.sign(
      { userId: userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRED }
    );

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  },
};
export default authServices;
