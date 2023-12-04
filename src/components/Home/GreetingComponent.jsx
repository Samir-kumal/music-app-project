import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GreetingComponent = () => {
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const getCurrentTime = () => {
      const currentHour = new Date().getHours();

      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting('Good Afternoon!');
      } else {
        setGreeting('Good Evening!');
      }
    };

    getCurrentTime();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>{greeting}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'start',
    paddingHorizontal:20
  },
  greetingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default GreetingComponent;
