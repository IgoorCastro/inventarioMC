import { z } from "zod";
import { useThemeColor, View } from "./Themed";
import { Box, HStack, Icon, Input, VStack, Text } from "native-base";
import Colors from "@/constants/Colors";
import FormProduto from "./FormProduto";
import { produtoFormSchema } from "@/models/ProdutoSchema";
import { vendaFormSchema } from "@/models/VendaSchema";
import { carrinhoSchema } from "@/models/CarrinhoSchame";
import FormVenda from "./FormVenda";
import { useEffect, useState } from "react";
import { setVendHistorico } from "@/constants/VendaHistorico";
import { openDatabase, useDatabase } from "@/db/db";

type ProdutoFormSchema = z.infer<typeof produtoFormSchema>;
type VendaFormSchema = z.infer<typeof vendaFormSchema>;
type CarrinhoSchema = z.infer<typeof carrinhoSchema>;

interface VendaProdutosFormProps {
    isModalOpen: boolean;
    setShowModal: (value: boolean) => void;
}

type Venda = {
    id?: number;
    totalVenda: number;
    valorPago: number;
    troco: number;
};


const VendaProdutosForm = ({ isModalOpen, setShowModal }: VendaProdutosFormProps) => {
    const [carrinho, setCarrinho] = useState<CarrinhoSchema[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [quantVendida, setQuantVendida] = useState<number>(1);
    // var quantVendida: number = 0;

    // qntProd = quantidade do produto em estoque, qntVend = quantidade vendida
    const onSubmitProduto = (data: ProdutoFormSchema) => {
        let totalVenda = quantVendida * data.preco;
        const nData = {
            ...data,
            quantVenda: quantVendida,
            total: totalVenda,
        };

        if (nData.preco > 0 && nData.quantVenda > 0) {
            setCarrinho((prevProdutos) => [...prevProdutos, nData]);
            setTotal(prevStatus => parseFloat((prevStatus + data.preco * quantVendida).toFixed(2)));
        } else
            alert("Quantidade miníma para venda: 1");
    }

    const onSubmitVenda = async (data: VendaFormSchema) => {
        const database = openDatabase();
        const { insertVendaProduto } = useDatabase(database);

        const { carrinho, ...venda } = data;

        console.log(carrinho);
        // console.log('quantVendida: ', quantVendida);

        try {
            const resp = await insertVendaProduto(venda, carrinho);
            if (resp && resp.success) {
                alert("Venda concluida");
                setShowModal(false);
            }
        } catch (e) {
            alert(e)
        }
        

      
        console.log("Venda: ", data);
        setVendHistorico(data);
    }

    const handleQuantVenda = (data: number) => {
        console.log(data);
        setQuantVendida(data);
    }

    useEffect(() => {
        if (!isModalOpen) {
            setTotal(0);
            setCarrinho([]);
        }
    }, [isModalOpen]);

    return (
        <VStack alignItems="center">
            <FormProduto onSubmit={onSubmitProduto} isModalOpen={isModalOpen} quantVendaProp={handleQuantVenda} quantVenda={quantVendida} />
            <View style={{ height: 1, width: '90%', marginVertical: 15 }} lightColor={Colors.light.text} darkColor={Colors.dark.text} />
            <FormVenda onSubmit={onSubmitVenda} isModalOpen={isModalOpen} setShowModal={setShowModal} total={total} carrinhoList={carrinho} />
        </VStack>
    )
}

export default VendaProdutosForm;