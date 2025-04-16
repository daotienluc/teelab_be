import { BadRequestException } from "../common/helpers/error.helper.js";
import prisma from "../common/prisma/init.prisma.js";

const productsServices = {
  allProducts: async () => {
    const products = await prisma.products.findMany();
    return products;
  },

  productById: async (req) => {
    const { id } = req.params;
    const products = await prisma.products.findUnique({
      where: { product_id: +id },
    });
    return products;
  },

  productByUserId: async (req) => {
    const { user_id } = req.params;
    console.log({ user_id });
    const products = await prisma.products.findMany({
      where: { user_id: +user_id },
    });
    return products;
  },

  productByProductName: async (req) => {
    const { productName } = req.params;
    const products = await prisma.products.findMany({
      where: {
        product_name: {
          contains: productName,
        },
      },
    });
    return products;
  },

  productByCategory: async () => {
    const products = await prisma.product_type.findMany();

    return products;
  },

  productType: async (req) => {
    const { productTypeId } = req.params;
    const products = await prisma.products.findMany({
      where: { product_type_id: +productTypeId },
    });

    return products;
  },

  addCategoryProduct: async (req) => {
    const { product_name, description } = req.body;
    const data = await prisma.product_type.create({
      data: {
        product_name: product_name,
        description: description,
      },
    });
    return data;
  },

  addProduct: async (req) => {
    const {
      name,
      price,
      material,
      form,
      color,
      design,
      description,
      image,
      product_type_id,
      user_id,
    } = req.body;
    console.log(product_type_id);
    const data = await prisma.products.create({
      data: {
        product_name: name,
        price: price,
        material: material,
        form: form,
        color: color,
        design: design,
        description: description,
        image: image,
        product_type: {
          connect: { product_type_id },
        },
        users: {
          connect: { user_id },
        },
      },
    });
    return data;
  },

  updateProduct: async (req) => {
    const { id } = req.params;
    const {
      name,
      price,
      quantity,
      material,
      form,
      color,
      design,
      description,
      image,
    } = req.body;
    const data = await prisma.products.update({
      where: { product_id: +id },
      data: {
        product_name: name,
        price: price,
        quantity: quantity,
        material: material,
        form: form,
        color: color,
        design: design,
        description: description,
        image: image,
      },
    });
    return data;
  },

  deleteProduct: async (req) => {
    const { id } = req.params;
    const chechId = await prisma.products.findFirst({
      where: { product_id: +id },
    });
    if (!chechId) {
      throw new BadRequestException("Không tìm thấy sản phẩm !");
    }
    await prisma.products.delete({
      where: { product_id: +id },
    });
    return [];
  },

  checkout: async (req) => {
    const { user_id, discount_id, products, description } = req.body;

    // Tạo đơn hàng mới trong bảng `orders`
    const productNew = await prisma.orders.create({
      data: {
        user_id: user_id,
        discount_id: discount_id || null,
        description: description || null,
      },
    });
    const order_id = productNew.order_id;

    // Tạo danh sách các bản ghi cho bảng `orderDetail`
    const orderDetails = products.map((product) => ({
      quantity: product.quantity,
      product_id: product.product_id,
      order_id: order_id,
    }));

    await prisma.orderDetail.createMany({
      data: orderDetails,
    });

    // Tính tổng giá trị đơn hàng ban đầu
    const productIds = products.map((p) => p.product_id);
    const productPrices = await prisma.products.findMany({
      where: {
        product_id: { in: productIds },
      },
      select: {
        product_id: true,
        price: true,
      },
    });

    let totalPrice = 0;
    products.forEach((product) => {
      const price = productPrices.find(
        (p) => p.product_id === product.product_id
      ).price;
      totalPrice += price * product.quantity;
    });

    // Xử lý giảm giá nếu có discount_id
    let discountAmount = 0;
    let finalPrice = totalPrice;
    let discountInfo = null;

    if (discount_id) {
      const discount = await prisma.discounts.findUnique({
        where: { discount_id: discount_id },
      });

      if (
        discount &&
        discount.date_start <= new Date() &&
        discount.date_end >= new Date()
      ) {
        discountAmount = parseFloat(discount.discount_percentage); // Lấy số tiền giảm cố định
        finalPrice = totalPrice - discountAmount; // Tổng tiền sau giảm
        discountInfo = {
          name: discount.name_discount,
          amount: discountAmount,
        };
      } else {
        console.log("Mã giảm giá không hợp lệ hoặc đã hết hạn");
      }
    }

    return {
      order: productNew,
      details: orderDetails,
      total_price: totalPrice,
      discount: discountInfo,
      final_price: finalPrice,
    };
  },
};

export default productsServices;
