// Modal de edit e delete

import { produtoFormSchema } from "@/models/ProdutoSchema";
import { Box, Button, HStack, Input, Modal, Pressable, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useThemeColor } from "./Themed";
import Colors from "@/constants/Colors";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FontAwesome } from "@expo/vector-icons";

type ProdutoSchema = z.infer<typeof produtoFormSchema>

interface ModalEditProps {
    produto: ProdutoSchema;
    setShowModal: (isVisible: boolean) => void;
    showModal: boolean;
}

const ModalEdit = ({ produto, showModal, setShowModal }: ModalEditProps) => {
    // const [showModal, setShowModal] = useState<boolean>(true);

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm<ProdutoSchema>({
        resolver: zodResolver(produtoFormSchema)
    });

    const backgroundColor = useThemeColor({ light: Colors.light.backgroundModal, dark: Colors.dark.backgroundModal }, 'backgroundModal');
    const textColor = useThemeColor({ light: "#000", dark: "#fff" }, 'text');
    const textColorTheme = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

    const setValues = () => {
        setValue("id", produto.id);
        setValue("nome", produto.nome);
        setValue("preco", produto.preco);
        setValue("quantProduto", produto.quantProduto);
    }

    const handleOnSubmity = (data: ProdutoSchema) => {
        console.log(data);
    }

    useEffect(() => {
        if (produto) {
            setValues();
        }
    }, [produto]);

    return (
        <Box position="relative" flex={1} alignItems="center" justifyContent="center">
            <Modal
                isOpen={showModal} onClose={() => setShowModal(false)}
                position="absolute" left={0} right={0} top={0} bottom={0}
                backgroundColor="rgba(0, 0, 0, .5)"
            >
                <Modal.Content borderRadius={15} height="auto" width="98%" backgroundColor={backgroundColor}>
                    <Modal.CloseButton />
                    <Modal.Header backgroundColor={backgroundColor}><Text style={{ fontSize: 18 }}>Novo Produto</Text></Modal.Header>
                    <Modal.Body justifyContent="Box" padding={0}>

                        <form onSubmit={handleSubmit(handleOnSubmity)} >
                            <VStack
                                flex={1}
                                space={{ base: 2, sm: 4 }}
                                px={4}
                                py={4}
                            >
                                <Box alignItems="start" style={{ gap: 5 }} >
                                    <Text
                                        color={textColorTheme}
                                        style={{ marginLeft: 7 }}
                                    >
                                        Nome do Produto
                                    </Text>
                                    <Controller
                                        control={control}
                                        name="nome"
                                        render={({ field: { onChange, value = produto.nome } }) => (
                                            <Input
                                                placeholder={errors.nome ? errors.nome.message : ''}
                                                placeholderTextColor={errors.nome ? '#ff00006c ' : ''}
                                                aria-invalid={errors.nome ? "true" : "false"}
                                                width="100%"
                                                color={textColor}
                                                fontSize={{
                                                    base: 15,
                                                    sm: 25
                                                }}
                                                variant="rounded"
                                                onChangeText={onChange}
                                                value={value}
                                            />
                                        )}
                                    />
                                </Box>

                                <HStack flex={1} justifyContent="space-between" alignItems="center" style={{ gap: 5 }} >
                                    <HStack alignItems="center" space={1}>
                                        <Text
                                            color={textColorTheme}
                                            style={{ marginLeft: 7 }}
                                        >
                                            QUANTIDADE
                                        </Text>
                                        <Controller
                                            control={control}
                                            name="quantProduto"
                                            render={({ field: { onChange, value = "" } }) => (
                                                <Input
                                                    placeholder={errors.quantProduto ? errors.quantProduto.message : ''}
                                                    placeholderTextColor={errors.quantProduto ? '#ff00006c ' : ''}
                                                    aria-invalid={errors.quantProduto ? "true" : "false"}
                                                    keyboardType="number-pad"
                                                    w={75}
                                                    color={textColor}
                                                    fontSize={{
                                                        base: 15,
                                                        sm: 25
                                                    }}
                                                    variant="rounded"
                                                    onChangeText={(e) => onChange(parseInt(e) || 0)}
                                                    value={String(value)}
                                                />
                                            )}
                                        />
                                    </HStack>

                                    <HStack alignItems="center" space={1}>
                                        <Text
                                            color={textColorTheme}
                                            style={{ marginLeft: 7 }}
                                        >
                                            VALOR
                                        </Text>
                                        <Controller
                                            control={control}
                                            name="preco"
                                            render={({ field: { onChange, value = "" } }) => (
                                                <Input
                                                    placeholder={errors.preco ? errors.preco.message : ''}
                                                    placeholderTextColor={errors.preco ? '#ff00006c ' : ''}
                                                    aria-invalid={errors.preco ? "true" : "false"}
                                                    keyboardType="number-pad"
                                                    w={75}
                                                    color={textColor}
                                                    fontSize={{
                                                        base: 15,
                                                        sm: 25
                                                    }}
                                                    variant="rounded"
                                                    onChangeText={(e) => onChange(parseFloat(e) || 0)}
                                                    value={String(value)}
                                                />
                                            )}
                                        />
                                    </HStack>

                                    <Pressable
                                        flexDirection="row"
                                        alignItems="center"
                                        position="relative"
                                        onPress={() => alert("Deletar Item")}
                                    >
                                        <FontAwesome
                                            name="trash"
                                            size={30}
                                            color={textColorTheme}
                                        />
                                    </Pressable>
                                </HStack>
                                <input type="submit" value="Confirmar Produto" style={{ padding: 7 }} />
                            </VStack>
                        </form>


                    </Modal.Body>
                </Modal.Content>
            </Modal>
        </Box>
    );
}


export default ({ produto, showModal, setShowModal }: ModalEditProps) => {
    return (
        <Box flex={1} w="100%">
            <ModalEdit produto={produto} showModal={showModal} setShowModal={setShowModal} />
        </Box>
    );
};