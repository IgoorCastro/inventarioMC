import { z } from "zod";
import { produtoFormSchema } from "./ProdutoSchema";

type ProdutoFormSchema = z.infer<typeof produtoFormSchema>;

// export interface CarrinhoSchema extends ProdutoFormSchema {
//     quantVenda: number;
//     total: number;
// }

// extend de produtos para os campos de carrinho
export const carrinhoSchema = produtoFormSchema.merge(
    z.object({
        quantVenda: z.number().positive(),
        total: z.number(),
    })
);