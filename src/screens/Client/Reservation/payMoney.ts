import axios from "axios";
import qs from "qs";

export const generateToken = async (
  amount: number,
  api_key = "eeb112cc-c699-48fe-b8b7-4fc7f4213c72",
  order_id = "fsdfsdf",
  callback_uri = "https://aliscoder.github.io/beauty-web"
) => {
  const tokenConfig = {
    method: "post",
    url: "https://nextpay.org/nx/gateway/token",
    data: qs.stringify({
      api_key,
      order_id,
      amount,
      callback_uri,
    }),
  };

  const res = await axios(tokenConfig);
  return res.data.trans_id;
};
