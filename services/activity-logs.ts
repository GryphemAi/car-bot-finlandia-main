import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import axios from 'axios';

interface UserActivityLog {
  userId: string;
  action: string;
  timestamp: Date;
  location: {
    ip: string;
    city?: string;
    country?: string;
    region?: string;
  };
  userAgent: string;
  page?: string;
  details?: any;
}

const logCollection = collection(db, 'user_activities');

async function getLocationByIP(ip: string) {
  try {
    const response = await axios.get(`https://ipapi.co/${ip}/json/`);
    const { city, country_name: country, region } = response.data;
    return { city, country, region, ip };
  } catch (error) {
    console.error('Erro ao obter localização:', error);
    return { ip };
  }
}

export async function logUserActivity(log: UserActivityLog) {
  try {
    const location = await getLocationByIP(log.location.ip);
    const logWithLocation = { ...log, location };
    await addDoc(logCollection, logWithLocation);
    console.log('Log registrado com sucesso:', logWithLocation);
  } catch (error) {
    console.error('Erro ao registrar log:', error);
  }
}
