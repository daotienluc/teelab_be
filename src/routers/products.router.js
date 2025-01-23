import express from "express";
import productsController from "../controllers/products.controller.js";

const productsRouter = express.Router();

//  get thông tin bình luận theo sp, post bình luận sp

// lấy tất cả sản phẩm
productsRouter.get("/allProducts", productsController.allProducts);

// lấy chi tiết sản phẩm theo id sản phẩm
productsRouter.get(
  "/product-by-productName/:id",
  productsController.productById
);

// tìm kiếm sản phẩm theo tên sản phẩm
productsRouter.get(
  "/search/:productName",
  productsController.productByProductName
);

// lấy sản phẩm theo userId (lấy sản phẩm theo người đã tạo ra sản phẩm)
productsRouter.get(
  "/product-by-userId/:userId",
  productsController.productByUserId
);

// lấy danh mục sản phẩm
productsRouter.get("/product-category", productsController.productByCategory);

// lấy sản phẩm theo danh mục
productsRouter.get(
  "/product-type/:product_type_id",
  productsController.productType
);

// thêm danh mục sản phẩm
productsRouter.post("/them-danh-muc", productsController.themDanhMuc);

// thêm sản phẩm
productsRouter.post("/them-san-pham", productsController.themSanPham);

// sửa sản phẩm
productsRouter.put("/update-product/:id", productsController.updateProduct);

// xóa sản phẩm
productsRouter.delete("/delete-product/:id", productsController.deleteProduct);

export default productsRouter;
