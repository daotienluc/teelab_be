import { responseSuccess } from "../common/helpers/reposonse.helper.js";
import commentsServices from "../services/comments.services.js";

const commentsController = {
  getAllComment: async (req, res, next) => {
    try {
      const data = await commentsServices.getAllComment();
      const resData = responseSuccess(
        data,
        `Lấy tất cả bình luận thành công !`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getCommentByUserId: async (req, res, next) => {
    try {
      const data = await commentsServices.getCommentByUserId(req);
      const resData = responseSuccess(
        data,
        `Lấy bình luận theo user id thành công !`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  getCommentByProductId: async (req, res, next) => {
    try {
      const product = await commentsServices.getCommentByProductId(req);
      const resData = responseSuccess(
        product,
        `Lấy bình luận theo id sản phẩm thành công !`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  addComment: async (req, res, next) => {
    try {
      const product = await commentsServices.addComment(req);
      const resData = responseSuccess(product, `Bình luận thành công !`, 200);
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  updateComment: async (req, res, next) => {
    try {
      const product = await commentsServices.updateComment(req);
      const resData = responseSuccess(
        product,
        `Sửa bình luận thành công !`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
  deleteComment: async (req, res, next) => {
    try {
      const product = await commentsServices.deleteComment(req);
      const resData = responseSuccess(
        product,
        `Xóa bình luận thành công !`,
        200
      );
      res.status(resData.code).json(resData);
    } catch (error) {
      next(error);
    }
  },
};
export default commentsController;
