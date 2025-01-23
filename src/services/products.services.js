import prisma from "../common/prisma/init.prisma.js";

const productsServices = {
  allProducts: async () => {
    const products = await prisma.products.findMany();
    return products;
  },

  productById: async (id) => {
    const products = await prisma.products.findUnique({
      where: { product_id: id },
    });
    return products;
  },

  productByUserId: async (req) => {
    const userId = parseInt(req.params.userId);
    const products = await prisma.products.findMany({
      where: { user_id: userId },
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

  productType: async (product_type_id) => {
    const products = await prisma.products.findMany({
      where: { product_type_id: product_type_id },
    });

    return products;
  },

  themDanhMuc: async (product_name, description) => {
    const data = await prisma.product_type.create({
      data: {
        product_name: product_name,
        description: description,
      },
    });
    return data;
  },

  themSanPham: async (req) => {
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
        user_id: user_id,
        sizes: "M",
      },
    });
    return data;
  },

  updateProduct: async (
    id,
    name,
    price,
    quantity,
    material,
    form,
    color,
    design,
    description,
    image
  ) => {
    const data = await prisma.products.update({
      where: { product_id: id },
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

  deleteProduct: async (id) => {
    const data = await prisma.products.delete({
      where: { product_id: id },
    });
    return data;
  },
};

export default productsServices;
