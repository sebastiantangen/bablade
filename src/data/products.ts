export interface Product {
  id: number
  name: string
  flavor: string
  tagline: string
  description: string
  shortDescription: string
  price: number
  color: string
  colorAlt: string
  capColor: string
  labelTextColor: string
}

const products: Array<Product> = [
  {
    id: 1,
    name: 'Bablade Grønt Eple',
    flavor: 'Grønt eple',
    tagline: 'Sprø som en morgen i skogen',
    description:
      'Frisk og livlig eplebrus som minner om å gå gjennom en norsk eplehage på en solfylt sommerdag. Naturlig eplearoma gir en sprudlende og forfriskende smaksopplevelse som pirrer smaksløkene med sin sprø, grønne sødme. Brygget med vann fra norske fjellkilder.',
    shortDescription: 'Sprø og frisk eplebrus for varme sommerdager i norsk natur.',
    price: 35,
    color: '#2e7d32',
    colorAlt: '#81c784',
    capColor: '#1b5e20',
    labelTextColor: '#ffffff',
  },
  {
    id: 2,
    name: 'Bablade Vannmelon',
    flavor: 'Vannmelon',
    tagline: 'Sommer i hvert eneste slurk',
    description:
      'Den ultimate sommerbrus! Saftig og søt vannmelonsmak som tar deg rett til en varm sommerdag ved fjorden. Perfekt avkjøling etter en lang tur i fjellheimen, med et frisk preg av norsk sommerluft i hvert eneste boble.',
    shortDescription: 'Saftig vannmelon – smaker av norsk sommer ved fjorden.',
    price: 35,
    color: '#b71c1c',
    colorAlt: '#ef9a9a',
    capColor: '#7f0000',
    labelTextColor: '#ffffff',
  },
  {
    id: 3,
    name: 'Bablade Fruktpunch',
    flavor: 'Fruktpunch',
    tagline: 'En fest for smaksløkene',
    description:
      'En eksplosiv blanding av tropiske fruktsmaker møter norsk sommerglede. Appelsin, ananas og mango danser sammen i et fargerikt kor. Livlig, søt og full av energi – perfekt for alle som vil ha litt ekstra fart i hverdagen.',
    shortDescription: 'Tropisk fruktsymfoni med norsk sommerglede.',
    price: 35,
    color: '#e65100',
    colorAlt: '#ffcc80',
    capColor: '#bf360c',
    labelTextColor: '#ffffff',
  },
  {
    id: 4,
    name: 'Bablade Jordbær',
    flavor: 'Jordbær',
    tagline: 'Søt som norske jordbær',
    description:
      'Inspirert av de berømte søte norske jordbærene fra Vestfold og Telemark. Denne brusen fanger den naturlige aromaen av nyplukkede jordbær i en sprudlende og sjarmerende drikk. En smak som vekker minner om lange norske sommerkvelder.',
    shortDescription: 'Aromatisk og søt – som nyplukkede norske sommerjordbær.',
    price: 35,
    color: '#ad1457',
    colorAlt: '#f48fb1',
    capColor: '#880e4f',
    labelTextColor: '#ffffff',
  },
  {
    id: 5,
    name: 'Bablade Bringebær',
    flavor: 'Bringebær',
    tagline: 'Ville bær fra norsk skog',
    description:
      'Dyp og intens bringebærsmak hentet fra de norske skogers skatter. Perfekt balanse mellom syrlig og søtt, akkurat som å plukke ville bringebær langs en sommersti i Norges vakre natur. En smak av frihet og eventyr.',
    shortDescription: 'Intens og syrlig – ville bringebær fra norsk skog.',
    price: 35,
    color: '#6a1b9a',
    colorAlt: '#ce93d8',
    capColor: '#4a148c',
    labelTextColor: '#ffffff',
  },
  {
    id: 6,
    name: 'Bablade Miksen',
    flavor: 'Miks',
    tagline: 'Alle smaker i én flaske',
    description:
      'Hvorfor velge én smak når du kan ha alle fem? Bablade Miksen kombinerer grønt eple, vannmelon, fruktpunch, jordbær og bringebær i en enestående smakseksplosjon. Den ultimate norske sommerbrus for de som elsker det uventede og ikke klarer å bestemme seg!',
    shortDescription: 'Alle fem smaker i én uforglemmelig norsk sommerbrus.',
    price: 39,
    color: '#1565c0',
    colorAlt: '#90caf9',
    capColor: '#0d47a1',
    labelTextColor: '#ffffff',
  },
]

export default products
