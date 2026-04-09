import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import styles from './Skeleton.styles';

const Skeleton = ({ height = 16, width = '100%', borderRadius = 8, style }) => {
  const shimmer = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: false,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [shimmer]);

  const backgroundColor = shimmer.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#E9EEF8', '#F5F8FD', '#E9EEF8'],
  });

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          height,
          width,
          borderRadius,
          backgroundColor,
        },
        style,
      ]}
    />
  );
};

export const SkeletonCard = () => (
  <View style={styles.card}>
    <View style={styles.row}>
      <Skeleton width={48} height={48} borderRadius={24} />
      <View style={styles.col}>
        <Skeleton width="70%" height={14} />
        <Skeleton width="45%" height={12} style={styles.gapSm} />
      </View>
    </View>
    <Skeleton width="100%" height={12} style={styles.gapMd} />
    <Skeleton width="85%" height={12} style={styles.gapSm} />
  </View>
);

export default Skeleton;
