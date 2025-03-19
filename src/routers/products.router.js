import express from "express";
import productsController from "../controllers/products.controller.js";

const productsRouter = express.Router();

//  get thông tin bình luận theo sp, post bình luận sp

// lấy tất cả sản phẩm
productsRouter.get("/allProducts", productsController.allProducts);

// lấy chi tiết sản phẩm theo id sản phẩm
productsRouter.get("/productByProductName/:id", productsController.productById);

// tìm kiếm sản phẩm theo tên sản phẩm
productsRouter.get(
  "/search/:productName",
  productsController.productByProductName
);

// lấy sản phẩm theo userId (lấy sản phẩm theo người đã tạo ra sản phẩm)
productsRouter.get(
  "/productByUserId/:user_id",
  productsController.productByUserId
);

// lấy danh mục sản phẩm
productsRouter.get("/productCategory", productsController.productByCategory);

// lấy sản phẩm theo danh mục
productsRouter.get(
  "/productType/:productTypeId",
  productsController.productType
);

// thêm danh mục sản phẩm
productsRouter.post(
  "/addCategoryProduct",
  productsController.addCategoryProduct
);

// thêm sản phẩm
productsRouter.post("/addProduct", productsController.addProduct);

// sửa sản phẩm
productsRouter.put("/updateProduct/:id", productsController.updateProduct);

// xóa sản phẩm
productsRouter.delete("/deleteProduct/:id", productsController.deleteProduct);

// thanh toán
productsRouter.post("/checkout", productsController.checkout);

export default productsRouter;
