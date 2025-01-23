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
    const id = parseInt(req.params.id);
    try {
      const product = await productsServices.productById(id);
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
    const product_type_id = parseInt(req.params.product_type_id);
    try {
      const product = await productsServices.productType(product_type_id);
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

  themDanhMuc: async (req, res, next) => {
    const { product_name, description } = req.body;
    try {
      const product = await productsServices.themDanhMuc(
        product_name,
        description
      );
      const resData = responseSuccess(product, `Thêm danh mục thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  themSanPham: async (req, res, next) => {
    try {
      const product = await productsServices.themSanPham(req);
      const resData = responseSuccess(product, `Thêm sản phẩm thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  updateProduct: async (req, res, next) => {
    const id = parseInt(req.params.id);
    const {
      name,
      price,
      quantity,
      material,
      form,
      color,
      design,
      description,
      product_type,
      image,
    } = req.body;
    try {
      const product = await productsServices.updateProduct(
        id,
        name,
        price,
        quantity,
        material,
        form,
        color,
        design,
        description,
        product_type,
        image
      );
      const resData = responseSuccess(product, `Sửa sản phẩm thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },

  deleteProduct: async (req, res, next) => {
    const id = parseInt(req.params.id);

    try {
      const product = await productsServices.deleteProduct(id);
      const resData = responseSuccess(product, `Xóa sản phẩm thành công`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};

export default productsController;
