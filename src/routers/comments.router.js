import express from "express";
import commentsController from "../controllers/comments.controller.js";
const commentsRouter = express.Router();

// lấy tất cả bình luận
commentsRouter.get("/getAllComment", commentsController.getAllComment);

// lấy bình luận theo userId
commentsRouter.get(
  "/getCommentByUserId",
  commentsController.getCommentByUserId
);

// lấy bình luận theo id sản phẩm
commentsRouter.get(
  "/getCommentByProductId",
  commentsController.getCommentByProductId
);

// thêm bình luận
commentsRouter.post("/addComment", commentsController.addComment);

// sửa bình luận
commentsRouter.put("/updateComment", commentsController.updateComment);

// xóa bình luận
commentsRouter.delete("/deleteComment", commentsController.deleteComment);
export default commentsRouter;
