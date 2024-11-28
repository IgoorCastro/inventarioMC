
import { produtoFormSchema } from "@/models/ProdutoSchema";
import { z } from "zod";

type ProdutoSchema = z.infer<typeof produtoFormSchema>;
/// type ProdutoSchemaOpcional = Omit<ProdutoSchema, 'quantidade'> & { quantidade?: number };
const produtos: ProdutoSchema[] = [
  { id: "1", nome: "Arroz", preco: 25.90, quantProduto: 150 },
  { id: "2", nome: "Feijão Carioca", preco: 7.99, quantProduto: 200 },
  { id: "3", nome: "Macarrão Espaguete", preco: 3.49, quantProduto: 100 },
  { id: "4", nome: "Óleo de Soja", preco: 5.99, quantProduto: 0 },
  { id: "5", nome: "Açúcar Cristal", preco: 3.19, quantProduto: 120 },
  { id: "6", nome: "Leite Integral", preco: 4.49, quantProduto: 250 },
  { id: "7", nome: "Café Torrado", preco: 8.49, quantProduto: 90 },
  { id: "8", nome: "Sal", preco: 1.89, quantProduto: 300 },
  { id: "9", nome: "Papel Higiênico", preco: 12.99, quantProduto: 50 },
  { id: "10", nome: "Detergente", preco: 2.39, quantProduto: 180 },
  { id: "11", nome: "Macarrão Instantâneo", preco: 1.29, quantProduto: 250 },
  { id: "12", nome: "Sabão em Pó", preco: 5.99, quantProduto: 70 },
  { id: "13", nome: "Biscoito Maizena", preco: 2.99, quantProduto: 60 },
  { id: "14", nome: "Achocolatado em Pó", preco: 4.79, quantProduto: 130 },
  { id: "15", nome: "Cereal Matinal", preco: 6.59, quantProduto: 90 },
  { id: "16", nome: "Margarina", preco: 3.79, quantProduto: 100 },
  { id: "17", nome: "Tomate", preco: 4.99, quantProduto: 150 },
  { id: "18", nome: "Cebola", preco: 3.29, quantProduto: 200 },
  { id: "19", nome: "Alho", preco: 2.99, quantProduto: 50 },
  { id: "20", nome: "Frango Congelado", preco: 9.99, quantProduto: 80 },
  { id: "21", nome: "Carne Bovina", preco: 22.50, quantProduto: 40 },
  { id: "22", nome: "Pão de Forma", preco: 3.79, quantProduto: 300 },
  { id: "23", nome: "Bacon", preco: 8.99, quantProduto: 60 },
  { id: "24", nome: "Queijo Mussarela", preco: 15.90, quantProduto: 120 },
  { id: "25", nome: "Presunto", preco: 10.50, quantProduto: 110 }
];

export const getProdutos = (): ProdutoSchema[] => {
  return produtos;
};

export const setProdutos = (prod: ProdutoSchema) => {
  try{
    produtos.push(prod);
    console.log("\n\n-- setProdutos --\n");
    console.log("Status: Produto adicionado!\n", prod);
  }catch(e){
    console.error(`Erro ao no setProdutos!\n>Erro: ${e}`);
  }
}