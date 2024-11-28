import { z } from "zod";
import { carrinhoSchema } from "./CarrinhoSchame";

export const vendaFormSchema = z.object({
    id: z.number().positive(), // id da venda
    carrinho: z.array(carrinhoSchema), // lista de produtos da venda
    // valorProduto: z.number().min(0.01, "Digite um valor"), //
    totalVenda: z.number(), // total da venda
    valorPago: z.number(), // valor pago ao pelo cliente
    troco: z.number(), // troco do atendente
});