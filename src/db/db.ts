import { produtoFormSchema } from "@/models/ProdutoSchema";
import { vendaFormSchema } from "@/models/VendaSchema";
import { type SQLiteDatabase, openDatabaseSync } from "expo-sqlite";
import { z } from "zod";

type ProdutoSchema = z.infer<typeof produtoFormSchema>;
type VendaSchema = z.infer<typeof vendaFormSchema>;

export type Produto = {
    id: string;
    nome: string;
    quantProduto: number;
    preco: number;
};

export type Venda = {
    id?: number;
    totalVenda: number;
    valorPago: number;
    troco: number;
};

// Abrir ou criar o banco de dados
export const openDatabase = () => openDatabaseSync("app2.db");

// Estrutura das tabelas e criação das mesmas
export async function db(database: SQLiteDatabase) {
    // await database.execAsync(`
    //     -- Deletar as tabelas, se existirem
    //     DROP TABLE IF EXISTS venda_produtos;
    //     DROP TABLE IF EXISTS vendas;
    //     DROP TABLE IF EXISTS produtos;
    // `);

    try {
        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS produtos (
                prod_id INTEGER PRIMARY KEY AUTOINCREMENT,
                prod_nome TEXT NOT NULL,
                prod_quantProduto INTEGER NOT NULL,
                prod_preco REAL NOT NULL,
                prod_ativo INTEGER NOT NULL DEFAULT 1 -- 1 = ativo, 0 = inativo
            );
        `);

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS vendas (
                ven_id INTEGER PRIMARY KEY AUTOINCREMENT,
                ven_totalVenda REAL NOT NULL,
                ven_valorPago REAL NOT NULL,
                ven_troco REAL NOT NULL
            );
        `);

        await database.execAsync(`
            CREATE TABLE IF NOT EXISTS venda_produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                venda_id INTEGER NOT NULL,
                produto_id INTEGER NOT NULL,
                quantidade INTEGER NOT NULL,
                preco REAL NOT NULL,
                FOREIGN KEY (venda_id) REFERENCES vendas(ven_id),
                FOREIGN KEY (produto_id) REFERENCES produtos(prod_id)
            );
        `);
    } catch (e) {
        console.error(e);
    }

    // try {
    //     await database.execAsync(`
    //         INSERT OR IGNORE INTO produtos (prod_nome, prod_quantProduto, prod_preco)
    //         VALUES
    //             ('Bala de Fruta', 150, 0.25),
    //             ('Pirulito', 100, 0.75),
    //             ('Salgadinho', 50, 2.00),
    //             ('Refrigerante 350ml', 30, 4.50),
    //             ('Suco de Caixa', 20, 3.00);
    //     `);

    //     // Inserir vendas e associar produtos a elas
    //     await database.execAsync(`
    //         -- Inserir vendas
    //         INSERT INTO vendas (ven_totalVenda, ven_valorPago, ven_troco)
    //         VALUES
    //             (15.00, 20.00, 5.00),
    //             (20.00, 25.00, 5.00);
        
    //         -- Associar produtos às vendas
    //         -- Venda 1
    //         INSERT INTO venda_produtos (venda_id, produto_id, quantidade, preco) 
    //         VALUES 
    //             ((SELECT ven_id FROM vendas WHERE ven_totalVenda = 15.00 LIMIT 1), 
    //             (SELECT prod_id FROM produtos WHERE prod_nome = 'Bala de Fruta' LIMIT 1), 10, 0.25),
    //             ((SELECT ven_id FROM vendas WHERE ven_totalVenda = 15.00 LIMIT 1), 
    //             (SELECT prod_id FROM produtos WHERE prod_nome = 'Pirulito' LIMIT 1), 5, 0.75);
        
    //         -- Venda 2
    //         INSERT INTO venda_produtos (venda_id, produto_id, quantidade, preco) 
    //         VALUES 
    //             ((SELECT ven_id FROM vendas WHERE ven_totalVenda = 20.00 LIMIT 1), 
    //             (SELECT prod_id FROM produtos WHERE prod_nome = 'Salgadinho' LIMIT 1), 3, 2.00),
    //             ((SELECT ven_id FROM vendas WHERE ven_totalVenda = 20.00 LIMIT 1), 
    //             (SELECT prod_id FROM produtos WHERE prod_nome = 'Refrigerante 350ml' LIMIT 1), 2, 4.50);
    //     `);
    // } catch (e) {
    //     alert(e)
    // }

    // alert("Tabelas criadas com sucesso!");
}

