import { createConnection, getRepository } from "typeorm";
import User from "../modules/users/typeorm/entities/User";
import { hash } from "bcryptjs";

async function createAdminUser() {
    const connection = await createConnection();
    //console.log("Conexão com o banco de dados estabelecida.");

    const userRepository = getRepository(User);

    const adminExists = await userRepository.findOne({ where: { email: 'admin@admin.com' } });
    if (!adminExists) {
        //console.log("Usuário admin não encontrado. Criando novo usuário admin...");
        
        const password = await hash('admin123', 8);
        
        const adminUser = userRepository.create({
            name: 'Admin',
            email: 'admin@admin.com',
            password: password,
        });

        await userRepository.save(adminUser);
        //console.log("Usuário admin criado com sucesso.");
    } else {
        //console.log("Usuário admin já existe. Nenhuma ação necessária.");
    }

    await connection.close();
    //console.log("Conexão com o banco de dados fechada.");
}

createAdminUser();
