import React from "react";
import { Button, Modal, Box } from "native-base";
import { useState } from "react";
import FormAddProduto from "./FormAddProduto";
import { Text, useThemeColor, View } from "./Themed";
import Colors from '../constants/Colors';
import { useColorScheme } from "react-native";
import { produtoFormSchema } from '@/models/ProdutoSchema';
import { z } from "zod";
import { openDatabase, useDatabase } from "@/db/db";

type ProdutoSchema = z.infer<typeof produtoFormSchema>;

const Example = () => {
    const database = openDatabase();
    const { insertProduto } = useDatabase(database);

    const [showModal, setShowModal] = useState<boolean>(false);
    const theme = useColorScheme();

    const backgroundColor = useThemeColor({ light: Colors.light.backgroundModal, dark: Colors.dark.backgroundModal }, 'backgroundModal');
    const textColorTheme = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');
    // console.log(theme);

    const handleAddNewProd = async (prod: ProdutoSchema) => {
        try{
            const resp = await insertProduto(prod);
            if (resp && resp.success) {
                alert("Produto inserido com sucesso!"); // Exibe mensagem de sucesso
            }
        }catch(e){
            console.error(e);
        }
    }
    return (
        <Box position="relative" flex={1} alignItems="center" justifyContent="center">
            <Button onPress={() => setShowModal(true)} p={5} color={textColorTheme}>Novo Produto</Button>
            <Modal
                isOpen={showModal} onClose={() => setShowModal(false)}
                position="absolute" left={0} right={0} top={0} bottom={0}
                backgroundColor="rgba(0, 0, 0, .5)"
            >
                <Modal.Content borderRadius={15} height="auto" width="98%" backgroundColor={backgroundColor}>
                    <Modal.CloseButton />
                    <Modal.Header backgroundColor={backgroundColor}><Text style={{ fontSize: 18 }}>Novo Produto</Text></Modal.Header>
                    <Modal.Body justifyContent="Box" padding={0}>
                        <FormAddProduto handleOnSubmityProps={handleAddNewProd} />
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
