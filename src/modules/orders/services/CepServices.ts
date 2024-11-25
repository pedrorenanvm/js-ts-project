import axios from 'axios';

const ESTADOS_ATENDIDOS = ['AL', 'BA', 'CE', 'MA', 'PB', 'PE', 'PI', 'RN', 'SE'];

export class CepService {
    static async buscarEnderecoPorCep(cep: string) {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            
            // Verifica se houve erro no retorno da API
            if (response.data.erro) {
                return { erro: 'CEP não encontrado' };
            }

            const { localidade: cidade, uf } = response.data;

            // Verifica se o estado está entre os estados atendidos
            if (!ESTADOS_ATENDIDOS.includes(uf)) {
                return { erro: 'No momento não temos filiais nessa região' };
            }

            return { cidade, uf };
        } catch (error) {
            throw new Error('Erro ao consultar o serviço ViaCEP');
        }
    }
}
