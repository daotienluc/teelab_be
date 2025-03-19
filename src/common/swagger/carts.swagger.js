export const cartSwagger = {
  "/cart/addToCart": {
    post: {
      tags: ["Carts"],
      responses: { 200: { description: "Thành công !" } },
      requestBody: {
        description: "Dữ liệu để thêm sản phẩm vào giỏ hàng !",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: { type: "number" },
                product_id: { type: "number" },
                price: { type: "number" },
                color: { type: "string" },
                form: { type: "string" },
                quantity: { type: "number" },
                sizes: { type: "string" },
                image: { type: "string" },
                product_name: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  "/cart/getCartById/{id}": {
    post: {
      tags: ["Carts"],
      responses: { 200: { description: "Thành công !" } },
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "truyền id để lấy thông tin giỏ hàng !",
          schema: { type: "number" },
        },
      ],
    },
  },
};
