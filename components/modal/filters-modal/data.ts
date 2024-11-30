import { getYear } from 'date-fns';

export const brands = [
  { id: '1', name: 'BMW' },
  { id: '2', name: 'Audi' },
  { id: '3', name: 'Mercedes' },
  { id: '4', name: 'Tesla' },
  { id: '5', name: 'Ferrari' }
];

export const models = [
  { id: '1', name: 'X5' },
  { id: '2', name: 'R8' },
  { id: '3', name: 'AMG' },
  { id: '4', name: 'Model S' },
  { id: '5', name: 'SF90' }
];

export const carTypes = [
  'Autokorjaamo',
  'Kevyt rekka',
  'Pikkubussi',
  'Pakettiauto'
];
export const engineTypes = [
  'Bensiini',
  'Diesel',
  'E85/bensiini',
  'Hybriidi',
  'Kaasu',
  'Sähkö'
];
export const bodyTypes = [
  'Avomalli',
  'Coupe',
  'Maatalousajoneuvo',
  'Kilpa-auto',
  'SUV',
  'Sedan',
  'Status, auto',
  'Hatchback',
  'Pick-up',
  'Erillinen tavaratila',
  'Jatkoa, ohjaamo',
  'Lyhyt, matala',
  'Lyhyt, puolikorkea',
  'Lyhyt, korkea',
  'Puolipitkä, matala',
  'Puolipitkä, puolikorkea',
  'Puolipitkä, korkea',
  'Pitkä, matala',
  'Pitkä, puolikorkea',
  'Pitkä, korkea'
];

export const priceTypes = [
  {
    value: 'VATdeduction',
    label: 'ALV-vähennys'
  },
  { value: 'TaxExemption', label: 'Verovapaa' },
  { value: 'normal', label: 'Normaali' }
];

export const powerTypes = [
  {
    id: '1',
    name: 'Kw'
  },
  {
    id: '2',
    name: 'HP'
  }
];

export const months = [
  { id: '1', name: 'Tammikuu' },
  { id: '2', name: 'Helmikuu' },
  { id: '3', name: 'Maaliskuu' },
  { id: '4', name: 'Huhtikuu' },
  { id: '5', name: 'Toukokuu' },
  { id: '6', name: 'Kesäkuu' },
  { id: '7', name: 'Heinäkuu' },
  { id: '8', name: 'Elokuu' },
  { id: '9', name: 'Syyskuu' },
  { id: '10', name: 'Lokakuu' },
  { id: '11', name: 'Marraskuu' },
  { id: '12', name: 'Joulukuu' }
];

export const inspectionYears = new Array(5)
  .fill(null)
  .map((u, i) => getYear(new Date()) - i + 1);

export const commissioningYears = new Array(58)
  .fill(null)
  .map((u, i) => getYear(new Date()) - i + 1);

export const loadTypes = ['CCS', 'CHAdeMO', 'Schuko', 'Tyyppi 1', 'Tyyppi 2'];
export const interiorTypes = [
  'Ajotietokone',
  'Keyless',
  'Ilmastoidut istuimet',
  'Manuaalinen ilmastointi',
  'Automaattinen ilmastointi',
  'Takapenkit, jotka voidaan kääntää',
  'Kaistavahdin hälytys',
  'Sähkökaton avausmekanismi',
  'Manuaalinen katon avausmekanismi',
  'Keskitetty lukitus kaukosäätimellä',
  'Keyless keskitetty lukitus',
  'Avainkeskitetty lukitus',
  'Moottorin lämmitys / moottorin lämmitin',
  'Lämmitettävä ohjauspyörä',
  'Lämmitettävä tuulilasi',
  'Nahkasisustus',
  'Navigaattori',
  'Nopeusrajoituksen tunnistus',
  'Hydraulinen ohjaus',
  'Lämmitettävät istuimet',
  'Takakamera',
  '360 asteen takakamera',
  'Polttoaine- / akkulämmityslaitteet',
  'Pysäköintiapu',
  'Renkaanpaineen valvontajärjestelmä',
  'Sisäinen pistorasia',
  'Start-stop järjestelmä',
  'Laskettelulautoiluaukko',
  'Sähköikkunat',
  'Sähköpeilit',
  'Sähköisesti säädettävät istuimet muistilla',
  'Sähköisesti säädettävät istuimet ilman muistia',
  'Sähköinen takaluukku',
  'Turvaverkko tavaratilassa',
  'Urheiluistuin',
  'Mukautuva vakionopeudensäädin',
  'Perinteinen vakionopeudensäädin'
];

export const eletronicTypes = [
  'Ääniliitäntä',
  'Bluetooth',
  'Head-Up-näyttö',
  'Matkapuhelinlaitteet',
  'Yleisliitäntä',
  'Älypuhelinyhteys',
  'Äänentoistojärjestelmä'
];

export const securityTypes = [
  'Mukautuvat ajovalot',
  'Ajovakautusavustaja',
  'Hätäjarrutuksen tuki',
  'Valmiina Isofix',
  'Kaartovalot',
  'Bilinvaroitin',
  'Virta-avain',
  'LED-ajovalot',
  'Vetotuki',
  'ABS-jarrujärjestelmä',
  'Kiipeilyapuri',
  'Pysäköintiapu',
  'Sumuvalot',
  'Ilmatyyny',
  'Kolarivaroitus',
  'Varashälytin',
  'Xenon-ajovalot'
];

export const othersTypes = [
  'Akun esilämmitys',
  'Jousituspaketti',
  'Paperinen huoltokirja',
  'Sähköinen huoltokirja',
  'Latauspistoke hybridiautoille',
  'Ilmajouset',
  'Vammaislaitteet',
  'Renkaat',
  'Ei panoramakatto',
  'Panoramakatto',
  'Alumiinivanteet',
  'Lasikatto',
  'Monitoimiohjauspyörä',
  'Sadetunnistin',
  'Tavaratilan lämpötilansäädön laite',
  'Turbo',
  'Urheilualusta',
  'Perävaunu'
];