// Funções para manipular os dados do banco
export function useDatabase(database: SQLiteDatabase) {
    // Inserir dados em "produtos"
    async function insertProduto(produto: Produto) {
        const statement = await database.prepareAsync(`
            INSERT INTO produtos (prod_nome, prod_quantProduto, prod_preco, prod_ativo)
            VALUES ($nome, $quantProduto, $preco, 1); -- Sempre ativo no início
        `);
        try {
            await statement.executeAsync({
                $nome: produto.nome,
                $quantProduto: produto.quantProduto,
                $preco: produto.preco,
            });
            console.log("\n\n-- setProdutos --\n", produto);
            return { success: true };
        } catch (error) {
            alert(error);
        }
    }

    // Função para buscar todos os produtos -- OK --
    async function selectAllProds() {
        try {
            const query = "SELECT * FROM produtos WHERE prod_ativo = 1"; // Somente produtos ativos

            const response = await database.getAllAsync<ProdutoSchema>(query);

            // Correção da resposta
            const produtos: ProdutoSchema[] = response.map((item: any) => ({
                id: item.prod_id,
                nome: item.prod_nome,
                quantProduto: item.prod_quantProduto,
                preco: item.prod_preco,
            }));

            return produtos;
        } catch (error) {
            throw error;
        }
    }

    // Atualizar dados em "produtos"
    async function updateProduto(produto: Produto) {
        try {
            const statement = await database.prepareAsync(`
                UPDATE produtos
                SET prod_nome = $nome, prod_quantProduto = $quantProduto, prod_preco = $preco
                WHERE prod_id = $id;
            `);
            await statement.executeAsync({
                $id: produto.id,
                $nome: produto.nome,
                $quantProduto: produto.quantProduto,
                $preco: produto.preco,
            });
            console.log('> Produto atualizado com sucesso!\n\n');
            return { success: true };
        } catch (error) {
            alert(error);
        }
    }

    async function toggleProdutoAtivo(produtoId: string, ativo: boolean) {
        try {
            const statement = await database.prepareAsync(`
                UPDATE produtos
                SET prod_ativo = $ativo
                WHERE prod_id = $id;
            `);
            await statement.executeAsync({
                $id: produtoId,
                $ativo: ativo ? 1 : 0, // 1 = ativo, 0 = inativo
            });
            console.log(`> Produto ${produtoId} foi ${ativo ? "ativado" : "desativado"} com sucesso!`);
            return { success: true };
        } catch (error) {
            alert(error);
        }
    }

    // Inserir dados em "vendas"
    async function insertVenda(venda: Omit<Venda, "id">) {
        const statement = await database.prepareAsync(`
            INSERT INTO vendas (totalVenda, valorPago, troco)
            VALUES ($totalVenda, $valorPago, $troco);
        `);
        try {
            const result = await statement.executeAsync({
                $totalVenda: venda.totalVenda,
                $valorPago: venda.valorPago,
                $troco: venda.troco,
            });
            return { insertedRowId: result.lastInsertRowId };
        } catch (error) {
            alert(error);
        }
    }

    async function insertVendaProduto(venda: Venda, produtos: ProdutoSchema[]) {
        
        try {
            // Inserir a venda e recuperar o venda_id
            const vendaStatement = await database.prepareAsync(`
                INSERT INTO vendas (ven_totalVenda, ven_valorPago, ven_troco)
                VALUES ($totalVenda, $valorPago, $troco);
            `);
            
            console.log('venda: ', venda);

            const vendaResult = await vendaStatement.executeAsync({
                $totalVenda: venda.totalVenda,
                $valorPago: venda.valorPago,
                $troco: venda.troco,
            });

            const vendaId = vendaResult.lastInsertRowId; // Obtemos o venda_id gerado
            console.log("Venda inserida com ID:", vendaId);

            // 2. Inserir os produtos relacionados na tabela venda_produtos
            const produtoStatement = await database.prepareAsync(`
                INSERT INTO venda_produtos (venda_id, produto_id, quantidade, preco)
                VALUES ($vendaId, $produtoId, $quantidade, $preco);
            `);

            for (const produto of produtos) {
                console.log('produto: ', produto, '\n');
                if (!produto.id) {
                    throw new Error(`Produto sem ID não pode ser inserido: ${JSON.stringify(produto)}`);
                }
                await produtoStatement.executeAsync({
                    $vendaId: vendaId,
                    $produtoId: produto.id,
                    $quantidade: produto.quantProduto, // Confusão pode ocorrer aqui
                    $preco: produto.preco,
                });
            }

            console.log("Produtos inseridos na venda:", produtos);
            return { success: true, vendaId };

        } catch (error) {
            alert("Erro ao inserir venda e produtos: " + error);
            return { success: false, error };
        }
    }


    // Atualizar dados em "vendas"
    async function updateVenda(venda: Venda) {
        if (!venda.id) {
            throw new Error("O ID da venda é obrigatório para atualizar o registro.");
        }
        const statement = await database.prepareAsync(`
            UPDATE vendas
            SET totalVenda = $totalVenda, valorPago = $valorPago, troco = $troco
            WHERE id = $id;
        `);
        try {
            await statement.executeAsync({
                $id: venda.id,
                $totalVenda: venda.totalVenda,
                $valorPago: venda.valorPago,
                $troco: venda.troco,
            });
            return { success: true };
        } catch (error) {
            alert(error);
        }
    }

    // Função para buscar o histórico de uma venda específica, incluindo os produtos
    async function selectHistoricoVenda() {
        const query = `
            SELECT 
                vendas.ven_id AS id,
                vendas.ven_totalVenda AS totalVenda,
                vendas.ven_valorPago AS valorPago,
                vendas.ven_troco AS troco,
                produtos.prod_id AS produtoId,
                produtos.prod_nome AS nome,
                produtos.prod_preco AS preco,
                venda_produtos.quantidade AS quantVenda,
                (venda_produtos.quantidade * produtos.prod_preco) AS total
            FROM 
                vendas
            JOIN 
                venda_produtos ON vendas.ven_id = venda_produtos.venda_id
            JOIN 
                produtos ON venda_produtos.produto_id = produtos.prod_id;
        `;

        const response = await database.getAllAsync<VendaSchema>(query); //guardando a resposta do banco

        const historico: VendaSchema[] = response.reduce((acc: any[], row: any) => {
            let venda = acc.find((v) => v.id === row.id);
            if (!venda) {
                venda = {
                    id: row.id,
                    carrinho: [],
                    totalVenda: row.totalVenda,
                    valorPago: row.valorPago,
                    troco: row.troco,
                };
                acc.push(venda);
            }
            venda.carrinho.push({
                id: row.produtoId,
                nome: row.nome,
                preco: row.preco,
                quantVenda: row.quantVenda,
                total: row.total,
            });

        
            // console.log('\n\nhistorico: ');
            return acc;
        }, []);

        return historico;
    }

    return {
        insertProduto,
        selectAllProds,
        updateProduto,
        insertVendaProduto,
        updateVenda,
        selectHistoricoVenda,
        toggleProdutoAtivo,
    };
}
