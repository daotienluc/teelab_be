export const productSwagger = {
  "/products/allProducts": {
    get: {
      tags: ["Products"],
      responses: {
        200: {
          description: "Thành công !",
        },
      },
    },
  },
  "/products/product-by-productName/{id}": {
    get: {
      tags: ["Products"],

      responses: {
        200: {
          description: "Thành công !",
        },
      },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Truyền id của sản phẩm",
          required: true,
          schema: {
            type: "number",
          },
        },
      ],
    },
  },
  "/products/search/{productName}": {
    get: {
      tags: ["Products"],
      responses: {
        200: {
          description: "Thành công !",
        },
      },
      parameters: [
        {
          name: "productName",
          in: "path",
          description: "Tìm kiếm theo tên sản phẩm !",
          schema: { type: "string" },
        },
      ],
    },
  },
  "/products/product-by-userId/{userId}": {
    get: {
      tags: ["Products"],
      responses: {
        200: {
          description: "Thành công !",
        },
      },
      parameters: [
        {
          name: "userId",
          in: "path",
          description: "Truyền userId của người tạo ra sản phẩm !",
          required: true,
          schema: { type: "number" },
        },
      ],
    },
  },
  "/products/product-category": {
    get: {
      tags: ["Products"],
      responses: {
        200: {
          description: "Thành công !",
        },
      },
    },
  },
  "/products/product-type/{productTypeId}": {
    get: {
      tags: ["Products"],
      responses: {
        200: {
          description: "Thành công !",
        },
      },
      parameters: [
        {
          name: "productTypeId",
          in: "path",
          required: true,
          description: "Truyền id của danh mục sản phẩm !",
          schema: { type: "number" },
        },
      ],
    },
  },
  "/products/addCategoryProduct": {
    post: {
      tags: ["Products"],
      responses: {
        200: { description: "Thành công !" },
      },
      requestBody: {
        description: "Thêm danh mục sản phẩm !",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                product_name: { type: "string" },
                description: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  "/products/addProduct": {
    post: {
      tags: ["Products"],
      responses: { 200: { description: "Thành công !" } },
      requestBody: {
        description: "Dữ liệu để thêm sản phẩm !",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "number" },
                quantity: { type: "number" },
                material: { type: "string" },
                form: { type: "string" },
                color: { type: "string" },
                design: { type: "string" },
                description: { type: "string" },
                image: { type: "string" },
                product_type_id: { type: "number" },
                creater_id: { type: "number" },
              },
            },
          },
        },
      },
    },
  },
  "/products/updateProduct/{id}": {
    put: {
      tags: ["Products"],
      responses: { 200: { description: "Thành công !" } },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Truyền id của sản phẩm để sửa !",
          required: true,
          schema: { type: "number" },
        },
      ],
      requestBody: {
        description: "Dữ liệu để sửa sản phẩm !",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                name: { type: "string" },
                price: { type: "number" },
                quantity: { type: "number" },
                material: { type: "string" },
                form: { type: "string" },
                color: { type: "string" },
                design: { type: "string" },
                description: { type: "string" },
                image: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  "/products/deleteProduct/{id}": {
    delete: {
      tags: ["Products"],
      responses: { 200: { description: "Thành công !" } },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Truyền id của sản phẩm để xóa !",
          required: true,
          schema: { type: "number" },
        },
      ],
    },
  },
};
