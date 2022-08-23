import React, { useEffect, useState } from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';


interface IPageProps {
  dotNumber?: number;
  step: number;
  inactiveDotColor?: string | undefined;
  activeDotColor?: string | undefined;
  style?: StyleProp<ViewStyle>;
}

const PaginationDots: React.FC<IPageProps> = ({ step, activeDotColor, inactiveDotColor, dotNumber, style }) => {
  const [length, setLength] = useState<number[]>([]);

  useEffect(() => {
    setLength([...Array(dotNumber).keys()].map(() => 0));
  }, [dotNumber]);

  const dots = length.map((_, i) => (
    <View key={i} style={i === step ? styles.activeDot : styles.inactiveDot} />
  ));

  return <View style={[styles.container, style]}>{dots}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  activeDot: {
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 50,
    marginHorizontal: 6,
  },
  inactiveDot: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 50,
    marginHorizontal: 6,
  },
});

export default PaginationDots;
