// import getConnection from './dbconnection';

// const insertProduct = async (name: string, price: string) => {
//   try {
//     const db = await getConnection();
//     await db.transaction(async (tx: any) => {
//       await tx.executeSql(
//         'INSERT INTO products (name, price) VALUES (?, ?)',
//         [name, price],
//         // Tipo correto para result
//         (_: any, result: any) => {
//           console.log('Produto inserido com sucesso:', result);
//         },
//         // Tipo correto para error
//         (_: any, error: any) => {
//           console.log('Erro ao inserir produto:', error);
//         }
//       );
//     });
//   } catch (error) {
//     console.error("Erro ao inserir produto:", error);
//   }
// };

// const getAllProducts = async () => {
//   try {
//     const db = await getConnection();
//     const results = await db.executeSql('SELECT * FROM products');
//     const products = results[0].rows.raw(); // Obter os dados em formato de array
//     console.log('Produtos encontrados:', products);
//     return products;
//   } catch (error) {
//     console.error("Erro ao buscar produtos:", error);
//   }
// };

// export { insertProduct, getAllProducts };
