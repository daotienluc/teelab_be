import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const cartServices = {
  addToCart: async (req) => {
    const {
      id,
      product_id,
      price,
      color,
      form,
      quantity,
      sizes,
      image,
      product_name,
    } = req.body;

    try {
      // Kiểm tra xem sản phẩm đã có trong giỏ hàng hay chưa
      const existingCartItem = await prisma.cart.findFirst({
        where: { product_id: product_id },
      });
      if (existingCartItem) {
        // Nếu sản phẩm đã tồn tại, cập nhật số lượng
        const updatedCartItem = await prisma.cart.update({
          where: { cart_id: existingCartItem.cart_id },
          data: {
            quantity: existingCartItem.quantity + quantity,
          },
        });
        return updatedCartItem;
      } else {
        // Nếu sản phẩm chưa tồn tại, tạo mới sản phẩm trong giỏ hàng
        const newCartItem = await prisma.cart.create({
          data: {
            user_id: id,
            product_id: product_id,
            price: price,
            color: color,
            form: form,
            quantity: quantity,
            sizes: sizes,
            image: image,
            product_name: product_name,
          },
        });
        return newCartItem;
      }
    } catch (error) {
      console.error("Error in addToCart:", error);
      throw new Error(
        "Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!"
      );
    }
  },

  getCartById: async (req) => {
    const { id } = req.params;
    const idUser = await prisma.cart.findFirst({ where: { user_id: +id } });
    if (!idUser) {
      throw new BadRequestException("Không có sản phẩm nào trong giỏ hàng !");
    }
    const data = await prisma.cart.findMany({ where: { user_id: +id } });
    return data;
  },
  deleteProductCart: async (req) => {
    const { id } = req.params;
    const idCart = await prisma.cart.findFirst({ where: { cart_id: +id } });
    if (!idCart) {
      throw new BadRequestException("Không tìm thấy sản phẩm trong giỏ hàng !");
    }
    const data = await prisma.cart.delete({ where: { cart_id: +id } });
    return [];
  },
};

export default cartServices;
