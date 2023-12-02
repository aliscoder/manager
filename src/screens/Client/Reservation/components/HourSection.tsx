import { Button, Card, List } from "@components";
import { FlashList } from "@shopify/flash-list";
import { CONVERTER, DEVICE } from "@utils";
import { isEqual } from "lodash";
import { Center, Spinner, Text, View } from "native-base";
import React, { memo, useCallback } from "react";
export type Hour = {
  start: number;
  end: number;
  inRest: boolean;
  isLong: boolean;
};

type Props = {
  hours: Hour[] | undefined;
  isLoading: boolean;
  selected: Hour | undefined;
  onChangeHour: (item: Hour) => void;
};
const HourSection: React.FC<Props> = ({ hours, selected, isLoading, onChangeHour }) => {
  const keyExtractHandler = useCallback((item: Hour) => {
    return item.start.toString();
  }, []);

  const renderHours = useCallback(
    ({ item, index }: { item: Hour; index: number }) => (
      <Button
        p={2}
        onPress={() => onChangeHour(item)}
        mr={index !== 0 ? 3 : 0}
        w={40}
        LIcon={item.isLong ? "fitness-outline" : item.inRest ? "bed-outline" : "time-outline"}
        outline={selected?.end !== item.end}
        scheme={item.isLong ? "warning" : item.inRest ? "danger" : "success"}
        titleColor={
          selected?.end === item.end
            ? "text.light"
            : item.isLong
            ? "warning"
            : item.inRest
            ? "danger"
            : "success"
        }
        title={CONVERTER(item.start) + " - " + CONVERTER(item.end)}
      />
    ),
    [selected]
  );

  return (
    <Card
      transparent
      title="انتخاب ساعت"
      subtitle="ساعت مورد نظر را از بین روز های مورد نظر انتخاب کنید"
    >
      {isLoading ? (
        <Center style={{ paddingTop: 10 }}>
          <Spinner size="sm" color="text.secondary" />
        </Center>
      ) : !hours ? (
        <Center style={{ paddingTop: 10 }}>
          <Text color="danger">ابتدا نوع اصلاح و روز را انتخاب کنید</Text>
        </Center>
      ) : hours.length < 1 ? (
        <Center style={{ paddingTop: 10 }}>
          <Text color="danger">متاسفانه زمان مناسبی یافت نشد</Text>
        </Center>
      ) : (
        <View maxH={16}>
          <List
            contentContainerStyle={{ paddingTop: 10 }}
            extraData={selected}
            isPerformant
            keyExtractor={keyExtractHandler}
            estimatedListSize={{ width: DEVICE.width - 16, height: DEVICE.height }}
            estimatedItemSize={96}
            // decelerationRate={15}
            horizontal
            inverted
            showsHorizontalScrollIndicator={false}
            data={hours}
            renderItem={renderHours}
          />
        </View>
      )}
    </Card>
  );
};

export default memo(HourSection, isEqual);
