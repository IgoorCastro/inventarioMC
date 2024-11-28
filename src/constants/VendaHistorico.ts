import { vendaFormSchema } from "@/models/VendaSchema";
import { z } from "zod";

type VendaSchema = z.infer<typeof vendaFormSchema>;
/// type ProdutoSchemaOpcional = Omit<ProdutoSchema, 'quan

const vendaHistorico: VendaSchema[] = [
  {
    id: 1,
    carrinho: [
      { id: "1", nome: "Arroz", preco: 25.9, quantProduto: 150, quantVenda: 3, total: 77.7 },
      { id: "2", nome: "Feijão Carioca", preco: 7.99, quantProduto: 200, quantVenda: 5, total: 39.95 },
    ],
    totalVenda: 117.65,
    valorPago: 120.0,
    troco: 2.35,
  },
  {
    id: 2,
    carrinho: [
      { id: "3", nome: "Macarrão Espaguete", preco: 3.49, quantProduto: 100, quantVenda: 10, total: 34.9 },
      { id: "5", nome: "Açúcar Cristal", preco: 3.19, quantProduto: 120, quantVenda: 8, total: 25.52 },
    ],
    totalVenda: 60.42,
    valorPago: 70.0,
    troco: 9.58,
  },
  {
    id: 3,
    carrinho: [
      { id: "6", nome: "Leite Integral", preco: 4.49, quantProduto: 250, quantVenda: 12, total: 53.88 },
      { id: "7", nome: "Café Torrado", preco: 8.49, quantProduto: 90, quantVenda: 2, total: 16.98 },
    ],
    totalVenda: 70.86,
    valorPago: 100.0,
    troco: 29.14,
  },
  {
    id: 4,
    carrinho: [
      { id: "9", nome: "Papel Higiênico", preco: 12.99, quantProduto: 50, quantVenda: 3, total: 38.97 },
      { id: "10", nome: "Detergente", preco: 2.39, quantProduto: 180, quantVenda: 10, total: 23.9 },
    ],
    totalVenda: 62.87,
    valorPago: 65.0,
    troco: 2.13,
  },
  {
    id: 5,
    carrinho: [
      { id: "14", nome: "Achocolatado em Pó", preco: 4.79, quantProduto: 130, quantVenda: 6, total: 28.74 },
      { id: "16", nome: "Margarina", preco: 3.79, quantProduto: 100, quantVenda: 3, total: 11.37 },
    ],
    totalVenda: 40.11,
    valorPago: 50.0,
    troco: 9.89,
  },
  // {
  //   id: 6,
  //   carrinho: [
  //     { id: "17", nome: "Tomate", preco: 4.99, quantProduto: 150, quantVenda: 5, total: 24.95 },
  //     { id: "18", nome: "Cebola", preco: 3.29, quantProduto: 200, quantVenda: 7, total: 23.03 },
  //   ],
  //   totalVenda: 47.98,
  //   valorPago: 50.0,
  //   troco: 2.02,
  // },
  // {
  //   id: 7,
  //   carrinho: [
  //     { id: "19", nome: "Alho", preco: 2.99, quantProduto: 50, quantVenda: 3, total: 8.97 },
  //     { id: "20", nome: "Frango Congelado", preco: 9.99, quantProduto: 80, quantVenda: 5, total: 49.95 },
  //   ],
  //   totalVenda: 58.92,
  //   valorPago: 60.0,
  //   troco: 1.08,
  // },
  // {
  //   id: 8,
  //   carrinho: [
  //     { id: "22", nome: "Pão de Forma", preco: 3.79, quantProduto: 300, quantVenda: 15, total: 56.85 },
  //     { id: "23", nome: "Bacon", preco: 8.99, quantProduto: 60, quantVenda: 4, total: 35.96 },
  //   ],
  //   totalVenda: 92.81,
  //   valorPago: 100.0,
  //   troco: 7.19,
  // },
  // {
  //   id: 9,
  //   carrinho: [
  //     { id: "24", nome: "Queijo Mussarela", preco: 15.9, quantProduto: 120, quantVenda: 2, total: 31.8 },
  //     { id: "25", nome: "Presunto", preco: 10.5, quantProduto: 110, quantVenda: 3, total: 31.5 },
  //   ],
  //   totalVenda: 63.3,
  //   valorPago: 70.0,
  //   troco: 6.7,
  // },
  // {
  //   id: 10,
  //   carrinho: [
  //     { id: "11", nome: "Macarrão Instantâneo", preco: 1.29, quantProduto: 250, quantVenda: 20, total: 25.8 },
  //     { id: "12", nome: "Sabão em Pó", preco: 5.99, quantProduto: 70, quantVenda: 5, total: 29.95 },
  //   ],
  //   totalVenda: 55.75,
  //   valorPago: 60.0,
  //   troco: 4.25,
  // },
];

export const getVendHistorico = () => {
  return vendaHistorico;
}

export const setVendHistorico = (data: VendaSchema) => {
  try{
    vendaHistorico.push(data);
    console.log("Venda registrada.");
  }catch(e){
    console.error("Falha ao salvar venda no histórico!\n>> Erro: ", e);
  }
}