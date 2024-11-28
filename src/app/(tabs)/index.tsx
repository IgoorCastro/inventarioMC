import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { useThemeColor, View } from '@/components/Themed';
import { db, openDatabase } from '@/db/db'
import { useEffect } from 'react';
import { Box, NativeBaseProvider, Text, VStack } from 'native-base';
import VendaModal from '@/components/ModalVenda';
import ModalAddProduto from '@/components/ModalAddProduto';
import Colors from '@/constants/Colors';


export default function TabOneScreen() {
  const database = openDatabase();

  // start do db na pagina inicial
  useEffect(() => {
    (async () => {
      try {
        console.log('ajskldjas')
        await db(database); // Cria as tabelas, se ainda não existirem
        // alert("Banco de dados inicializado!");
      } catch (error) {
        alert("Erro ao inicializar o banco de dados: " + error);
      }
    })();
  }, []);

  const backgroundColor = useThemeColor({ light: Colors.light.background, dark: Colors.dark.background }, 'background');
  const textColorTheme = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

  return (
    <NativeBaseProvider>
      <VStack flex={1} padding={3} space={25} backgroundColor={backgroundColor}>
        <Box width="100%">
          <Text fontSize={15} fontWeight="bold" color={textColorTheme} >Comércio: MANGO</Text>
        </Box>
        <VStack borderRadius={5} flex={1} justifyContent="center" alignItems="center">
          <VendaModal />          
          <ModalAddProduto />
        </VStack>
      </VStack>
    </NativeBaseProvider>
  );
}
