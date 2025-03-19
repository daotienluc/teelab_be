export const authSwagger = {
  "/auth/register": {
    post: {
      tags: ["Auths"],
      responses: { 200: { description: "Thành công !" } },
      requestBody: {
        description: "Dữ liệu để đăng kí tài khoản !",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                userName: { type: "string" },
                email: { type: "string" },
                password: { type: "string" },
                phone: { type: "string" },
                avata: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
  "/auth/login": {
    post: {
      tags: ["Auths"],
      responses: { 200: { description: "Thành công !" } },
      requestBody: {
        description: "Dữ liệu để đăng nhập hệ thống !",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                email: { type: "string" },
                password: { type: "string" },
              },
            },
          },
        },
      },
    },
  },
};
