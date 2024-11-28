import { z } from "zod";

export const produtoFormSchema = z.object({
    id: z.string().min(1, "Problema com ID"),
    nome: z.string().min(1, "Digite um nome"),
    quantProduto: z.number().min(0, "Digite a quantidade"),
    preco: z.number().min(0, "Digite o preço"),
});