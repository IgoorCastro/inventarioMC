// import getConnection from './dbconnection';

// const createTables = async () => {
//     try {
//         const db = await getConnection();
//         await db.transaction(async (db: any) => {
//             await db.executeSql(`
//             CREATE TABLE IF NOT EXISTS produtos (
//               id TEXT PRIMARY KEY,
//               nome TEXT NOT NULL,
//               quantProduto INTEGER NOT NULL,
//               preco REAL NOT NULL
//             );
//           `);

//             // Criação da tabela de vendas
//             await db.executeSql(`
//             CREATE TABLE IF NOT EXISTS vendas (
//               id INTEGER PRIMARY KEY AUTOINCREMENT,
//               totalVenda REAL NOT NULL,
//               valorPago REAL NOT NULL,
//               troco REAL NOT NULL
//             );
//           `);

//             // Criação da tabela de carrinho
//             await db.executeSql(`
//             CREATE TABLE IF NOT EXISTS carrinho (
//               id INTEGER PRIMARY KEY AUTOINCREMENT,
//               produtoId TEXT NOT NULL,
//               quantVenda INTEGER NOT NULL,
//               total REAL NOT NULL,
//               FOREIGN KEY (produtoId) REFERENCES produtos (id)
//             );
//           `);
//             console.log("Create ok.");
//         });
//     } catch (error) {
//         console.error("Erro ao criar tabelas:", error);
//     }
// };

// export default createTables;
