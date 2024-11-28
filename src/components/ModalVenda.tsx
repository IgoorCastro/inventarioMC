import React from "react";
import { Button, Modal, FormControl, Input, Box, NativeBaseProvider } from "native-base";
import { useState } from "react";
import VendaProdutosForm from "./VendaProdutoForm";
import { Text, useThemeColor, View } from "./Themed";
import Colors from '../constants/Colors';
import { useColorScheme } from "react-native";

const Example = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const theme = useColorScheme();
    const backgroundColor = useThemeColor({ light: Colors.light.backgroundModal, dark: Colors.dark.backgroundModal }, 'backgroundModal');
    // console.log(theme);
    return (
        <Box position="relative" flex={1} alignItems="center" justifyContent="center">
            <Button onPress={() => setShowModal(true)} p={5} w={100}>Venda</Button>
            <Modal
                isOpen={showModal} onClose={() => setShowModal(false)}
                position="absolute" left={0} right={0} top={0} bottom={0}
                backgroundColor="rgba(0, 0, 0, .5)"
            >
                <Modal.Content borderRadius={15} height="auto" width="98%" backgroundColor={backgroundColor}>
                    <Modal.CloseButton />
                    <Modal.Header backgroundColor={backgroundColor}><Text style={{ fontSize: 18 }}>Nova Venda</Text></Modal.Header>
                    <Modal.Body justifyContent="Box" padding={0}>
                        <VendaProdutosForm isModalOpen={showModal} setShowModal={setShowModal} />
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
