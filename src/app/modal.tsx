import React, { useEffect, useState } from "react";
import { Modal, VStack, HStack, Text, Radio, Center, NativeBaseProvider, Pressable, FlatList } from "native-base";
import { getProdutos, setProdutos } from '@/constants/ItemsListTest';
import { carrinhoSchema } from "@/models/CarrinhoSchame";
import { produtoFormSchema } from "@/models/ProdutoSchema";
import { z } from "zod";
import ModalEdit from "@/components/ModalEdit";
import { openDatabase, useDatabase } from "@/db/db";

type CarrinhoSchema = z.infer<typeof carrinhoSchema>;
type ProdutoSchema = z.infer<typeof produtoFormSchema>;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  carrinho?: CarrinhoSchema[];
}

const ModalScreen: React.FC<ModalProps> = ({ isOpen, onClose, carrinho }) => {
  const database = openDatabase();
  const { selectAllProds } = useDatabase(database);

  const list: CarrinhoSchema[] = carrinho || getProdutos() as CarrinhoSchema[];
  const [prodList, setProdList] = useState<ProdutoSchema[]>([]);
  const [selectProd, setSelectProd] = useState<ProdutoSchema>();
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const resp = await selectAllProds();
        if (resp) setProdList(resp);
      } catch (error) {
        alert("Erro ao inicializar o banco de dados: " + error);
      }
    })();
  }, [showEditModal]);

  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <Modal.Content maxWidth="350">
          <Modal.CloseButton />
          <Modal.Header>Lista de items</Modal.Header>
          <Modal.Body>
            <VStack space={4}>
              {!carrinho ? (
                <HStack alignItems="center" justifyContent="space-between" space={3}>
                  <Text flex={4} textDecorationLine="underline" fontWeight="medium" numberOfLines={1} isTruncated>Nome</Text>
                  <Text flex={1} textDecorationLine="underline" fontWeight="medium">Qnt</Text>
                  <Text flex={1} textDecorationLine="underline" fontWeight="medium">Preço</Text>
                </HStack>
              ) :
                (
                  <HStack alignItems="center" justifyContent="space-between" space={3}>
                    <Text flex={4} textDecorationLine="underline" fontWeight="medium">Nome</Text>
                    <Text flex={1} textDecorationLine="underline" fontWeight="medium">Un</Text>
                    <Text flex={1} textDecorationLine="underline" fontWeight="medium">Qant</Text>
                    <Text flex={1} textDecorationLine="underline" fontWeight="medium">Total</Text>
                  </HStack>
                )}
              {!carrinho ? prodList.map((item) => (
                <Pressable
                  onLongPress={() => {
                    setSelectProd(item);
                    setShowEditModal(prevStatus => !prevStatus);
                  }}
                  key={item.id}
                >
                  <HStack alignItems="center" justifyContent="space-between">
                    <Text flex={4} fontWeight="medium" numberOfLines={1} isTruncated>{item.nome}</Text>
                    <Text flex={1} color="blueGray.400">{item.quantProduto}</Text>
                    <Text flex={1} color="green.500">{item.preco}</Text>
                  </HStack>
                </Pressable>
              ))
                :
                list.map((item) => (
                  <HStack key={item.nome} alignItems="center" justifyContent="space-between" space={3}>
                    <Text flex={4} color="blueGray.400">{item.nome}</Text>
                    <Text flex={1} color="green.500" textAlign="center">{item.preco}$</Text>
                    <Text flex={1} color="blueGray.400" textAlign="center">{item.quantVenda}</Text>
                    <Text flex={1} color="green.500" textAlign="center">{item.total.toFixed(2)}$</Text>
                  </HStack>
                ))
              }
            </VStack>
          </Modal.Body>
        </Modal.Content>
      </Modal>

      {selectProd && (
        <ModalEdit produto={selectProd} showModal={showEditModal} setShowModal={setShowEditModal} />
      )}
    </Center>
  );
};

const createModal: React.FC<ModalProps> = ({ isOpen, onClose, carrinho }) => {
  return (
    <NativeBaseProvider>
      <Center flex={1}>
        <ModalScreen isOpen={isOpen} onClose={onClose} carrinho={carrinho} />
      </Center>
    </NativeBaseProvider>
  );
};

export default createModal;