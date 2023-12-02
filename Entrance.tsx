import { Button, Column, Error } from "@components";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { Box, Center, NativeBaseProvider, StatusBar, View } from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import FlashMessage from "react-native-flash-message";
import { useAuth, useShop } from "./src/hooks";
import AppNavigator from "./src/navigation/AppNavigator";

const Entrance = () => {
  const { theme, checkInitailAuth } = useAuth();
  const [loaded, setloaded] = useState(false);
  const [isAppReady, setAppReady] = useState(true);
  const { isError: shopLoadError, isSuccess: shopLoaded } = useShop();
  const onLayoutRootView = useCallback(async () => {
    if (isAppReady) {
      await SplashScreen.hideAsync();
    }
  }, [isAppReady]);

  const load = (type: string) => {
    setloaded(false);
    checkInitailAuth(type, () => {
      setloaded(true);
    });
  };

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.colors.primary,
    },
  };

  return (
    <NativeBaseProvider theme={theme}>
      {!isAppReady ? null : shopLoadError ? (
        <Error />
      ) : (
        <>
          <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

          <FlashMessage position="top" statusBarHeight={5} />
          <Box flex={1} background="primary" onLayout={onLayoutRootView}>
            <NavigationContainer theme={MyTheme}>
              {Platform.OS === "web" ? (
                <Center flex={1} w="full">
                  <View w="full" maxW={600} h="full">
                    {loaded ? (
                      <AppNavigator />
                    ) : (
                      <Column justifyContent="center" alignItems="center" h="full" space={4}>
                        <Button
                          onPress={() => load("manager")}
                          w="1/2"
                          scheme="success"
                          title="تست مدیریت سالن"
                        />
                        <Button
                          onPress={() => load("client")}
                          w="1/2"
                          scheme="warning"
                          title="تست سمت مشتریان"
                        />
                      </Column>
                    )}
                  </View>
                </Center>
              ) : loaded ? (
                <AppNavigator />
              ) : (
                <Column justifyContent="center" alignItems="center" h="full" space={4}>
                  <Button
                    onPress={() => load("manager")}
                    w="1/2"
                    scheme="success"
                    title="تست مدیریت سالن"
                  />
                  <Button
                    onPress={() => load("client")}
                    w="1/2"
                    scheme="warning"
                    title="تست سمت مشتریان"
                  />
                </Column>
              )}
            </NavigationContainer>
          </Box>
        </>
      )}
    </NativeBaseProvider>
  );
};

export default Entrance;
