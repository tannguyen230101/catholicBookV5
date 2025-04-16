import GlobalModalForm from '@/components/GlobalModalForm';
import CustomTabBar from '@/components/navigations/CustomTabBar';
import { screens } from '@/constants/screens';
import { ModalFormProvider } from '@/hooks/ModalFormContext';
import { TabBarVisibilityProvider } from '@/hooks/TabBarVisibilityContext';
import { Tabs } from 'expo-router';
import React from 'react';
// import 'react-native-reanimated';

export default function TabLayout() {
  return (
    <ModalFormProvider>
      <TabBarVisibilityProvider>
        <Tabs
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Tabs.Screen name={screens.bookStacks} />
          <Tabs.Screen name={screens.homeStack} />
          <Tabs.Screen name={screens.eventStacks} />
          <Tabs.Screen name={screens.profileStacks} />
        </Tabs>
      </TabBarVisibilityProvider>
      <GlobalModalForm />
    </ModalFormProvider>
  );
}
