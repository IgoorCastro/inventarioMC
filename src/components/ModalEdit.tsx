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
import { openDatabase, useDatabase } from "@/db/db";

type ProdutoSchema = z.infer<typeof produtoFormSchema>

interface ModalEditProps {
    produto: ProdutoSchema;
    setShowModal: (isVisible: boolean) => void;
    showModal: boolean;
}

const ModalEdit = ({ produto, showModal, setShowModal }: ModalEditProps) => {
    const database = openDatabase();
    const { updateProduto, toggleProdutoAtivo } = useDatabase(database);

    const [quant, setQuant] = useState<string>();
    const [val, setVal] = useState<string>();

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
        console.log(produto)
        setValue("id", String(produto.id));
        setValue("nome", produto.nome);
        setValue("preco", produto.preco);
        setVal(String(produto.preco));
        setQuant(String(produto.quantProduto));
        // setQuant(produto.quantProduto);
        setValue("quantProduto", produto.quantProduto);
    }

    const handleOnSubmit = async (data: ProdutoSchema) => {
        console.log(data);
        setValue("preco", data.preco);
        setQuant(String(data.quantProduto));

        try {
            const resp = await updateProduto(data);
            if (resp && resp.success) {
                alert("Produto inserido com sucesso!");
                setShowModal(false);
            }
        } catch (e) {
            console.error(e);
        }
    }

    const handleDeleteProd = async () => {
        console.log(produto);
        try {
            const resp = await toggleProdutoAtivo(produto.id, false);
            if (resp && resp.success) {
                alert("Produto desativado!");
                setShowModal(false);
            }
        } catch (e) {
            alert(e)
        }
    }

    const onChangeQnt = (e: string) => {
        const valorTratado = e.replace(',', '.');
        setQuant(valorTratado);
        setValue("quantProduto", parseInt(e));
    }

    const onChangeVal = (e: string) => {
        const valorTratado = e.replace(',', '.');
        setVal(valorTratado);
        setValue("preco", parseFloat(e));
    }

    useEffect(() => {
        if (produto) setValues();
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
                                    render={({ field: { onChange, onBlur, value = '' } }) => (
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
                                            onBlur={onBlur}
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
                                        render={({ field: { onBlur, value = "" } }) => (
                                            <Input
                                                aria-invalid={errors.quantProduto ? "true" : "false"}
                                                keyboardType="number-pad"
                                                w={75}
                                                color={textColor}
                                                fontSize={{
                                                    base: 15,
                                                    sm: 25
                                                }}
                                                variant="rounded"
                                                onBlur={onBlur}
                                                onChangeText={(e) => onChangeQnt(e)}
                                                value={quant}
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
                                        render={({ field: { onBlur } }) => (
                                            <Input
                                                aria-invalid={errors.preco ? "true" : "false"}
                                                keyboardType="number-pad"
                                                w={75}
                                                color={textColor}
                                                fontSize={{
                                                    base: 15,
                                                    sm: 25
                                                }}
                                                variant="rounded"
                                                onBlur={onBlur}
                                                onChangeText={(e) => onChangeVal(e)}
                                                value={String(val)}
                                            />
                                        )}
                                    />
                                </HStack>

                                <Pressable
                                    flexDirection="row"
                                    alignItems="center"
                                    position="relative"
                                    onPress={() => handleDeleteProd()}
                                >
                                    <FontAwesome
                                        name="trash"
                                        size={30}
                                        color={textColorTheme}
                                    />
                                </Pressable>
                            </HStack>
                            {errors && (
                                <HStack flex={1} overflow="hidden">
                                    {errors.id && (
                                        <Text color="red.500">Id: Erro no ID</Text>
                                    )}
                                    {errors.nome && (
                                        <Text color="red.500">Nome: Digite um nome</Text>
                                    )}
                                    {errors.preco && (
                                        <Text color="red.500">Preço: Digite um valor</Text>
                                    )}
                                    {errors.quantProduto && (
                                        <Text color="red.500">Quantidade: Digite a quantidade</Text>
                                    )}
                                </HStack>
                            )}
                            <Button onPress={handleSubmit(handleOnSubmit)} style={{ padding: 7 }}>
                                Confirmar Produto
                            </Button>
                        </VStack>
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