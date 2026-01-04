
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import Scale from '../components/reanimated/Scale';
import Drag from '../components/reanimated/Drag';
import Color from '../components/reanimated/Color';
import ScrollViewEvents from '../components/reanimated/ScrollViewEvents';
import LayoutAnimations from '../components/reanimated/LayoutAnimations';
import CircularSlider from '../components/reanimated/CircularSlider';
// import Worklets from '../components/reanimated/Worklets';
import SharedElementTransitions from '../components/reanimated/SharedElementTransitions';
import WithDecay from '../components/reanimated/WithDecay';
import GestureTest from '../components/reanimated/GestureTest'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import CarouselTest from '@/components/reanimated/CarouselTest';

const tabs = [
  { name: 'Scale', component: Scale },
  { name: 'Drag', component: Drag },
  { name: 'Color', component: Color },
  { name: 'Scroll', component: ScrollViewEvents },
  { name: 'Layout', component: LayoutAnimations },
  { name: 'Slider', component: CircularSlider },
  // { name: 'Worklets', component: Worklets },
  { name: 'Shared', component: SharedElementTransitions },
  { name: 'Decay', component: WithDecay },
  { name: 'Gesture', component: GestureTest },
  { name: 'Carousel', component: CarouselTest },
];


const ReanimatedExamples = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { top } = useSafeAreaInsets()

  const ActiveComponent = tabs[activeTab].component;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.tabBar, { marginTop: top }]}>
            {tabs.map((tab, index) => (
              <TouchableOpacity
                key={tab.name}
                style={[
                  styles.tabItem,
                  activeTab === index && styles.activeTabItem,
                ]}
                onPress={() => setActiveTab(index)}
              >
                <Text
                  style={[
                    styles.tabText,
                    activeTab === index && styles.activeTabText,
                  ]}
                >
                  {tab.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.content}>
          <ActiveComponent />
        </View>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabBar: {
    backgroundColor: 'white',
    elevation: 5,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  activeTabItem: {
    borderBottomWidth: 2,
    borderBottomColor: 'tomato',
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: 'tomato',
  },
  content: {
    flex: 1,
  },
});

export default ReanimatedExamples;
