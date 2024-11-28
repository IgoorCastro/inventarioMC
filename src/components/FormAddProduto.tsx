import { produtoFormSchema } from "@/models/ProdutoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, HStack, Input, Text, VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useThemeColor } from "./Themed";
import Colors from "@/constants/Colors";
import { useEffect, useState } from "react";

type ProdutoSchema = z.infer<typeof produtoFormSchema>;

interface FormAddProdutoProps {
    handleOnSubmityProps: (prod: ProdutoSchema) => void;
}

const FormAddProduto = ({ handleOnSubmityProps }: FormAddProdutoProps) => {
    const [val, setVal] = useState<string>('0');
    const [quant, setQuant] = useState<string>('0');

    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors },
        reset,
    } = useForm<ProdutoSchema>({
        resolver: zodResolver(produtoFormSchema)
    });

    const onChangeVal = (value: string) => {
        const valorTratado = value.replace(',', '.'); 
        setVal(valorTratado); 
        setValue("preco", parseFloat(value)); // mudar só para quando ter certeza, talvez??
    }

    const onChangeQuant = (value: string) => {
        const valorTratado = value.replace(',', '.'); 
        setQuant(value);
        setValue("quantProduto", parseInt(value));
    }

    const onClickSubmit = (prod: ProdutoSchema) => {
        const produtoComPrecoFloat = {
            ...prod,
            preco: prod.preco || 0, // Conversão final
        };
        handleOnSubmityProps(prod);
        // reset
        reset();
        setQuant('0');
        setVal('0');
        setValue("id", "0");
    }
    
    useEffect(() => { // Mentenha para teste
        setValue("id", "0");
    }, [])

    const textColor = useThemeColor({ light: "#000", dark: "#fff" }, 'text');
    const textColorTheme = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

    return (
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
                    render={({ field: { onChange, onBlur, value = "" } }) => (
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
                                onChangeText={(e) => onChangeQuant(e)}
                                value={String(quant)}
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
                                onChangeText={(e) => onChangeVal(e)}
                                value={String(val)}
                            />
                        )}
                    />
                </HStack>
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
            <Button onPress={handleSubmit(onClickSubmit)}>
                Confirmar Produto
            </Button>
        </VStack>
    );
}

export default FormAddProduto;