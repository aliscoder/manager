import { Button, Column, Container, TextNormal, TextTitle } from "@components";
import { Link } from "native-base";
import React from "react";
import { EXPO_PUBLIC_APP_LINK } from "src/utils/data";

type Props = {};

const Update = (props: Props) => {
  return (
    <Column space={3} p={3} alignItems="center" justifyContent="center" h="full">
      <TextTitle>اپلیکیشن نیاز به آپدیت دارد</TextTitle>
      <Link href={EXPO_PUBLIC_APP_LINK}>
        <Button scheme="secondary" title="دانلود نسخه جدید" />
      </Link>
    </Column>
  );
};

export default Update;
