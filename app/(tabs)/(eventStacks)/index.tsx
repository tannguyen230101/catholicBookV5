import React, { useState } from 'react';
import { View } from 'react-native';
import { TabView, TabBar, NavigationState, SceneRendererProps } from 'react-native-tab-view';
import FamilyEvent from './familyEvent';
import { windowWidth } from '@/utils/device';
import COLORS from '@/constants/colors';
import ChurchEvent from './churchEvent';
import HeaderTabs from '@/components/HeaderTabs';
import styles from '@/assets/styles/eventHome.styles';

type Route = {
  key: string;
  // title: string;
};

export default function EventHome() {
  const [index, setIndex] = useState(0);

  const [routes] = useState([
    { key: 'family', title: 'Sự kiên gia đình' },
    { key: 'church', title: 'Sự kiện giáo xứ' },
  ]);

  const renderScene = ({ route }: SceneRendererProps & { route: Route }) => {
    switch (route.key) {
      case 'family':
        return <FamilyEvent />;
      case 'church':
        return <ChurchEvent />;
      default:
        return null;
    }
  };

  const renderTabBar = (props: SceneRendererProps & { navigationState: NavigationState<Route> }) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      activeColor={COLORS.black}
      inactiveColor={COLORS.black}
    />
  );

  return (
    <View style={styles.container}>
      <HeaderTabs title='Sự Kiện' />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ height: 0, width: windowWidth }}
        renderTabBar={renderTabBar}
        lazy={true}
        style={{ flex: 1 }}
        removeClippedSubviews={false}
      />
    </View>
  );
}

