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
      where: { creater_id: +user_id },
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
      quantity,
      material,
      form,
      color,
      design,
      description,
      image,
      product_type,
      user_id,
    } = req.body;
    const data = await prisma.products.create({
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
        product_type_id: product_type,
        creater_id: user_id,
        sizes: "M",
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
    const data = await prisma.products.delete({
      where: { product_id: +id },
    });
    return [];
  },
};

export default productsServices;
