import { responseSuccess } from "../common/helpers/reposonse.helper.js";
import usersService from "../services/users.services.js";

const usersController = {
  getAllUser: async (req, res, next) => {
    try {
      const userId = await usersService.getAllUser();
      const resData = responseSuccess(userId, `Lấy id user thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
    try {
      const userId = await usersService.getUserById(req);
      const resData = responseSuccess(userId, `Lấy id user thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  addUser: async (req, res, next) => {
    try {
      const userId = await usersService.addUser(req);
      const resData = responseSuccess(userId, `Thêm user thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const userId = await usersService.updateUser(req);
      const resData = responseSuccess(userId, `Sửa user thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const userId = await usersService.deleteUser(req);
      const resData = responseSuccess(userId, `Xóa user thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default usersController;
