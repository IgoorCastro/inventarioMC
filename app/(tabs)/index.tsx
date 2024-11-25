import { StyleSheet } from 'react-native';
import { Center, Box, Image, NativeBaseProvider, VStack } from 'native-base';

import { Text, useThemeColor, View } from '@/components/Themed';
import VendaModal from '@/components/ModalVenda';
import ModalAddProduto from '@/components/ModalAddProduto';

import Colors from '@/constants/Colors';

export default function TabOneScreen() {
  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  return (
    <NativeBaseProvider>
      <VStack flex={1} padding={3} space={25} backgroundColor={backgroundColor}>
        <Box width="100%">
          <Text style={styles.title}>Comércio: MANGO</Text>
        </Box>
        <VStack borderRadius={5} flex={1} justifyContent="center" alignItems="center">
          <VendaModal />          
          <ModalAddProduto />
        </VStack>
      </VStack>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 15
  },
});
