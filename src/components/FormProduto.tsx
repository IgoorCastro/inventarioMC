
import { Box, HStack, Input, VStack, Text, FlatList, Button } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useThemeColor } from "./Themed";
import Colors from "@/constants/Colors";
import { produtoFormSchema } from "@/models/ProdutoSchema";
import { getProdutos } from "@/constants/ItemsListTest";
import React, { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, TextInputKeyPressEventData } from "react-native";
import { openDatabase, useDatabase } from "@/db/db";

type ProdutoFormSchema = z.infer<typeof produtoFormSchema>;

interface FormProdutoProps {
    onSubmit: (data: ProdutoFormSchema) => void;
    isModalOpen: boolean;
    quantVendaProp: (data: number) => void;
    quantVenda: number;
}

export default function ({ onSubmit, isModalOpen, quantVendaProp, quantVenda }: FormProdutoProps) {

    const database = openDatabase();
    const { selectAllProds } = useDatabase(database);

    const [prodList, setProdList] = useState<ProdutoFormSchema[]>();
    const [filteredSuggestions, setFilteredSuggestions] = useState<ProdutoFormSchema[]>([]); // array filtro de sujestões
    const [showSuggestions, setShowSuggestions] = useState(false); // controlador de visibilidade
    const [valorProduto, setValorProduto] = useState<number>(0); // Value do código
    const [valorCompra, setValorCompra] = useState<number>(0); // Total -> ( valor produto * quantidade )

    const {
        formState: { errors },
        handleSubmit,
        control,
        setValue,
        reset,
        setError
    } = useForm<ProdutoFormSchema>({
        resolver: zodResolver(produtoFormSchema),
    })

    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputProdRef = useRef<HTMLInputElement>(null);
    const inputQantRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement | null>(null);

    const textColor = useThemeColor({ light: "#000", dark: "#fff" }, 'text');
    const textColorTheme = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

    const setInputs = (data: ProdutoFormSchema) => {
        setValue("id", String(data.id));
        setValue("nome", data.nome);
        setValue("preco", data.preco);
        setValorCompra(data.preco);
        if (inputQantRef.current) inputQantRef.current.value = "1";
        quantVendaProp(1);
        setValue("quantProduto", data.quantProduto);
        setValorProduto(data.preco);
    }

    const resetInputs = () => {
        reset();
        setValorCompra(0);
        setSelectedIndex(0);
        inputProdRef.current?.focus();
        if (inputQantRef.current) inputQantRef.current.value = "1";
    }

    const handleInputProdChange = (value: string, onChange: (value: string) => void) => {
        onChange(value);
        if (prodList) {
            const filtered = prodList.filter((produto) => produto.nome.toLowerCase().includes(value.toLowerCase()));
            if (value.length > 0 && filtered.length > 0) {
                setShowSuggestions(true);
                setFilteredSuggestions(filtered);
            } else
                setShowSuggestions(false);
        }
    };

    const handleInputIdChange = (value: string, onChange: (value: string) => void) => {
        onChange(value);
        setShowSuggestions(false);
    };

    const handleSuggestionClick = (suggestion: ProdutoFormSchema) => {
        resetInputs();
        // alert(JSON.stringify(suggestion));
        const filtered = procurarProdutoByNome(suggestion.nome);
        if (filtered && filtered.quantProduto > 0) {
            setInputs(suggestion);
        } else {
            setError("nome", {
                type: "manual",
                message: "Produto esgotado",
            });
        }
        setShowSuggestions(false);
    };

    const handlePressKey = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
        switch (e.nativeEvent.key) {
            case "ArrowDown":
                setSelectedIndex((prevIndex) => prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0);
                setValue("nome", filteredSuggestions[selectedIndex + 1].nome);
                break;
            case "ArrowUp":
                setSelectedIndex((prevIndex) => prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1);
                setValue("nome", filteredSuggestions[selectedIndex].nome);
                break;
            case "Enter":
                e.preventDefault();
                handleSuggestionClick(filteredSuggestions[selectedIndex]);
                inputQantRef.current?.focus();
                break;
            case "Tab":
                listRef.current?.focus();
                break;
        }
    }

    const handleOnSubmit = (data: ProdutoFormSchema) => {
        resetInputs();
        onSubmit(data);
    }

    // Quem sabe um dia
    const procurarProdutoById = (id: string) => {
        return prodList?.find((item) => item.id.toLowerCase() === id.toLowerCase());
    };

    const procurarProdutoByNome = (nome: string) => {
        return prodList?.find((item) => item.nome.toLowerCase().includes(nome.toLowerCase()));
    };

    const onChangeQnt = (value: number) => {
        let nValue = value > 0 ? value : 0;
        quantVendaProp(nValue);
        if (valorProduto && nValue > 1) {
            let total = parseFloat((valorProduto * nValue).toFixed(2));
            setValorCompra(total);
        } else
            setValorCompra(valorProduto);

    }

    // Carregar lista de items no estado
    useEffect(() => {
        (async () => {
            try {
                const resp = await selectAllProds();
                if (resp) setProdList(resp);
            } catch (error) {
                alert("Erro ao inicializar o banco de dados: " + error);
            }
        })();
    }, []);

    // Limpa o formulário quando a modal fecha
    useEffect(() => {
        if (!isModalOpen) resetInputs();
    }, [isModalOpen]);


    //TEST LOG ---------------------------------------------
    // useEffect(() => {
    //     console.log("quantVenda: ", quantVenda);
    // }, [quantVenda])

    return (
        <VStack
            flex={1}
            space={{ base: 2, sm: 4 }}
            px={4}
            pt={4}
        >
            <Box alignItems="start" style={{ gap: 5 }} >
                <Text
                    color={textColorTheme}
                    style={{ marginLeft: 7 }}
                >
                    Código do produto
                </Text>
                <Controller
                    control={control}
                    name="id"
                    render={({ field: { value = "" } }) => (
                        <Input
                            placeholder={errors.id ? errors.id.message : ''}
                            placeholderTextColor={errors.id ? '#ff00006c ' : ''}
                            aria-invalid={errors.id ? "true" : "false"}
                            width="100%"
                            color={textColor}
                            fontSize={{
                                base: 15,
                                sm: 25
                            }}
                            variant="rounded"
                            onKeyPress={(e) => handlePressKey(e)}
                            value={value}
                            isDisabled
                        />
                    )}
                />
            </Box>

            <Box alignItems="start" flex={1} style={{ gap: 5 }} zIndex={999}>
                <Text
                    color={textColorTheme}
                    style={{ marginLeft: 7 }}
                >Nome do produto</Text>

                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, value = "" } }) => (
                        <Box w="100%">
                            <Input
                                placeholder={errors.nome && errors.nome.message ? errors.nome.message : ''}
                                placeholderTextColor={errors.nome ? '#ff00006c ' : ''}
                                aria-invalid={errors.nome ? "true" : "false"}
                                width="100%"
                                color={textColor}
                                fontSize={{
                                    base: 15,
                                    sm: 25
                                }}
                                ref={inputProdRef}
                                onChangeText={(text) => handleInputProdChange(text, onChange)}
                                onKeyPress={(e) => handlePressKey(e)}
                                value={value}
                                variant="rounded"
                            />
                            {showSuggestions && (
                                <FlatList
                                    ref={listRef}
                                    data={filteredSuggestions}
                                    keyExtractor={(item) => item.id}
                                    renderItem={({ item, index }) => (
                                        <Text
                                            key={index}
                                            padding={2}
                                            bg={index === selectedIndex ? "lightgray" : "white"}
                                            onPress={() => handleSuggestionClick(item)}
                                        >
                                            {item.nome}
                                        </Text>
                                    )}
                                    maxHeight={150}
                                    style={{ marginTop: 5, borderWidth: 1, borderColor: "#ccc" }}                                    
                                    keyboardShouldPersistTaps="handled"
                                    nestedScrollEnabled={true}
                                />
                            )}
                        </Box>
                    )}
                />
            </Box>

            <HStack flex={1} justifyContent="end" alignItems="center" space={2}>
                <Text
                    color={textColorTheme}
                    style={{ marginLeft: 7 }}
                    numberOfLines={1}
                    fontSize={12}
                >
                    QUANTIDADE:
                </Text>
                <Box>
                    <Input
                        ref={inputQantRef}
                        color={textColor}
                        w={75}
                        fontSize={{
                            base: 10,
                            sm: 15
                        }}
                        keyboardType="number-pad"
                        onChangeText={(text) => onChangeQnt(parseInt(text))}
                        onKeyPress={(e) => {
                            if (e.nativeEvent.key === "Enter") {
                                e.preventDefault();
                                buttonRef.current?.click();
                                resetInputs();
                            }
                        }}
                        variant="rounded"
                        value={String(quantVenda)}
                    />
                </Box>
                <Text
                    color={textColorTheme}
                    style={{ marginLeft: 7 }}
                    numberOfLines={1}
                    fontSize={12}
                >
                    VALOR:
                </Text>
                <Box borderWidth={1} borderRadius={15} paddingX={7} paddingY={2} borderColor="rgb(212, 212, 212)">
                    <Text color={textColorTheme}>R$ {valorCompra}</Text>
                </Box>
            </HStack>
            {/* {errors && (
                <HStack>
                    <Text>ID:{errors.id?.message}</Text>
                    <Text>nome:{errors.nome?.message}</Text>
                    <Text>prec:{errors.preco?.message}</Text>
                    <Text>qant:{errors.quantProduto?.message}</Text>
                </HStack>
            )} */}
            <Button
                ref={buttonRef}
                onPress={handleSubmit(handleOnSubmit)}
                style={{ padding: 7 }}
            >
                Confirmar Produto
            </Button>
        </VStack>
    )
}