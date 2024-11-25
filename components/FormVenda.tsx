import { Box, HStack, Icon, Input, VStack, Text, Pressable } from "native-base";
import { Controller, useForm } from "react-hook-form";
import { number, z } from "zod";

import { vendaFormSchema } from "@/models/VendaSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useThemeColor } from "./Themed";
import Colors from "@/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { carrinhoSchema } from "@/models/CarrinhoSchame";
import { useEffect, useState } from "react";
import ModalList from '@/app/modal';

type VendaFormSchema = z.infer<typeof vendaFormSchema>;
type CarrinhoSchema = z.infer<typeof carrinhoSchema>;

interface VendaFormProps {
    onSubmit: (data: VendaFormSchema) => void;
    total: number;
    carrinhoList: CarrinhoSchema[];
    isModalOpen: boolean;
    setShowModal: (value: boolean) => void;
}

export default function ({ onSubmit, total, carrinhoList, isModalOpen, setShowModal }: VendaFormProps) {
    const {
        register: registerVenda,
        formState: { errors: errorsVenda },
        handleSubmit,
        control,
        setValue,
        reset
    } = useForm<VendaFormSchema>({
        resolver: zodResolver(vendaFormSchema),
    })

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const textColor = useThemeColor({ light: "#000", dark: "#fff" }, 'text');
    const textColorTheme = useThemeColor({ light: Colors.light.text, dark: Colors.dark.text }, 'text');

    const [troco, setTroco] = useState<number>(0);

    const resetValues = () => {
        reset();
        setTroco(0);
    }

    const calcularTroco = (valCompra: number, valPago: number) => {
        return valCompra - valPago; 
    }

    const handleChangeValPago = (value: string, onChange: (e: number) => void) => {
        if (value.length >= 1) {
            let trocoTotal = calcularTroco(parseInt(value), total);
            onChange(parseInt(value));
            setTroco(trocoTotal);
            setValue("troco", trocoTotal);
        }else
            onChange(0);
    }

    const handleOnSubmit = (data: VendaFormSchema) => {
        if(data.totalVenda < data.valorPago){
            onSubmit(data);
            setShowModal(false);
            alert("Venda concluida\n\n" + JSON.stringify(data, null, 2));
            resetValues();
        }else{
            alert("Valor pago não é o suficiente!");
        }
    }

    useEffect(() => {
        if(carrinhoList){
            setValue("carrinho", carrinhoList);
            setValue("totalVenda", total);
            setValue("id", 1)
        }
    }, [carrinhoList]);

    useEffect(() => {
        if(!isModalOpen)
            resetValues();
    }, [isModalOpen]);

    return (
        <form
            onSubmit={handleSubmit(handleOnSubmit)}
            style={{ width: "100%" }}
        >
            <VStack
                flex={1}
                justifyContent="end"
                alignItems="end"
                space={{ base: 2, sm: 4 }}
                px={4}
                pb={4}
            >
                <HStack>
                    <Pressable
                        flexDirection="row"
                        alignItems="center"
                        position="relative"
                        onPress={() => setIsModalVisible(prevStatus => !prevStatus)}
                    >
                        <Text color={textColorTheme}>
                            Carrinho
                        </Text>
                        <FontAwesome
                            name="shopping-cart"
                            size={30}
                            color={textColorTheme}
                        />
                        {carrinhoList.length > 0 && (
                            <Box position="absolute" top={-5} right={-5} w={5} h={5} borderRadius="full" bg="red.500" justifyContent="center" alignItems="center">
                                <Text color="white">{carrinhoList.length}</Text>
                            </Box>
                        )}
                    </Pressable>

                </HStack>
                <HStack flex={1} justifyContent="end" alignItems="center" space={2}>
                    <Text
                        color={textColorTheme}
                        style={{ marginLeft: 7 }}
                    >
                        TOTAL:
                    </Text>
                    <Box borderWidth={1} borderRadius={15} paddingX={7} paddingY={2} borderColor="rgb(212, 212, 212)">
                        <Text color={textColorTheme}>R$ {total}</Text>
                    </Box>
                </HStack>
                <HStack flex={1} justifyContent="end" alignItems="center" space={2}>
                    <Text
                        color={textColorTheme}
                        style={{ marginLeft: 7 }}
                    >
                        VALOR PAGO:
                    </Text>
                    <Controller
                        control={control}
                        name="valorPago"
                        render={({ field: { onChange, onBlur, value = "" }}) => (
                            <Input
                                keyboardType="numeric"
                                placeholder={errorsVenda.valorPago ? errorsVenda.valorPago.message : ''}
                                placeholderTextColor={errorsVenda.valorPago ? '#ff00006c ' : ''}
                                aria-invalidvalorPago={errorsVenda.valorPago ? "true" : "false"}
                                color={textColor}
                                fontSize={{
                                    base: 10,
                                    sm: 20
                                }}
                                width="30%"
                                textAlign="center"
                                variant="rounded"
                                onChangeText={(e) => handleChangeValPago(e, onChange)}
                                value={String(value)}
                            />
                        )}
                    />
                </HStack>
                <HStack width="100%" justifyContent={troco ? "space-between" : "end"}>
                    <HStack justifyContent="end" alignItems="center" space={2}>
                        <Text
                            color={textColorTheme}
                            style={{ marginLeft: 7 }}
                        >
                            TROCO:
                        </Text>
                        <Box borderWidth={1} borderRadius={15} paddingX={7} paddingY={2} borderColor="rgb(212, 212, 212)">
                            <Text color={textColorTheme}>R$ {troco.toFixed(2)}</Text>
                        </Box>
                    </HStack>
                    <input type="submit" value="Finalizar Venda" style={{ padding: 8 }} />
                </HStack>
                {isModalVisible && (
                    <Box position="absolute" top={-300} bottom={0} right={0} left={0} flex={1}>
                        <ModalList isOpen={isModalVisible} onClose={() => setIsModalVisible(false)} carrinho={carrinhoList} />
                    </Box>
                )}
            </VStack>
        </form>
    );
}