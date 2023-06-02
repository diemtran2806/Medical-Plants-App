import React, {useRef} from 'react';
import {
  Animated,
  PanResponder,
  Platform,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {WINDOW_HEIGHT} from '../../utils';

const BOTTOM_SHEET_MAX_HEIGHT = WINDOW_HEIGHT * 0.8;
const BOTTOM_SHEET_MIN_HEIGHT = WINDOW_HEIGHT * 0.15;

const MAX_UPWARD_TRANSLATE_Y =
  BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT; // negative number;
const MAX_DOWNWARD_TRANSLATE_Y = 0;
const DRAG_THRESHOLD = 50;

const DraggbleBottomSheet = ({namePlant, description}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        // animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;
        if (lastGestureDy.current < MAX_UPWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_UPWARD_TRANSLATE_Y;
        } else if (lastGestureDy.current > MAX_DOWNWARD_TRANSLATE_Y) {
          lastGestureDy.current = MAX_DOWNWARD_TRANSLATE_Y;
        }

        // if (gesture.dy > 0) {
        //   // dragging down
        //   if (gesture.dy <= DRAG_THRESHOLD) {
        //     springAnimation('up');
        //   } else {
        //     springAnimation('down');
        //   }
        // } else {
        //   // dragging up
        //   if (gesture.dy >= -DRAG_THRESHOLD) {
        //     springAnimation('down');
        //   } else {
        //     springAnimation('up');
        //   }
        // }
      },
    }),
  ).current;

  //   const springAnimation = (direction: 'up' | 'down') => {
  //     console.log('direction', direction);
  //     lastGestureDy.current =
  //       direction === 'down' ? MAX_DOWNWARD_TRANSLATE_Y : MAX_UPWARD_TRANSLATE_Y;
  //     Animated.spring(animatedValue, {
  //       toValue: lastGestureDy.current,
  //       useNativeDriver: true,
  //     }).start();
  //   };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          outputRange: [MAX_UPWARD_TRANSLATE_Y, MAX_DOWNWARD_TRANSLATE_Y],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.bottomSheet, bottomSheetAnimation]}>
        <View style={styles.lineArea} {...panResponder.panHandlers}>
          <View style={styles.line} />
        </View>
        <View style={styles.result}>
          <Text style={styles.name}>{namePlant}</Text>
          <Text style={styles.text}>Description:</Text>
          <View style={styles.wrapDesc}>
            <Text style={styles.description}>{description}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default DraggbleBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    position: 'absolute',
    width: '100%',
    height: BOTTOM_SHEET_MAX_HEIGHT,
    bottom: BOTTOM_SHEET_MIN_HEIGHT - BOTTOM_SHEET_MAX_HEIGHT,
    ...Platform.select({
      android: {elevation: 3},
      // ios: {
      //   shadowColor: '#a8bed2',
      //   shadowOpacity: 1,
      //   shadowRadius: 6,
      //   shadowOffset: {
      //     width: 2,
      //     height: 2,
      //   },
      // },
    }),
    backgroundColor: '#639C92',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  lineArea: {
    width: 132,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 100,
    height: 6,
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
  },
  result: {
    flex: 1,
    alignItems: 'center',
  },
  name: {
    fontSize: 30,
    color: 'white',
    fontWeight: 700,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
    color: 'white',
    fontWeight: 500,
    marginBottom: 20,
    marginLeft: 20,
  },
  wrapDesc: {
    marginLeft: 20,
    marginRight: 20,
  },
  description: {
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
});
