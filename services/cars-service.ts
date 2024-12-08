import { db } from '@/lib/firebase';
import { collection, getDocs, DocumentData, query, orderBy } from 'firebase/firestore';

export interface Car {
  id?: string;
  ID: string;
  nome: string;
  marca: string;
  modelo: string;
  ano: string;
  motor: string;
  cambio: string;
  quilometragem: string;
  preco: string;
  placa: string;
  imagem: string;
  vendedor: string;
  contato: string;
  data: string;
  Inspecionado: string;
  condicao: string;
  eletronica: string;
  especificacoes: string;
  informacoes_adicionais: string;
  interior_comodidades: string;
  outros: string;
  proprietarios: string;
  seguranca: string;
  sistema_de_transmissao: string;
}

export async function getCars(pageSize: number = 6, lastDoc?: DocumentData | null) {
  try {
    // 1. Acessar a coleção principal 'carros'
    console.log('1. Acessando coleção principal carros...');
    const carrosMainRef = collection(db, 'carros');
    
    // 2. Buscar todos os documentos (lotes) da coleção principal
    console.log('2. Buscando todos os lotes de carros...');
    const lotesSnapshot = await getDocs(carrosMainRef);
    
    console.log('Lotes encontrados:', lotesSnapshot.size);
    
    if (lotesSnapshot.empty) {
      console.error('Nenhum lote encontrado na coleção');
      return { cars: [], lastDoc: null };
    }

    // 3. Array para armazenar todos os carros
    let allCars: Car[] = [];

    // 4. Pegar os documentos
    const docsArray = lotesSnapshot.docs;
    console.log('Processando documentos:', docsArray.map(doc => doc.id));

    // 5. Processar cada lote (documento) da coleção principal
    for (const loteDoc of docsArray) {
      console.log(`\nProcessando lote: ${loteDoc.id}`);
      const documentData = loteDoc.data();
      
      // 6. Verificar se existe o campo 'carros' no documento
      if (documentData.carros && typeof documentData.carros === 'object') {
        console.log('Campo carros encontrado no documento');
        
        // 7. Converter o objeto carros em array
        const carrosArray = Object.entries(documentData.carros)
          .map(([carId, carData]: [string, any]) => ({
            id: carId,
            ...carData
          }));

        // 8. Processar cada carro
        for (const carData of carrosArray) {
          if (carData && typeof carData === 'object') {
            console.log(`\nProcessando carro ${carData.id}:`);
            console.log('Nome:', carData.nome);
            console.log('Data:', carData.data);
            
            // Criar objeto de carro com todos os campos necessários
            const car: Car = {
              id: carData.id,
              ID: carData.id,
              nome: carData.nome || '',
              marca: carData.marca || '',
              modelo: carData.modelo || '',
              ano: carData.ano || '',
              motor: carData.motor || '',
              cambio: carData.cambio || '',
              quilometragem: carData.quilometragem || '',
              preco: carData.preco || '',
              placa: carData.placa || '',
              imagem: carData.imagem && carData.imagem !== 'Não encontrado' ? carData.imagem : '',
              vendedor: carData.vendedor || '',
              contato: carData.contato || '',
              data: carData.data || '',
              Inspecionado: carData.Inspecionado || '',
              condicao: carData.condicao || '',
              eletronica: carData.eletronica || '',
              especificacoes: carData.especificacoes || '',
              informacoes_adicionais: carData.informacoes_adicionais || '',
              interior_comodidades: carData.interior_comodidades || '',
              outros: carData.outros || '',
              proprietarios: carData.proprietarios || '',
              seguranca: carData.seguranca || '',
              sistema_de_transmissao: carData.sistema_de_transmissao || ''
            };
            
            // Adicionar apenas se o carro não existir no array (evita duplicatas)
            if (!allCars.some(existingCar => existingCar.ID === car.ID)) {
              allCars.push(car);
            }
          }
        }
      } else {
        console.log('Campo carros não encontrado no documento');
      }
    }

    console.log(`\nTotal de carros únicos encontrados: ${allCars.length}`);

    if (allCars.length === 0) {
      console.log('Nenhum carro encontrado nos lotes');
      return { cars: [], lastDoc: null };
    }

    // 9. Ordenar TODOS os carros por data (globalmente)
    console.log('\nDebug de datas antes da ordenação:');
    
    // Função auxiliar para converter data
    function convertToYYYYMMDD(dateStr: string): string {
      // Remove o prefixo 'Päivitetty ' se existir
      dateStr = dateStr.replace('Päivitetty ', '');
      
      // Converte DD.MM.YYYY para YYYY-MM-DD
      const [day, month, year] = dateStr.split('.');
      return `${year}-${month}-${day}`;
    }

    allCars.forEach(car => {
      const originalDate = car.data;
      const convertedDate = convertToYYYYMMDD(car.data || '');
      console.log(`Carro: ${car.nome}`);
      console.log(`Data original: ${originalDate}`);
      console.log(`Data convertida: ${convertedDate}`);
      console.log('------------------------');
    });

    allCars.sort((a, b) => {
      const dateA = new Date(convertToYYYYMMDD(a.data || ''));
      const dateB = new Date(convertToYYYYMMDD(b.data || ''));
      return dateB.getTime() - dateA.getTime();
    });

    // Atualizar o formato da data em cada carro
    allCars = allCars.map(car => ({
      ...car,
      data: convertToYYYYMMDD(car.data || '')
    }));

    console.log('\nOrdem dos carros após ordenação:');
    allCars.forEach(car => {
      console.log(`${car.nome} - ${car.data}`);
    });

    // 10. Aplicar paginação
    let startIndex = 0;
    if (lastDoc) {
      startIndex = allCars.findIndex(car => car.ID === lastDoc.ID) + 1;
    }

    const paginatedCars = allCars.slice(startIndex, startIndex + pageSize);
    const newLastDoc = paginatedCars[paginatedCars.length - 1];

    console.log(`\nRetornando ${paginatedCars.length} carros paginados`);
    console.log('Primeiro carro:', paginatedCars[0]?.nome);
    console.log('Último carro:', paginatedCars[paginatedCars.length - 1]?.nome);

    return { cars: paginatedCars, lastDoc: newLastDoc };

  } catch (error) {
    console.error('Erro ao buscar carros:', error);
    throw error;
  }
}

export async function getAllCars(): Promise<Car[]> {
  try {
    const carrosMainRef = collection(db, 'carros');
    const lotesSnapshot = await getDocs(carrosMainRef);
    
    if (lotesSnapshot.empty) {
      return [];
    }

    let allCars: Car[] = [];

    // Buscar carros de cada lote
    for (const loteDoc of lotesSnapshot.docs) {
      const carrosLoteRef = collection(db, 'carros', loteDoc.id, 'veiculos');
      const carrosSnapshot = await getDocs(carrosLoteRef);
      
      carrosSnapshot.forEach(doc => {
        allCars.push({ id: doc.id, ...doc.data() } as Car);
      });
    }

    return allCars;
  } catch (error) {
    console.error('Erro ao buscar todos os carros:', error);
    return [];
  }
}
