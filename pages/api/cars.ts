import { NextApiRequest, NextApiResponse } from 'next';
import { carService } from '../../services/carService';

// Função para transformar os dados do formato do bot para o formato do banco
function transformCarData(carData: any) {
  return {
    nome: carData.nome,
    carID: carData.ID,
    placa: carData.placa || '',
    vendedor: carData.vendedor,
    preco: carData.preco,
    data: carData.data,
    condicao: carData.condicao,
    contato: carData.contato,
    quilometragem: carData.quilometragem,
    ano: carData.ano,
    motor: carData.motor,
    cambio: carData.cambio,
    proprietarios: carData.proprietarios,
    Inspecionado: carData.Inspecionado,
    sistema_transmissao: carData.sistema_transmissao,
    especificacoes: carData.especificacoes,
    seguranca: carData.seguranca,
    interior_comodidades: carData.interior_comodidades,
    eletronica: carData.eletronica,
    informacoes_adicionais: carData.informacoes_adicionais,
    outros: carData.outros,
    imagem: carData.imagem,
    url: `https://nettiauto.com/${carData.ID}`
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // Verifica se é uma atualização em massa
      if (Array.isArray(req.body)) {
        const transformedCars = req.body.map(transformCarData);
        await carService.updateAllCars(transformedCars);
        return res
          .status(200)
          .json({ message: 'Carros atualizados com sucesso' });
      }

      // Caso contrário, adiciona um único carro
      const rawCarData = req.body;
      const carData = transformCarData(rawCarData);
      const id = await carService.addCar(carData);
      return res.status(201).json({ id });
    } catch (error) {
      console.error('Erro ao processar carros:', error);
      return res.status(500).json({ error: 'Erro ao processar os carros' });
    }
  } else if (req.method === 'GET') {
    try {
      const cars = await carService.getAllCars();
      return res.status(200).json(cars);
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
      return res.status(500).json({ error: 'Erro ao buscar os carros' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}

// Configuração da API
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb' // Aumentado para lidar com muitos carros
    }
  }
};
