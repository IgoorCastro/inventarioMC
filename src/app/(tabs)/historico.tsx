import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Box, Text, HStack, VStack, Divider } from 'native-base';
import { getVendHistorico } from '@/constants/VendaHistorico';
import { openDatabase, useDatabase } from '@/db/db';
import { z } from 'zod';
import { vendaFormSchema } from '@/models/VendaSchema';

const vendas = getVendHistorico();

type VendaSchema = z.infer<typeof vendaFormSchema>;

const HistoricoVendasScreen = () => {
  const database = openDatabase();
  const { selectHistoricoVenda } = useDatabase(database);

  const [venda, setVendas] = useState<VendaSchema[]>();

  useEffect(() => {
    (async () => {
        try {
          const resp = await selectHistoricoVenda();
          // console.log(JSON.stringify(resp));
          if (resp) setVendas(resp);
        } catch (error) {
          alert("Erro ao inicializar o banco de dados: " + error);
        }
    })();
  }, [venda]);

  return (
    <Box flex={1} p={4}>
      <FlatList
        data={venda}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Box mb={4} p={4} borderWidth={1} borderRadius={8}>

            <Text fontWeight="bold" mb={2}>Venda ID: {item.id}</Text>

            <VStack space={2}>
              {item.carrinho?.map((produto, index) => (
                <HStack key={index} justifyContent="space-between">
                  <Text flex={2}>{produto.nome}</Text>
                  <Text flex={1}>Qant: {produto.quantVenda}</Text>
                  <Text flex={2} textAlign="right">Preco: R${produto.preco.toFixed(2)}</Text>
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
