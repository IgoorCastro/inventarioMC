import React from 'react';
import { FlatList } from 'react-native';
import { Box, Text, HStack, VStack, Divider } from 'native-base';
import { getVendHistorico } from '@/constants/VendaHistorico';

const vendas = getVendHistorico();

const HistoricoVendasScreen = () => {
  return (
    <Box flex={1} p={4}>
      <FlatList
        data={vendas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Box mb={4} p={4} borderWidth={1} borderRadius={8}>

            <Text fontWeight="bold" mb={2}>Venda ID: {item.id}</Text>

            <VStack space={2}>
              {item.carrinho.map((produto, index) => (
                <HStack key={index} justifyContent="space-between">
                  <Text flex={2}>{produto.nome}</Text>
                  <Text flex={1}>Qant: {produto.quantVenda}</Text>
                  <Text flex={2} textAlign="right">Total: R${produto.total.toFixed(2)}</Text>
                </HStack>
              ))}
            </VStack>

            <Divider my="2" _light={{
              bg: "muted.800"
            }} _dark={{
              bg: "muted.50"
            }} />

            <VStack alignItems="end" space={1}>
              <Text>Total da Venda: R${item.totalVenda.toFixed(2)}</Text>
              <Text>Valor Pago: R${item.valorPago.toFixed(2)}</Text>
              <Text>Troco: R${item.troco.toFixed(2)}</Text>
            </VStack>

          </Box>
        )}
      />
    </Box>
  );
};

export default HistoricoVendasScreen;
