import { responseSuccess } from "../common/helpers/reposonse.helper.js";
import cartServices from "../services/cart.services.js";

const cartController = {
  addToCart: async (req, res, next) => {
    try {
      const product = await cartServices.addToCart(req);
      const metaData = responseSuccess(
        product,
        "Thêm vào giỏ hàng thành công !",
        200
      );
      res.status(metaData.code).json(metaData);
    } catch (error) {
      next(error);
    }
  },
  getCartById: async (req, res, next) => {
    try {
      const product = await cartServices.getCartById(req);
      const metaData = responseSuccess(
        product,
        "Lấy giỏ hàng thành công !",
        200
      );
      res.status(metaData.code).json(metaData);
    } catch (error) {
      next(error);
    }
  },
  deleteProductCart: async (req, res, next) => {
    try {
      const product = await cartServices.deleteProductCart(req);
      const metaData = responseSuccess(
        product,
        "Xóa sản phẩm thành công !",
        200
      );
      res.status(metaData.code).json(metaData);
    } catch (error) {
      next(error);
    }
  },
};

export default cartController;
