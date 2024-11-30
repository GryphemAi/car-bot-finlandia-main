import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

const COLLECTION_NAME = 'cars';

export interface Car {
  nome: string;
  carID: string;
  placa: string;
  vendedor: string;
  preco: string;
  data: string;
  condicao: string;
  contato: string;
  quilometragem: string;
  ano: string;
  motor: string;
  cambio: string;
  proprietarios: string;
  Inspecionado?: string;
  sistema_transmissao: string;
  especificacoes: string;
  seguranca: string;
  interior_comodidades: string;
  eletronica: string;
  informacoes_adicionais?: string;
  outros?: string;
  imagem?: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export const carService = {
  // Adicionar novo carro
  async addCar(car: Omit<Car, 'createdAt' | 'updatedAt'>) {
    try {
      const now = new Date();
      const docRef = await addDoc(collection(db, COLLECTION_NAME), {
        ...car,
        createdAt: now,
        updatedAt: now
      });
      return docRef.id;
    } catch (error) {
      console.error('Erro ao adicionar carro:', error);
      throw error;
    }
  },

  // Buscar todos os carros
  async getAllCars() {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
      throw error;
    }
  },

  // Buscar carro por ID
  async getCarById(id: string) {
    try {
      const q = query(
        collection(db, COLLECTION_NAME),
        where('carID', '==', id)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) return null;
      const doc = querySnapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    } catch (error) {
      console.error('Erro ao buscar carro:', error);
      throw error;
    }
  },

  // Atualizar carro
  async updateCar(id: string, car: Partial<Car>) {
    try {
      const docRef = doc(db, COLLECTION_NAME, id);
      await updateDoc(docRef, {
        ...car,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Erro ao atualizar carro:', error);
      throw error;
    }
  },

  // Deletar carro
  async deleteCar(id: string) {
    try {
      await deleteDoc(doc(db, COLLECTION_NAME, id));
    } catch (error) {
      console.error('Erro ao deletar carro:', error);
      throw error;
    }
  },

  // Atualizar todos os carros (substituição em massa)
  async updateAllCars(cars: Omit<Car, 'createdAt' | 'updatedAt'>[]) {
    try {
      // 1. Deletar todos os carros existentes
      const snapshot = await getDocs(collection(db, COLLECTION_NAME));
      const deletePromises = snapshot.docs.map((doc) => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // 2. Adicionar os novos carros
      const now = new Date();
      const addPromises = cars.map((car) =>
        addDoc(collection(db, COLLECTION_NAME), {
          ...car,
          createdAt: now,
          updatedAt: now
        })
      );
      await Promise.all(addPromises);

      return true;
    } catch (error) {
      console.error('Erro ao atualizar todos os carros:', error);
      throw error;
    }
  }
};
