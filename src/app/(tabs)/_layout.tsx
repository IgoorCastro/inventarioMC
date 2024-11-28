import React, { useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import CreateModal from '../modal';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [showModal, setShowModal] = useState(false);

  return (
    <View style={{ flex: 1, position: 'relative' }}>  {/* Aplica o position: 'relative' ao contêiner */}
      <View style={{ position: 'relative', zIndex: 10, flex: 1 }}>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
            headerShown: useClientOnlyValue(false, true),
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: 'Bem vindo',
              tabBarIcon: ({ color }) => <FontAwesome name="code" size={28} color={color} />,
              headerRight: () => (
                <Pressable
                  onPress={() => setShowModal((prevStatus) => !prevStatus)}>
                  {({ pressed }) => (
                    <FontAwesome
                      name="list"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              ),
            }}
          />
          <Tabs.Screen
            name="historico"
            options={{
              title: 'Histórico',
              tabBarIcon: ({ color }) => <FontAwesome name="code" size={28} color={color} />,
            }}
          />
        </Tabs>
      </View>

      {showModal && (
        <View style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0, zIndex: 11 }}>
          <CreateModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </View>
      )}
    </View>
  );
}
