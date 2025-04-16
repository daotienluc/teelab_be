import axios from "axios";
import crypto from "crypto";
import prisma from "../common/prisma/init.prisma.js";
import { responseSuccess } from "../common/helpers/reposonse.helper.js";

var secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
var accessKey = "F8BBA842ECF85";

const checkoutService = {
  getAllOrder: async (req, res, next) => {
    const data = await prisma.orders.findMany();
    const result = responseSuccess(data, "Lấy tất cả user thành công !", 200);
    return res.json(result);
  },

  // Thanh toán khi nhận hàng
  payLater: async (req, res, next) => {
    const { addressForm, user_id, amounts, products } = req.body;
    const dataAddress = await prisma.orders_address.create({
      data: {
        address: addressForm.diaChi,
        province: addressForm.tinhThanh,
        district: addressForm.quanHuyen,
        wards_and_communes: addressForm.phuongXa,
        description: addressForm.ghiChu,
      },
    });
    const orderId = `PAYLATER${Math.floor(Math.random() * 10000)}`;
    const data = await prisma.orders.create({
      data: {
        order_id: orderId,
        user_id: user_id,
        request_id: orderId,
        amount: amounts,
        orders_address_id: dataAddress.orders_address_id,
        order_info: "pay later",
        status: "pending",
        order_details: {
          create: products.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
    const result = responseSuccess(data, "Thanh toán thành công !", 200);
    return res.json(result);
  },

  payment: async (req, res, next) => {
    const { addressForm, user_id, amounts, products } = req.body;
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters

    var orderInfo = "pay with MoMo";
    var partnerCode = "MOMO";
    var redirectUrl = "http://localhost:5173";
    var ipnUrl = "https://teelab-be.onrender.com/api/checkout/callback";
    var requestType = "payWithMethod";
    var amount = amounts;
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = "";
    var orderGroupId = "";
    var autoCapture = true;
    var lang = "vi";

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      "accessKey=" +
      accessKey +
      "&amount=" +
      amount +
      "&extraData=" +
      extraData +
      "&ipnUrl=" +
      ipnUrl +
      "&orderId=" +
      orderId +
      "&orderInfo=" +
      orderInfo +
      "&partnerCode=" +
      partnerCode +
      "&redirectUrl=" +
      redirectUrl +
      "&requestId=" +
      requestId +
      "&requestType=" +
      requestType;
    //puts raw signature
    console.log("--------------------RAW SIGNATURE----------------");
    console.log(rawSignature);
    //signature

    var signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");
    console.log("--------------------SIGNATURE----------------");
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });
    // opstion for axios
    const opstions = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/create",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(requestBody),
      },
      data: requestBody,
    };

    let result;
    try {
      const dataAddress = await prisma.orders_address.create({
        data: {
          address: addressForm.diaChi,
          province: addressForm.tinhThanh,
          district: addressForm.quanHuyen,
          wards_and_communes: addressForm.phuongXa,
          description: addressForm.ghiChu,
        },
      });

      // lưu đơn hàng xuống db
      await prisma.orders.create({
        data: {
          order_id: orderId,
          request_id: requestId,
          user_id: user_id,
          amount: amount,
          order_info: orderInfo,
          orders_address_id: dataAddress.orders_address_id,
          status: "pending",
          order_details: {
            create: products.map((item) => ({
              product_id: item.product_id,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });

      // gửi yêu cầu sang momo
      result = await axios(opstions);
      return res.status(200).json(result.data);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  callback: async (req, res, next) => {
    const { orderId, resultCode } = req.body;
    try {
      const status = resultCode === 0 ? "success" : "failed";

      await prisma.orders.update({
        where: { order_id: orderId },
        data: { status },
      });

      return res.status(200).json({ message: "Updated order status" });
    } catch (error) {
      console.error("Callback error:", error);
      return res.status(500).json({ error: "Failed to update order status" });
    }
  },
  checkStatusTransaction: async (req, res, next) => {
    const { orderId } = req.body;
    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;
    const signature = crypto
      .createHmac("sha256", secretKey)
      .update(rawSignature)
      .digest("hex");
    const requestBody = JSON.stringify({
      partnerCode: "MOMO",
      requestId: orderId,
      orderId: orderId,
      signature: signature,
      lang: "vi",
    });

    // options for axios
    const options = {
      method: "POST",
      url: "https://test-payment.momo.vn/v2/gateway/api/query",
      headers: {
        "Content-Type": "application/json",
      },
      data: requestBody,
    };

    const result = await axios(options);

    return res.status(200).json(result.data);
  },
};
export default checkoutService;
