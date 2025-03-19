import { responseSuccess } from "../common/helpers/reposonse.helper.js";
import productsServices from "../services/products.services.js";

const productsController = {
  allProducts: async (req, res, next) => {
    try {
      const product = await productsServices.allProducts();
      const resData = responseSuccess(
        product,
        `Lấy tất cả sản phẩm thành công`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  productById: async (req, res, next) => {
    try {
      const product = await productsServices.productById(req);
      const resData = responseSuccess(product, `Lấy sản phẩm thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  productByUserId: async (req, res, next) => {
    try {
      const product = await productsServices.productByUserId(req);
      const resData = responseSuccess(
        product,
        `Tìm thấy ${product.length} sản phẩm`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  productByProductName: async (req, res, next) => {
    try {
      const product = await productsServices.productByProductName(req);
      const resData = responseSuccess(
        product,
        `Tìm thấy ${product.length} sản phẩm`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  productByCategory: async (req, res, next) => {
    try {
      const product = await productsServices.productByCategory();
      const resData = responseSuccess(
        product,
        `Lấy tất cả sản phẩm thành công`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  productType: async (req, res, next) => {
    try {
      const product = await productsServices.productType(req);
      const resData = responseSuccess(
        product,
        `Lấy tất cả sản phẩm thành công`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  addCategoryProduct: async (req, res, next) => {
    try {
      const product = await productsServices.addCategoryProduct(req);
      const resData = responseSuccess(product, `Thêm danh mục thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  addProduct: async (req, res, next) => {
    try {
      const product = await productsServices.addProduct(req);
      const resData = responseSuccess(product, `Thêm sản phẩm thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    try {
      const product = await productsServices.updateProduct(req);
      const resData = responseSuccess(product, `Sửa sản phẩm thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    try {
      const product = await productsServices.deleteProduct(req);
      const resData = responseSuccess(product, `Xóa sản phẩm thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  checkout: async (req, res, next) => {
    try {
      const product = await productsServices.checkout(req);
      const resData = responseSuccess(product, `Thanh toán thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default productsController;
