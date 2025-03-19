export const userSwagger = {
  "/users/getAllUser": {
    get: {
      tags: ["Users"],
      responses: { 200: { description: "Thành công !" } },
    },
  },
  "/users/getUserById/{id}": {
    get: {
      tags: ["Users"],
      responses: { 200: { description: "Thành công !" } },
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "Truyền id để lấy ra user !",
        },
      ],
    },
  },
  "/users/addUser": {
    post: {
      tags: ["Users"],
      responses: { 200: { description: "Thành công !" } },
      requestBody: {
        description: "Dữ liệu để thêm user !",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userName: { type: "string" },
                phone: { type: "number" },
                email: { type: "number" },
                password: { type: "string" },
                avata: { type: "string" },
                role: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  "/users/updateUser/{id}": {
    put: {
      tags: ["Users"],
      responses: { 200: { description: "Thành công !" } },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Truyền id của user để sửa !",
          required: true,
          schema: { type: "number" },
        },
      ],
      requestBody: {
        description: "Dữ liệu để sửa user !",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userName: { type: "string" },
                phone: { type: "string" },
                email: { type: "string" },
                avata: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  "/users/deleteUser/{id}": {
    delete: {
      tags: ["Users"],
      responses: { 200: { description: "Thành công !" } },
      parameters: [
        {
          name: "id",
          in: "path",
          description: "Truyền id của user để sửa !",
          required: true,
          schema: { type: "number" },
        },
      ],
    },
  },
};
