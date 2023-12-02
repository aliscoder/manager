import { useToast } from "@hooks";
import { GuestScreenNavigationProp } from "@navigation/types";
import { useNavigation } from "@react-navigation/core";
import { useCheckPhoneExistanceMutation } from "@state/api/auth";
import { EXPO_PUBLIC_APP_ID } from "@utils";

import { useCallback, useEffect, useState } from "react";

const useSendCode = () => {
  const { showError } = useToast();
  const { navigate } = useNavigation<GuestScreenNavigationProp>();

  const [phone, setPhone] = useState("");

  const [checkPhoneExistance, { isLoading, isError, isSuccess, data, error }] =
    useCheckPhoneExistanceMutation();

  const handlePhoneChange = useCallback((text: string) => {
    setPhone(text);
  }, []);

  function handleSendCode() {
    const regex = RegExp("09(0[1-9]|1[0-9]|3[0-9]|2[1-9]|9[0-9])-?[0-9]{3}-?[0-9]{4}");
    if (!regex.test(phone) || phone.trim().length !== 11) {
      showError("شماره موبایل نامعتبر است");
    } else {
      checkPhoneExistance({ phone, appId: EXPO_PUBLIC_APP_ID });
    }
  }

  useEffect(() => {
    if (isError && error) {
      //@ts-ignore
      showError(error.data.error || "خطا در برقراری ارتباط");
    }
    if (isSuccess && data) {
      if (data.status === "registered") {
        navigate("Login", { phone, type: data.type! });
      }
      if (data.status === "new") {
        navigate("Register", { phone });
      }
    }
  }, [isSuccess, isError]);

  return { handlePhoneChange, isLoading, handleSendCode };
};

export default useSendCode;