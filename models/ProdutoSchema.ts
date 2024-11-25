import { z } from "zod";

export const produtoFormSchema = z.object({
    id: z.string().min(1, "Digite uma ID"),
    nome: z.string().min(1, "Digite um nome"),
    quantProduto: z.number(),
    preco: z.number().min(1),
});