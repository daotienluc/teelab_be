import { responseSuccess } from "../common/helpers/reposonse.helper.js";
import authServices from "../services/auth.services.js";

const authController = {
  register: async (req, res, next) => {
    try {
      const register = await authServices.register(req);
      const resData = responseSuccess(register, `Đăng ký thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const login = await authServices.login(req);
      const resData = responseSuccess(login, `Đăng nhập thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  loginFacebook: async (req, res, next) => {
    const { avata, email, id, name } = req.body;
    try {
      const login = await authServices.loginFacebook(avata, email, id, name);
      const resData = responseSuccess(login, `Đăng nhập thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  loginGoogle: async (req, res, next) => {
    try {
      const login = await authServices.loginGoogle(req);
      const resData = responseSuccess(login, `Đăng nhập thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
