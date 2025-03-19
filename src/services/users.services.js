import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";
import bcrypt from "bcrypt";

const usersService = {
  getAllUser: async () => {
    const data = await prisma.users.findMany();

    return data;
  },

  getUserById: async (req) => {
    const { id } = req.params;
    const data = await prisma.users.findUnique({ where: { user_id: +id } });
    const newData = { ...data, password: (data.password = "") };
    return newData;
  },

  addUser: async (req) => {
    const { userName, phone, email, password, avata, role } = req.body;
    let userExists = await prisma.users.findFirst({ where: { email: email } });
    if (userExists) {
      throw new BadRequestException("Tài khoản đã tồn tại !");
    } else {
      const passwordHash = bcrypt.hashSync(password, 10);
      userExists = await prisma.users.create({
        data: {
          userName: userName,
          email: email,
          password: passwordHash,
          phone: phone,
          avata: avata,
          role: role,
        },
      });
    }

    return userExists;
  },

  updateUser: async (req) => {
    const { id } = req.params;
    const { userName, phone, email, avata } = req.body;

    const data = await prisma.users.update({
      where: { user_id: +id },
      data: {
        userName: userName,
        email: email,
        phone: phone,
        avata: avata,
      },
    });
    return data;
  },

  deleteUser: async (req) => {
    const { id } = req.params;
    const checkId = await prisma.users.findFirst({ where: { user_id: +id } });
    if (!checkId) {
      throw new BadRequestException("Không tìm thấy user !");
    }
    const data = await prisma.users.delete({ where: { user_id: +id } });
    return [];
  },
};
export default usersService;
