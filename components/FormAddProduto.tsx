import { produtoFormSchema } from "@/models/ProdutoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, HStack, Input, Text, VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useThemeColor } from "./Themed";
import Colors from "@/constants/Colors";
import { useEffect } from "react";

type ProdutoSchema = z.infer<typeof produtoFormSchema>;

interface FormAddProdutoProps {
    handleOnSubmity: (prod: ProdutoSchema) => void;
}

const FormAddProduto = ({ handleOnSubmity }: FormAddProdutoProps) => {
    const {
        handleSubmit,
        control,
        setValue,
        formState: { errors }
    } = useForm<ProdutoSchema>({
        resolver: zodResolver(produtoFormSchema)
    });
    useEffect(() => { // Mentenha para teste
        setValue("id", "0");
    }, [])



    const textColor = useThemeColor({ light: "#000", dark: "#fff" }, 'text');
    const textColorTheme = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

    return (
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
                </HStack>
                <input type="submit" value="Confirmar Produto" style={{ padding: 7 }} />
            </VStack>
        </form>
    );
}

export default FormAddProduto;