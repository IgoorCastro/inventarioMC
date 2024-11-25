import React from "react";
import { Button, Modal, FormControl, Input, Box, NativeBaseProvider } from "native-base";
import { useState } from "react";
import VendaProdutosForm from "./VendaProdutoForm";
import FormAddProduto from "./FormAddProduto";
import { Text, useThemeColor, View } from "./Themed";
import Colors from '../constants/Colors';
import { useColorScheme } from "react-native";
import { produtoFormSchema } from '@/models/ProdutoSchema';
import { z } from "zod";
import { setProdutos } from "@/constants/ItemsListTest";

type ProdutoSchema = z.infer<typeof produtoFormSchema>;

const Example = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const theme = useColorScheme();
    const backgroundColor = useThemeColor({ light: Colors.light.backgroundModal, dark: Colors.dark.backgroundModal }, 'backgroundModal');
    // console.log(theme);

    const handleAddNewProd = (prod: ProdutoSchema) => {
        console.log("\n\nTESTE\n>(ModalAddProduto) handleAddNewProd: ", prod, "----------------------\n");
        setProdutos(prod);
    }
    return (
        <Box position="relative" flex={1} alignItems="center" justifyContent="center">
            <Button onPress={() => setShowModal(true)} p={5} w={100}>Novo Produto</Button>
            <Modal
                isOpen={showModal} onClose={() => setShowModal(false)}
                position="absolute" left={0} right={0} top={0} bottom={0}
                backgroundColor="rgba(0, 0, 0, .5)"
            >
                <Modal.Content borderRadius={15} height="auto" width="98%" backgroundColor={backgroundColor}>
                    <Modal.CloseButton />
                    <Modal.Header backgroundColor={backgroundColor}><Text style={{ fontSize: 18 }}>Novo Produto</Text></Modal.Header>
                    <Modal.Body justifyContent="Box" padding={0}>
                        <FormAddProduto handleOnSubmity={handleAddNewProd} />
                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    );
};

export default () => {
    const backgroundColor = useThemeColor({ light: Colors.light.backgroundModal, dark: Colors.dark.backgroundModal }, 'backgroundModal');
    return (
        <Box flex={1} w="100%">
            <Example />
        </Box>
    );
};
