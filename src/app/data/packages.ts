// // data/packages.ts
export interface RateRow {
  pax1: number;
  pax2: number;
  pax3: number;
  pax4: number;
  pax5: number;
  pax6: number;
  pax7?: number;
  pax8?: number;
  pax9?: number;
  pax10?: number;
  pax11?: number;
  pax12?: number;
  pax13?: number;
  pax14?: number;
  pax15?: number;
  pax16?: number;
  pax17?: number;
  pax18?: number;
  pax19?: number;
  pax20?: number;
  ss: number;
}

export interface RatePeriod {
  validity: string;
  categories: {
    name: string;
    prices: RateRow;
  }[];
}

export interface DayItinerary {
  day: number;
  title: string;
  description: string;
  meals: string;
  overnight?: string;
}

export interface HotelEntry {
  area: string;
  classCategory: string;
  hotelNames: string[];
}

export interface Package {
  id: string;
  title: string;
  shortDescription?: string;      // NEW
  duration?: string;              // NEW
  destinations?: string;          // NEW
  highlights?: string[];          // NEW
  images: string[];
  days: DayItinerary[];
  rates: RatePeriod[];
  inclusions: string[];
  exclusions: string[];
  hotels: HotelEntry[];
  notes?: string[];
  optionalAddons?: string[];      // NEW
}

export const packageIdMap: Record<string, string> = {
  "3 DAYS 2 NIGHTS VIENTIANE - LUANGPRABANG": "three_days_two_nights_vte_lpq",
  "4 DAYS 3 NIGHTS VIENTIANE – LUANG PRABANG": "four_days_three_nights_vte_lpq",
  "2 DAYS 1 NIGHT VTE - VV": "two_days_one_night_vte_vv",
  "4 DAYS 3 NIGHTS LPQ-VV-VTE": "four_days_three_nights_lpq_vv_vte",
  "2 DAYS 1 NIGHT VTE - MF - VTE": "two_days_one_night_vte_mf",
  "5 DAYS 4 NIGHTS HUX-PK-LPQ": "five_days_four_nights_hux_pk_lpq",
  "3 DAYS 2 NIGHTS LUANGPRABANG HERITAGE ESCAPE": "three_day_two_nights_laungprabang_heritage_escape",
  // NEW PACKAGES
  "VANG VIENG ADVENTURE DAY TRIP – FULL DAY": "vang_vieng_adventure_day_trip",
  "VIENTIANE CAPITAL DISCOVERY – FULL DAY": "vientiane_capital_discovery",
  "LUANG PRABANG & VANG VIENG EXPLORER – 4 DAYS / 3 NIGHTS": "luang_prabang_vang_vieng_explorer",
  "SOUTHERN LAOS & 4,000 ISLANDS ESCAPE – 4 DAYS / 3 NIGHTS": "southern_laos_4000_islands_escape",
};

export const packagesData: Record<string, Package> = {
  // ==================== EXISTING PACKAGES ====================
  two_days_one_night_vte_mf: {
    id: 'two_days_one_night_vte_mf',
    title: '2 DAYS 1 NIGHT VIENTIANE – MUANG FEUANG',
    images: [
      'https://th.bing.com/th/id/R.1c1adb12570db4478366f96a4de93ed6?rik=MkcTTymscFc2%2fw&pid=ImgRaw&r=0',
      'https://tse3.mm.bing.net/th/id/OIP.Do93seWmpu223z8Atv5sMAHaE8?w=612&h=408&rs=1&pid=ImgDetMain&o=7&rm=3',
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
      'https://images.unsplash.com/photo-1528127269322-539801943592',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
    ],
    days: [
      {
        day: 1,
        title: 'ARRIVE VIENTIANE',
        description: 'Meet your guide and travel to Muang Feuang, a peaceful countryside destination. Check in at resort and enjoy dinner. Optional group BBQ and relaxation.',
        meals: 'Dinner',
        overnight: 'Muang Feuang',
      },
      {
        day: 2,
        title: 'Half-day tour at MF and back to VTE',
        description: 'Early morning alms giving and scenic boat ride along the river. After lunch, return to Vientiane.',
        meals: 'Breakfast, Lunch',
        overnight: '',
      },
    ],
    rates: [
      {
        validity: '1 Jan 2026 – 30 Sep 2027',
        categories: [
          { name: 'Three Stars', prices: { pax1: 450, pax2: 240, pax3: 177, pax4: 145, pax5: 126, pax6: 113, ss: 20 } },
          { name: 'Four Stars', prices: { pax1: 475, pax2: 253, pax3: 189, pax4: 158, pax5: 139, pax6: 126, ss: 33 } },
        ],
      },
      {
        validity: '1 May 2027 – 30 Sep 2027',
        categories: [
          { name: 'Three Stars', prices: { pax1: 445, pax2: 238, pax3: 174, pax4: 143, pax5: 124, pax6: 111, ss: 18 } },
          { name: 'Four Stars', prices: { pax1: 460, pax2: 245, pax3: 182, pax4: 150, pax5: 131, pax6: 118, ss: 25 } },
        ],
      },
    ],
    inclusions: [
      'Accommodation based on double/twin sharing',
      '(01pax based on Single room)',
      'Private pick-up without guide on the first and last day',
      'Tours as mentioned in the itinerary',
      'Entrance fee for all sightseeing activities as mentioned in the itinerary',
      'Complimentary mineral water',
    ],
    exclusions: [
      'International & domestic flight tickets',
      'Visa stamping fee at the airport',
      'Meals not specified in the itinerary',
      'Tipping for guides and drivers',
      'Travel insurance (we highly recommend purchase adequate insurance)',
      'All other services not specified in the itinerary',
    ],
    hotels: [
      {
        area: 'MF',
        classCategory: 'First Class (3.5*)',
        hotelNames: ['Riverside 2 Resort – Classic', 'OR', 'AK Resort Classic'],
      },
    ],
    notes: ['Except Chinese New Year from 28 Jan to 03 Feb 2027'],
  },
  two_days_one_night_vte_vv: {
    id: 'two_days_one_night_vte_vv',
    title: '2 DAYS 1 NIGHT VIENTIANE – VANG VIENG',
    images: [
      'https://th.bing.com/th/id/R.1c1adb12570db4478366f96a4de93ed6?rik=MkcTTymscFc2%2fw&pid=ImgRaw&r=0',
      'https://images.unsplash.com/photo-1558121638-4712f0c8c9d9',
      'https://images.unsplash.com/photo-1539642932569-1e1352e48fe4',
      'https://images.unsplash.com/photo-1560185009-8e5c6ea8a5f7',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    days: [
      {
        day: 1,
        title: 'Arrive to Vientiane. Overnight at Vang Vieng',
        description: 'Upon arrival in Vientiane, meet your guide and transfer to Vang Vieng via expressway (approx. 1.5 hours). In the afternoon, enjoy adventure activities such as hot air balloon or paramotor (optional). Witness a stunning sunset over the limestone mountains. Dinner by the Nam Song River and visit the night market.',
        meals: 'Dinner',
        overnight: 'Vang Vieng',
      },
      {
        day: 2,
        title: 'Vang Vieng Full-day City Tour',
        description: 'After breakfast, enjoy outdoor activities including: Cave exploration (Nang Fa Cave) and Kayaking along the Nam Song River. After lunch, return to Vientiane.',
        meals: 'Breakfast, Lunch',
        overnight: '',
      },
    ],
    rates: [
      {
        validity: '1 Jan 2026 – 30 Sep 2027',
        categories: [
          { name: 'Three Stars', prices: { pax1: 693, pax2: 463, pax3: 396, pax4: 363, pax5: 343, pax6: 330, ss: 30 } },
          { name: 'Four Stars', prices: { pax1: 743, pax2: 488, pax3: 421, pax4: 388, pax5: 368, pax6: 355, ss: 55 } },
        ],
      },
      {
        validity: '1 May 2027 – 30 Sep 2027',
        categories: [
          { name: 'Three Stars', prices: { pax1: 683, pax2: 458, pax3: 391, pax4: 358, pax5: 338, pax6: 325, ss: 25 } },
          { name: 'Four Stars', prices: { pax1: 728, pax2: 481, pax3: 414, pax4: 381, pax5: 361, pax6: 347, ss: 48 } },
        ],
      },
    ],
    inclusions: [
      'Accommodation based on double/twin sharing',
      '(01pax based on Single room)',
      'Private pick-up without guide on the first and last day',
      'Tours as mentioned in the itinerary',
      'Entrance fee for all sightseeing activities as mentioned in the itinerary',
      'Complimentary mineral water',
    ],
    exclusions: [
      'International & domestic flight tickets',
      'Visa stamping fee at the airport',
      'Meals not specified in the itinerary',
      'Tipping for guides and drivers',
      'Travel insurance (we highly recommend purchase adequate insurance)',
      'All other services not specified in the itinerary',
    ],
    hotels: [
      {
        area: 'Vang Vieng',
        classCategory: 'First Class (3*)',
        hotelNames: ['Khamair Hotel – Deluxe', 'OR', 'Elephant Crossing Hotel – Deluxe (www.theelephantcrossinghotel.com)'],
      },
      {
        area: 'Vang Vieng',
        classCategory: 'Superior (4*)',
        hotelNames: ['Amari Vang Vieng Hotel – Superior Riverview (www.amari.com/vang-vieng)', 'OR', 'Riverside Boutique Resort – Classic Room (www.riversideboutique.vangvieng)'],
      },
    ],
    notes: [
      'We will drive new highway road for 1 hour 30 minutes.',
      'Visitors should dress in light and thin clothes during summer time.',
      'The itinerary can be adjusted due to weather conditions.',
      'Except Chinese New Year from 28 Jan to 03 Feb 2027',
    ],
  },
  three_days_two_nights_vte_lpq: {
    id: 'three_days_two_nights_vte_lpq',
    title: '3 DAYS 2 NIGHTS VIENTIANE – LUANG PRABANG',
    images: [
      'https://th.bing.com/th/id/R.1c1adb12570db4478366f96a4de93ed6?rik=MkcTTymscFc2%2fw&pid=ImgRaw&r=0',
      'https://images.unsplash.com/photo-1558121638-4712f0c8c9d9',
      'https://images.unsplash.com/photo-1539642932569-1e1352e48fe4',
      'https://images.unsplash.com/photo-1560185009-8e5c6ea8a5f7',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    days: [
      {
        day: 1,
        title: 'Vientiane – Luang Prabang. Pick up with Guide',
        description: 'Begin your journey with a transfer from your hotel or airport in Vientiane to the high-speed train station. Enjoy a comfortable train ride to Luang Prabang (approximately 2 hours). Upon arrival, meet your local guide and proceed to the beautiful Kuang Si Waterfall, one of Laos’ most iconic natural attractions. Enjoy lunch at a local restaurant near the waterfall or along the Mekong River. In the afternoon, return to the city and explore Luang Prabang’s cultural highlights, including the National Museum (Royal Palace), Wat Xieng Thong, Wat Visoun, Wat Mai, and Haw Phra Bang. In the evening, enjoy dinner and explore the lively night market.',
        meals: 'Lunch',
        overnight: 'Luang Prabang',
      },
      {
        day: 2,
        title: 'Full Day City Tour in LPQ',
        description: 'Start early with the traditional Alms Giving Ceremony, followed by a visit to the morning market. After breakfast, take a scenic Mekong River cruise to the famous Pak Ou Caves, home to thousands of Buddha statues. Enjoy lunch on board with traditional Lao cuisine. In the afternoon, return to town and climb Mount Phousi for panoramic sunset views. Explore the night market before returning to your hotel.',
        meals: 'Breakfast, Lunch',
        overnight: 'Luang Prabang',
      },
      {
        day: 3,
        title: 'Half Day Tour in LPQ',
        description: 'After breakfast, explore the UNESCO-listed old town and revisit the National Museum if desired. Check out and transfer to the train station for your return journey to Vientiane.',
        meals: 'Breakfast, Lunch',
        overnight: 'Vientiane',
      },
    ],
    rates: [
      {
        validity: '1 Jan 2026 – 30 Sep 2027',
        categories: [
          { name: 'Three Stars', prices: { pax1: 586, pax2: 336, pax3: 279, pax4: 251, pax5: 234, pax6: 223, ss: 80 } },
          { name: 'Four Stars', prices: { pax1: 686, pax2: 386, pax3: 329, pax4: 301, pax5: 284, pax6: 273, ss: 130 } },
        ],
      },
      {
        validity: '1 May 2027 – 30 Sep 2027',
        categories: [
          { name: 'Three Stars', prices: { pax1: 566, pax2: 326, pax3: 269, pax4: 241, pax5: 224, pax6: 213, ss: 70 } },
          { name: 'Four Stars', prices: { pax1: 626, pax2: 356, pax3: 299, pax4: 271, pax5: 254, pax6: 243, ss: 100 } },
        ],
      },
    ],
    inclusions: [
      'Accommodation based on double/twin sharing',
      '(01pax based on Single room)',
      'Private pick-up without guide on the first and last day',
      'Full-day tour in LPQ city with lunch',
      'Entrance fee for all sightseeing activities as mentioned in the itinerary',
      'Complimentary mineral water',
      'High speed train tickets',
    ],
    exclusions: [
      'International & domestic flight tickets',
      'Visa stamping fee at the airport (USD 40 single entry to Vietnam, payable in cash at the airport)',
      'Meals not specified in the itinerary',
      'Tipping for guides and drivers',
      'Travel insurance (we highly recommend purchase adequate insurance)',
      'All other services not specified in the itinerary',
    ],
    hotels: [
      {
        area: 'LPQ',
        classCategory: 'First Class (3*)',
        hotelNames: ['Sankeo Boutique & Spa hotel – Classic (www.sanakeoboutiquelpb.com)', 'OR', 'Senglao Boutique hotel – Classic'],
      },
      {
        area: 'LPQ',
        classCategory: 'Superior (4*)',
        hotelNames: ['Souphattra Hotel – Deluxe (www.souphattra.com)', 'OR', 'Kiridara Hotel – Classic room (www.souphattra.com)'],
      },
    ],
    notes: [
      'Optional: Cruise boat by return trip from Pak Ou cave can be arranged (Extra charge: USD 30 per person)',
      'The itinerary may be changed due to weather conditions, tide levels, or operating conditions.',
      'Special request (dietary or vegetarian requirements, etc.) should be informed in advance before your departure date.',
      'A surcharge of USD 30 per person applies if the travel date falls on Lunar New Year.',
      'Except Chinese New Year from 28 Jan to 03 Feb 2027',
    ],
  },
  four_days_three_nights_vte_lpq: {
    id: 'four_days_three_nights_vte_lpq',
    title: '4 DAYS 3 NIGHTS VIENTIANE – LUANG PRABANG',
    images: [
      'https://th.bing.com/th/id/R.1c1adb12570db4478366f96a4de93ed6?rik=MkcTTymscFc2%2fw&pid=ImgRaw&r=0',
      'https://images.unsplash.com/photo-1558121638-4712f0c8c9d9',
      'https://images.unsplash.com/photo-1539642932569-1e1352e48fe4',
      'https://images.unsplash.com/photo-1560185009-8e5c6ea8a5f7',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    days: [
      {
        day: 1,
        title: 'Overnight in Vientiane With Guide',
        description: 'Upon arrival at Wattay International Airport, meet your guide and begin a city tour of Vientiane. Visit major landmarks including: That Luang Stupa (national symbol), Wat Sisaket, and Haw Phra Keo Museum. After lunch, continue to Patuxai Monument and enjoy views of the Mekong River. In the evening, visit the night market.',
        meals: 'Lunch',
        overnight: 'Vientiane',
      },
      {
        day: 2,
        title: 'Vientiane to Luangprabang Half Day City Tour in LPQ',
        description: 'After breakfast, transfer to the train station and travel to Luang Prabang. Upon arrival, visit key temples including Wat Visoun, Wat Xieng Thong, and Wat Sens. Enjoy lunch at a local restaurant. In the afternoon, visit the National Museum and enjoy a coffee break at a heritage house. Evening at leisure with a night market visit.',
        meals: 'Breakfast, Lunch',
        overnight: 'Luang Prabang',
      },
      {
        day: 3,
        title: 'Luangh Prabang ancient city tour protect by UNESCO',
        description: 'Begin with alms giving and morning market visit. Continue to Kuang Si Waterfall and Pak Ou Caves. Enjoy lunch during the excursion. In the evening, explore Mount Phousi and the night market.',
        meals: 'Breakfast, Lunch, Dinner',
        overnight: 'Luang Prabang',
      },
      {
        day: 4,
        title: 'Departure to Vientiane and drop at airport',
        description: 'After breakfast, check out and transfer to the train station. Arrive in Vientiane, enjoy lunch, and transfer to the airport for departure.',
        meals: 'Breakfast, Lunch',
        overnight: '',
      },
    ],
    rates: [
      {
        validity: '1 Jan 2026 – 30 Sep 2027',
        categories: [
          { name: 'Three Stars', prices: { pax1: 871, pax2: 486, pax3: 398, pax4: 354, pax5: 327, pax6: 309, ss: 120 } },
          { name: 'Four Stars', prices: { pax1: 1021, pax2: 561, pax3: 473, pax4: 429, pax5: 402, pax6: 384, ss: 195 } },
        ],
      },
      {
        validity: '1 May 2027 – 30 Sep 2027',
        categories: [
          { name: 'Three Stars', prices: { pax1: 566, pax2: 326, pax3: 269, pax4: 241, pax5: 224, pax6: 213, ss: 105 } },
          { name: 'Four Stars', prices: { pax1: 931, pax2: 516, pax3: 428, pax4: 384, pax5: 357, pax6: 339, ss: 150 } },
        ],
      },
    ],
    inclusions: [
      'Accommodation based on double/twin sharing',
      '(01pax based on Single room)',
      'Private pick-up without guide on the first and last day',
      'Full-day tour in LPQ city with lunch',
      'Entrance fee for all sightseeing activities as mentioned in the itinerary',
      'Complimentary mineral water',
      'High speed train tickets',
    ],
    exclusions: [
      'International & domestic flight tickets',
      'Visa stamping fee at the airport (USD 40 single entry to Vietnam, payable in cash at the airport)',
      'Meals not specified in the itinerary',
      'Tipping for guides and drivers',
      'Travel insurance (we highly recommend purchase adequate insurance)',
      'All other services not specified in the itinerary',
    ],
    hotels: [
      {
        area: 'Vientiane',
        classCategory: 'First Class (3*)',
        hotelNames: ['Riverside Hotel – Superior (Riverside62023@gmail.com)', 'OR', 'Grand Hotel – Deluxe (www.granhotelvientiane.com)'],
      },
      {
        area: 'Vientiane',
        classCategory: 'Superior (4*)',
        hotelNames: ['Crowneplaza Hotel – Standard (http://www.vientiane.crowneplaza.com)', 'OR', 'Amari Hotel – Classic room (https://www.amari.com)'],
      },
      {
        area: 'LPQ',
        classCategory: 'First Class (3*)',
        hotelNames: ['Sankeo Boutique & Spa hotel – Classic (www.sanakeoboutiquelpb.com)', 'OR', 'Senglao Boutique hotel – Classic'],
      },
      {
        area: 'LPQ',
        classCategory: 'Superior (4*)',
        hotelNames: ['Souphattra Hotel – Deluxe (www.souphattra.com)', 'OR', 'Kiridara Hotel – Classic room (www.souphattra.com)'],
      },
    ],
    notes: [
      'The itinerary may be changed due to weather conditions, tide levels, or operating conditions.',
      'Special request (dietary or vegetarian requirements, etc.) should be informed in advance before your departure date.',
      'A surcharge of USD 30 per person applies if the travel date falls on Lunar New Year.',
      'Except Chinese New Year from 28 Jan to 03 Feb 2027',
    ],
  },
  four_days_three_nights_lpq_vv_vte: {
    id: 'four_days_three_nights_lpq_vv_vte',
    images: [
      'https://th.bing.com/th/id/R.1c1adb12570db4478366f96a4de93ed6?rik=MkcTTymscFc2%2fw&pid=ImgRaw&r=0',
      'https://images.unsplash.com/photo-1558121638-4712f0c8c9d9',
      'https://images.unsplash.com/photo-1539642932569-1e1352e48fe4',
      'https://images.unsplash.com/photo-1560185009-8e5c6ea8a5f7',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    title: '4 DAYS 3 NIGHTS LUANG PRABANG – VANG VIENG – VIENTIANE',
    days: [
      {
        day: 1,
        title: 'At Luang Prabang',
        description: 'Arrival at Luang Prabang Airport. Meet your guide and transfer to hotel. In the evening, enjoy a Mekong sunset cruise and visit the night market.',
        meals: '',
        overnight: 'Luang Prabang',
      },
      {
        day: 2,
        title: 'LPQ Half-Day Tour and Departure to Vang Vieng',
        description: 'Early morning alms giving and city tour of temples. Transfer to the train station and travel to Vang Vieng. Upon arrival, check in and relax. In the late afternoon, enjoy a hot air balloon experience (optional) followed by dinner.',
        meals: 'Dinner',
        overnight: 'Vang Vieng',
      },
      {
        day: 3,
        title: 'Half-Day Tour in Vang Vieng and Transfer to Vientiane',
        description: 'Morning boat ride on the Nam Song River and visit caves and the Blue Lagoon. Transfer to Vientiane and check into the hotel. Free time for leisure or night exploration.',
        meals: 'Breakfast',
        overnight: 'Vientiane',
      },
      {
        day: 4,
        title: 'Half-Day Tour in Vientiane and Departure',
        description: 'After breakfast, visit key temples and enjoy a short city tour. Transfer to the airport for departure.',
        meals: 'Breakfast',
        overnight: '',
      },
    ],
    rates: [
      {
        validity: '1 Jan 2026 – 30 Sep 2027',
        categories: [
          { name: 'Three Stars', prices: { pax1: 819, pax2: 554, pax3: 501, pax4: 474, pax5: 458, pax6: 421, ss: 105 } },
          { name: 'Four Stars', prices: { pax1: 969, pax2: 629, pax3: 576, pax4: 549, pax5: 533, pax6: 496, ss: 180 } },
        ],
      },
      {
        validity: '1 May 2027 – 30 Sep 2027',
        categories: [
          { name: 'Three Stars', prices: { pax1: 759, pax2: 524, pax3: 471, pax4: 444, pax5: 428, pax6: 391, ss: 75 } },
          { name: 'Four Stars', prices: { pax1: 939, pax2: 614, pax3: 561, pax4: 534, pax5: 518, pax6: 481, ss: 165 } },
        ],
      },
    ],
    inclusions: [
      'Accommodation based on double/twin sharing',
      '(01pax based on Single room)',
      'Private pick-up without guide on the first and last day',
      'Full-day tour in LPQ city with lunch',
      'Entrance fee for all sightseeing activities as mentioned in the itinerary',
      'Complimentary mineral water',
      'High speed train tickets',
    ],
    exclusions: [
      'International & domestic flight tickets',
      'Visa stamping fee at the airport (USD 40 single entry to Vietnam, payable in cash at the airport)',
      'Meals not specified in the itinerary',
      'Tipping for guides and drivers',
      'Travel insurance (we highly recommend purchase adequate insurance)',
      'All other services not specified in the itinerary',
    ],
    hotels: [
      {
        area: 'Vientiane',
        classCategory: 'First Class (3*)',
        hotelNames: ['Riverside Hotel – Superior (Riverside62023@gmail.com)', 'OR', 'Grand Hotel – Deluxe (www.granhotelvientiane.com)'],
      },
      {
        area: 'Vientiane',
        classCategory: 'Superior (4*)',
        hotelNames: ['Crowneplaza Hotel – Standard (http://www.vientiane.crowneplaza.com)', 'OR', 'Amari Hotel – Classic Room (https://www.amari.com)'],
      },
      {
        area: 'Vang Vieng',
        classCategory: 'First Class (3*)',
        hotelNames: ['Khamair Hotel – Deluxe', 'OR', 'Elephant Crossing Hotel – Deluxe (www.theelephantcrossinghotel.com)'],
      },
      {
        area: 'Vang Vieng',
        classCategory: 'Superior (4*)',
        hotelNames: ['Amari Vang Vieng Hotel – Superior Riverview (www.amari.com/vang-vieng)', 'OR', 'Riverside Boutique Resort – Classic Room (www.riversideboutique.vangvieng)'],
      },
      {
        area: 'Luang Prabang',
        classCategory: 'First Class (3*)',
        hotelNames: ['Sankeo Boutique & Spa hotel – Classic (www.sanakeoboutiquelpb.com)', 'OR', 'Senglao Boutique hotel – Classic'],
      },
      {
        area: 'Luang Prabang',
        classCategory: 'Superior (4*)',
        hotelNames: ['Souphattra Hotel – Deluxe (www.souphattra.com)', 'OR', 'KIRIDARA HOTEL – Classic room (www.souphattra.com)'],
      },
    ],
    notes: [
      'For activities, clients can choose what they would like to do.',
      'The Drop-off and pick-up time for activities is subject to the service agent’s instruction.',
      'Except Chinese New Year from 28 Jan to 03 Feb 2027',
    ],
  },
  five_days_four_nights_hux_pk_lpq: {
    id: 'five_days_four_nights_hux_pk_lpq',
    images: [
      'https://th.bing.com/th/id/R.1c1adb12570db4478366f96a4de93ed6?rik=MkcTTymscFc2%2fw&pid=ImgRaw&r=0',
      'https://images.unsplash.com/photo-1558121638-4712f0c8c9d9',
      'https://images.unsplash.com/photo-1539642932569-1e1352e48fe4',
      'https://images.unsplash.com/photo-1560185009-8e5c6ea8a5f7',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    title: '5 DAYS 4 NIGHTS HOUAYXAI – PAKBENG – LUANG PRABANG',
    days: [
      {
        day: 1,
        title: 'Pick-up from Thai-Lao border (Huayxai)',
        description: 'Arrival at the Thai-Lao border. Meet your guide and begin a 2-day Mekong River cruise. Visit local ethnic villages along the way. Arrive in Pakbeng and check into the hotel.',
        meals: 'Lunch, Dinner',
        overnight: 'Pakbeng',
      },
      {
        day: 2,
        title: 'Pakbeng – Luang Prabang (Downstream)',
        description: 'Continue the cruise downstream to Luang Prabang. Visit the Pak Ou Caves and Whisky Village before arriving in the evening.',
        meals: 'Breakfast, Lunch',
        overnight: 'Luang Prabang',
      },
      {
        day: 3,
        title: 'Luang Prabang Full Day Tour',
        description: 'Early morning alms giving followed by a city tour. Visit temples, the Royal Palace, and Mount Phousi for sunset.',
        meals: 'Breakfast, Lunch',
        overnight: 'Luang Prabang',
      },
      {
        day: 4,
        title: 'Luang Prabang Full Day Tour',
        description: 'Visit the Kuang Si Waterfall and the Bear Rescue Center. In the evening, enjoy a traditional cultural performance.',
        meals: 'Breakfast, Lunch',
        overnight: 'Luang Prabang',
      },
      {
        day: 5,
        title: 'Departure',
        description: 'Free time before transfer to the airport for departure.',
        meals: 'Breakfast',
        overnight: '',
      },
    ],
    rates: [],
    inclusions: [
      'Accommodation based on double/twin sharing',
      '(01pax based on Single room)',
      'Private pick-up without guide on the first and last day',
      'Full-day tour in LPQ city with lunch',
      'Entrance fee for all sightseeing activities as mentioned in the itinerary',
      'Complimentary mineral water',
      'High speed train tickets',
    ],
    exclusions: [
      'International & domestic flight tickets',
      'Visa stamping fee at the airport (USD 40 single entry to Vietnam, payable in cash at the airport)',
      'Meals not specified in the itinerary',
      'Tipping for guides and drivers',
      'Travel insurance (we highly recommend purchase adequate insurance)',
      'All other services not specified in the itinerary',
    ],
    hotels: [
      {
        area: 'Pakbeng',
        classCategory: 'First Class (4*) / Superior (4*)',
        hotelNames: ['Legrand Resort – Deluxe (www.legrandresort.com)', 'OR', 'Sanctuary – Classic (www.sanctuaryhotelsandresort.com)'],
      },
      {
        area: 'LPQ',
        classCategory: 'First Class (3*)',
        hotelNames: ['Sankeo Boutique & Spa hotel – Classic (www.sanakeoboutiquelpb.com)', 'OR', 'Senglao Boutique hotel – Classic'],
      },
      {
        area: 'LPQ',
        classCategory: 'Superior (4*)',
        hotelNames: ['Souphattra Hotel – Deluxe (www.souphattra.com)', 'OR', 'KIRIDARA HOTEL – Classic room (www.souphattra.com)'],
      },
    ],
  },
  eight_days_seven_nights_golf_leisure: {
    id: "eight_days_seven_nights_golf_leisure",
    title: "8 DAYS 7 NIGHTS (VIENTIANE–LUANGPRABANG–VIENTIANE)",
    images: [
      "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa",
      "https://images.unsplash.com/photo-1551524164-6cf2ac3fcb5b",
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e",
      "https://images.unsplash.com/photo-1517649763962-0c623066013b",
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12",
    ],
    days: [
      {
        day: 1,
        title: "ARRIVAL – VIENTIANE",
        description: "Upon arrival at Wattay International Airport, proceed through immigration and baggage claim. Meet our airport representative at the arrival hall and transfer by private vehicle to your hotel. Check in and relax.",
        meals: "",
        overnight: "Vientiane",
      },
      {
        day: 2,
        title: "GOLF – LONG VIEN GOLF CLUB",
        description: "Breakfast at the hotel. Pick up and transfer to Long Vien Golf Club: Tee Time: 9:00 AM, 18 holes round, includes caddie & golf cart (sharing). After your game, transfer back to your hotel.",
        meals: "Breakfast",
        overnight: "Vientiane",
      },
      {
        day: 3,
        title: "VIENTIANE CITY TOUR (LEISURE STYLE)",
        description: "After breakfast at the hotel, enjoy a leisurely city tour of Vientiane, combining cultural highlights with a relaxed pace. Visit: Pha That Luang Stupa (national symbol), Wat Sisaket (oldest temple), Haw Phra Keo (former royal temple, now museum). Continue to Patuxai Monument for panoramic views. Take a relaxing break at a local café or along the Mekong riverside. Afternoon at leisure – you may explore local markets, enjoy spa/massage, or visit cafés and boutique shops. Return to your hotel in the late afternoon.",
        meals: "Breakfast",
        overnight: "Vientiane",
      },
      {
        day: 4,
        title: "GOLF – LAKE VIEW GOLF CLUB",
        description: "Breakfast at the hotel. Transfer to Lake View Golf Club: Tee Time: 9:00 AM, 18 holes, includes caddie & golf cart (sharing). After golf, return to hotel and prepare for next day departure.",
        meals: "Breakfast",
        overnight: "Vientiane",
      },
      {
        day: 5,
        title: "VIENTIANE – LUANG PRABANG BY TRAIN – LEISURE DAY",
        description: "After breakfast, transfer to the railway station for a high‑speed train to Luang Prabang (approx. 2 hours). Upon arrival, transfer to your hotel. The rest of the day is free for you to explore at your own pace. Optional experiences (recommended): Kuang Si Waterfall, Mekong River sunset cruise, old town cafés, traditional Lao spa. Return to your hotel at your own leisure.",
        meals: "Breakfast",
        overnight: "Luang Prabang",
      },
      {
        day: 6,
        title: "GOLF – LUANG PRABANG GOLF CLUB",
        description: "Breakfast at the hotel. Transfer to Luang Prabang Golf Club: Tee Time: 9:00 AM, 18 holes round, includes caddie & cart. Enjoy stunning views along the Mekong River while playing. After golf, return to your hotel.",
        meals: "Breakfast",
        overnight: "Luang Prabang",
      },
      {
        day: 7,
        title: "ALMSGIVING & LUANG PRABANG CITY TOUR",
        description: "Early morning, participate in the sacred Alms Giving Ceremony. Return to hotel for breakfast. Afterward, enjoy a half‑day city tour by local transport (tuk‑tuk), visiting temples and cultural sites in Luang Prabang. Afternoon at leisure.",
        meals: "Breakfast",
        overnight: "Luang Prabang",
      },
      {
        day: 8,
        title: "LUANG PRABANG → VIENTIANE & DEPARTURE",
        description: "Breakfast at the hotel. Transfer to Luang Prabang Railway Station for your return train to Vientiane. Upon arrival, meet your driver and transfer directly to Wattay International Airport for departure (flight at 17:00).",
        meals: "Breakfast",
        overnight: "",
      },
    ],
    rates: [
      {
        validity: "1 Jan 2026 – 30 Sep 2027",
        categories: [
          {
            name: "Golf Package (per person)",
            prices: {
              pax1: 0, pax2: 0, pax3: 0,
              pax4: 855, pax5: 812, pax6: 784,
              pax7: 748, pax8: 748, pax9: 748,
              ss: 0,
            },
          },
        ],
      },
    ],
    inclusions: [
      "Accommodation with daily breakfast",
      "Private transportation (airport, golf, tours)",
      "Train tickets (Vientiane ↔ Luang Prabang)",
      "3 Golf Rounds (Long Vien, Lake View, Luang Prabang Golf Club)",
      "Entrance fees & sightseeing",
      "Mekong River Cruise (2 hours)",
    ],
    exclusions: [
      "International air tickets",
      "Meals not mentioned in the itinerary (lunch & dinner unless specified)",
      "Personal expenses (laundry, telephone, minibar, drinks, etc.)",
      "Tips & gratuities for drivers, guides, and caddies",
      "Visa fees (if applicable)",
      "Travel insurance (strongly recommended)",
      "Golf personal expenses (additional rounds, equipment rental, caddie tips)",
    ],
    hotels: [
      {
        area: "Vientiane",
        classCategory: "3 - 3.5★ Hotel",
        hotelNames: ["Vientiane Plaza Hotel", "OR", "Grand Hotel Vientiane", "OR", "Leuxay Hotel"],
      },
      {
        area: "Luang Prabang",
        classCategory: "3 - 3.5★ Hotel",
        hotelNames: ["Seang Lao Hotel", "OR", "Sankeo Boutique & Spa", "OR", "Le Bel Air Resort"],
      },
    ],
    notes: [
      "Minimum 4 persons required for this package.",
      "For groups of 7–10 persons, the price reduces further: 7 pax USD 763, 8–10 pax USD 748 per person. Please contact us for a custom quote.",
      "Tee times are subject to availability; please book in advance.",
      "Itinerary may be adjusted due to weather or local conditions.",
      "Except Chinese New Year from 28 Jan to 03 Feb 2027 (surcharge may apply).",
    ],
  },
  three_day_two_nights_laungprabang_heritage_escape: {
    id: 'three_day_two_nights_laungprabang_heritage_escape',
    title: '3 DAYS 2 NIGHTS LUANG PRABANG HERITAGE ESCAPE',
    shortDescription: 'Experience the timeless charm of Luang Prabang, where ancient temples, French colonial streets, and natural wonders create the perfect cultural escape.',
    duration: '3 Days / 2 Nights',
    destinations: 'Luang Prabang – Kuang Si – Pak Ou Caves',
    highlights: [
      'UNESCO Old Town exploration',
      'Swim at Kuang Si Falls',
      'Mekong River cruise to Pak Ou Caves',
      'Optional alms-giving ceremony',
    ],
    images: [
      'https://images.unsplash.com/photo-1528181304801-2a3d0e7b4b8b',
      'https://images.unsplash.com/photo-1544731341-5b6cf6c6b1f6',
      'https://images.unsplash.com/photo-1530425279854-bd484631b0b7',
      'https://images.unsplash.com/photo-1561119209-af8da7fa5a1b',
      'https://images.unsplash.com/photo-1558283789-174b1cbf0d96',
    ],
    days: [
      {
        day: 1,
        title: 'Arrival – City Tour',
        description: 'Arrival, hotel check-in, visit temples and night market.',
        meals: '',
        overnight: 'Luang Prabang',
      },
      {
        day: 2,
        title: 'Kuang Si Waterfall',
        description: 'Morning excursion to Kuang Si Falls, free time for swimming and relaxing.',
        meals: 'Breakfast',
        overnight: 'Luang Prabang',
      },
      {
        day: 3,
        title: 'Pak Ou Caves – Departure',
        description: 'Boat trip along Mekong River to Pak Ou Caves, transfer to airport.',
        meals: 'Breakfast',
        overnight: '',
      },
    ],
    rates: [
      {
        validity: '1 Jan 2026 – 30 Sep 2027',
        categories: [
          {
            name: 'Standard Package',
            prices: {
              pax1: 320,
              pax2: 220,
              pax3: 190,
              pax4: 190,
              pax5: 170,
              pax6: 170,
              ss: 50,
            },
          },
        ],
      },
    ],
    inclusions: [
      'Hotel accommodation (double/twin sharing)',
      'Private transport as per itinerary',
      'English-speaking guide',
      'Entrance fees for all mentioned sites',
      'Complimentary drinking water',
    ],
    exclusions: [
      'International & domestic flight tickets',
      'Meals not mentioned in the itinerary',
      'Personal expenses (laundry, souvenirs, drinks, etc.)',
      'Tipping for guides and drivers',
      'Travel insurance (highly recommended)',
      'Visa fees (if applicable)',
    ],
    hotels: [
      {
        area: 'Luang Prabang',
        classCategory: 'First Class (3*)',
        hotelNames: [
          'Sankeo Boutique & Spa Hotel – Classic (www.sanakeoboutiquelpb.com)',
          'OR',
          'Senglao Boutique Hotel – Classic',
        ],
      },
    ],
    optionalAddons: [
      'Sunset cruise',
      'Traditional Baci ceremony',
      'Luxury hotel upgrade',
    ],
    notes: [
      'Alms-giving ceremony can be arranged upon request (early morning).',
      'Itinerary may be adjusted due to weather or local conditions.',
      'Except Chinese New Year from 28 Jan to 03 Feb 2027 (surcharge may apply).',
    ],
  },

  // ==================== NEW PACKAGES ====================
  vang_vieng_adventure_day_trip: {
    id: 'vang_vieng_adventure_day_trip',
    title: 'VANG VIENG ADVENTURE DAY TRIP – FULL DAY',
    shortDescription: 'A perfect escape from Vientiane to explore dramatic limestone landscapes, caves, and lagoons in Vang Vieng.',
    duration: 'Full Day',
    destinations: 'Vang Vieng – Blue Lagoon – Angel Cave',
    highlights: [
      'Swim at Blue Lagoon 2',
      'Explore Angel Cave',
      'Scenic mountain views',
      'Optional kayaking',
    ],
    optionalAddons: ['Kayaking', 'Zipline', 'ATV ride'],
    images: [
      'https://images.unsplash.com/photo-1558121638-4712f0c8c9d9',
      'https://images.unsplash.com/photo-1539642932569-1e1352e48fe4',
      'https://images.unsplash.com/photo-1560185009-8e5c6ea8a5f7',
    ],
    days: [
      {
        day: 1,
        title: 'Full Day Trip',
        description: 'Morning: Depart Vientiane to Vang Vieng (approx. 2 hours). Midday: Visit Blue Lagoon, relax and swim. Afternoon: Explore Angel Cave, return to Vientiane.',
        meals: '',
        overnight: '',
      },
    ],
    rates: [
      {
        validity: '1 Jan 2026 – 30 Sep 2027',
        categories: [
          {
            name: 'Standard Package',
            prices: {
              pax1: 140,
              pax2: 95,
              pax3: 80,
              pax4: 80,
              pax5: 70,
              pax6: 70,
              ss: 30,
            },
          },
        ],
      },
    ],
    inclusions: [
      'Transport (round trip)',
      'English-speaking guide',
      'Entrance fees',
      'Complimentary drinking water',
    ],
    exclusions: [
      'Meals (lunch not included)',
      'Optional activities (kayaking, zipline, ATV)',
      // 'Personal expenses',
      // 'Travel insurance',
    ],
    hotels: [],
    notes: [
      'Optional kayaking, zipline, or ATV can be arranged at extra cost.',
      'Itinerary may change due to weather or road conditions.',
    ],
  },

  // Vientiane Capital Discovery – Full Day
  vientiane_capital_discovery: {
    id: 'vientiane_capital_discovery',
    title: 'VIENTIANE CAPITAL DISCOVERY – FULL DAY',
    shortDescription: 'Discover the peaceful charm of Vientiane with its temples, monuments, and riverside lifestyle.',
    duration: 'Full Day',
    destinations: 'Vientiane City – Buddha Park',
    highlights: [
      'Visit Pha That Luang',
      'Explore Patuxai',
      'Discover Buddha Park',
      'Mekong riverside sunset',
    ],
    optionalAddons: ['Sunset dinner by Mekong', 'Spa experience'],
    images: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
      'https://images.unsplash.com/photo-1528127269322-539801943592',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
    ],
    days: [
      {
        day: 1,
        title: 'Full Day City Tour',
        description: 'Morning: City tour including temples and Patuxai. Afternoon: Visit Buddha Park, return to city. Evening: Enjoy Mekong riverside sunset (optional).',
        meals: '',
        overnight: '',
      },
    ],
    rates: [
      {
        validity: '1 Jan 2026 – 30 Sep 2027',
        categories: [
          {
            name: 'Standard Package',
            prices: {
              pax1: 90,
              pax2: 65,
              pax3: 55,
              pax4: 55,
              pax5: 50,
              pax6: 50,
              ss: 20,
            },
          },
        ],
      },
    ],
    inclusions: [
      'Private transport',
      'English-speaking guide',
      'Entrance fees',
    ],
    exclusions: [
      'Meals (lunch not included)',
      'Personal expenses',
      'Travel insurance',
    ],
    hotels: [],
    notes: [
      'Sunset dinner by Mekong or spa experience can be arranged on request.',
    ],
  },

  // 🚆 Luang Prabang & Vang Vieng Explorer – 4 Days / 3 Nights
  luang_prabang_vang_vieng_explorer: {
    id: 'luang_prabang_vang_vieng_explorer',
    title: 'LUANG PRABANG & VANG VIENG EXPLORER – 4 DAYS / 3 NIGHTS',
    shortDescription: 'Combine culture and adventure with this multi‑destination journey across Laos’ most iconic destinations.',
    duration: '4 Days / 3 Nights',
    destinations: 'Vientiane – Vang Vieng – Luang Prabang',
    highlights: [
      'Laos‑China high‑speed train experience',
      'Vang Vieng adventure',
      'Luang Prabang heritage',
      'Kuang Si waterfall',
    ],
    optionalAddons: ['Hot air balloon', 'Luxury train seat upgrade'],
    images: [
      'https://images.unsplash.com/photo-1558121638-4712f0c8c9d9',
      'https://images.unsplash.com/photo-1539642932569-1e1352e48fe4',
      'https://images.unsplash.com/photo-1560185009-8e5c6ea8a5f7',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    ],
    days: [
      {
        day: 1,
        title: 'Vientiane → Vang Vieng',
        description: 'Pick up from Vientiane, transfer to Vang Vieng. Afternoon at leisure or explore the town.',
        meals: '',
        overnight: 'Vang Vieng',
      },
      {
        day: 2,
        title: 'Vang Vieng Exploration',
        description: 'Full day tour including Blue Lagoon, Angel Cave, and optional kayaking or hot air balloon.',
        meals: 'Breakfast',
        overnight: 'Vang Vieng',
      },
      {
        day: 3,
        title: 'Train to Luang Prabang + City Tour',
        description: 'Morning high‑speed train to Luang Prabang. Afternoon city tour of UNESCO temples and Mount Phousi.',
        meals: 'Breakfast',
        overnight: 'Luang Prabang',
      },
      {
        day: 4,
        title: 'Kuang Si Waterfall + Departure',
        description: 'Morning visit to Kuang Si Waterfall. Afternoon transfer to airport or train station.',
        meals: 'Breakfast',
        overnight: '',
      },
    ],
    rates: [
      {
        validity: '1 Jan 2026 – 30 Sep 2027',
        categories: [
          {
            name: 'Standard Package',
            prices: {
              pax1: 520,
              pax2: 390,
              pax3: 350,
              pax4: 350,
              pax5: 320,
              pax6: 320,
              ss: 120,
            },
          },
        ],
      },
    ],
    inclusions: [
      'High‑speed train tickets (Vientiane – Vang Vieng – Luang Prabang)',
      'Hotel accommodation (3 nights, twin/double share)',
      'Private transport',
      'English‑speaking guide',
      'Entrance fees',
    ],
    exclusions: [
      'International/domestic flights',
      'Meals not mentioned (lunch, dinner)',
      'Optional activities (hot air balloon, kayaking)',
      'Personal expenses',
      'Travel insurance',
    ],
    hotels: [
      {
        area: 'Vang Vieng',
        classCategory: 'First Class (3*)',
        hotelNames: ['Khamair Hotel – Deluxe', 'OR', 'Elephant Crossing Hotel – Deluxe'],
      },
      {
        area: 'Luang Prabang',
        classCategory: 'First Class (3*)',
        hotelNames: ['Sankeo Boutique & Spa Hotel – Classic', 'OR', 'Senglao Boutique Hotel – Classic'],
      },
    ],
    notes: [
      'Hot air balloon and luxury train upgrade available at extra cost.',
      'Itinerary may change due to train schedules or weather.',
      'Except Chinese New Year (surcharge may apply).',
    ],
  },

  // 🌊 Southern Laos & 4,000 Islands Escape – 4 Days / 3 Nights
  southern_laos_4000_islands_escape: {
    id: 'southern_laos_4000_islands_escape',
    title: 'SOUTHERN LAOS & 4,000 ISLANDS ESCAPE – 4 DAYS / 3 NIGHTS',
    shortDescription: 'Explore the untouched beauty of southern Laos, from waterfalls to island life in Si Phan Don.',
    duration: '4 Days / 3 Nights',
    destinations: 'Pakse – 4,000 Islands – Champasak',
    highlights: [
      'Visit Khone Phapheng Falls',
      'Relax on Don Khone Island',
      'Cycle through local villages',
      'Explore Mekong islands',
    ],
    optionalAddons: ['Coffee plantation tour', 'Kayaking'],
    images: [
      'https://images.unsplash.com/photo-1583417319070-4a69db38a482',
      'https://images.unsplash.com/photo-1528127269322-539801943592',
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a',
    ],
    days: [
      {
        day: 1,
        title: 'Arrival Pakse – Bolaven Plateau',
        description: 'Meet at Pakse airport. Transfer to Bolaven Plateau to visit coffee plantations and waterfalls. Overnight in Pakse.',
        meals: '',
        overnight: 'Pakse',
      },
      {
        day: 2,
        title: 'Transfer to 4,000 Islands',
        description: 'Morning drive to Si Phan Don (4,000 Islands). Afternoon boat trip to Don Khone Island. Explore old French railway and Li Phi Falls.',
        meals: 'Breakfast',
        overnight: 'Don Khone',
      },
      {
        day: 3,
        title: 'Island Exploration & Waterfalls',
        description: 'Cycle or hike around Don Khone, visit Khone Phapheng Falls (largest waterfall by volume in Southeast Asia). Relax by the Mekong.',
        meals: 'Breakfast',
        overnight: 'Don Khone',
      },
      {
        day: 4,
        title: 'Return to Pakse – Departure',
        description: 'Morning boat back to mainland, transfer to Pakse airport for departure.',
        meals: 'Breakfast',
        overnight: '',
      },
    ],
    rates: [
      {
        validity: '1 Jan 2026 – 30 Sep 2027',
        categories: [
          {
            name: 'Standard Package',
            prices: {
              pax1: 480,
              pax2: 350,
              pax3: 310,
              pax4: 310,
              pax5: 280,
              pax6: 280,
              ss: 95,
            },
          },
        ],
      },
    ],
    inclusions: [
      'Hotel accommodation (3 nights)',
      'Private transport (including airport transfers)',
      'English‑speaking guide',
      'Boat trips in Si Phan Don',
      'Entrance fees to waterfalls and islands',
    ],
    exclusions: [
      'International/domestic flights',
      'Meals not mentioned (lunch, dinner)',
      'Personal expenses',
      'Travel insurance',
      'Optional coffee plantation tour or kayaking',
    ],
    hotels: [
      {
        area: 'Pakse',
        classCategory: 'First Class (3*)',
        hotelNames: ['Pakse Hotel – Superior', 'OR', 'Champasak Grand Hotel'],
      },
      {
        area: 'Don Khone',
        classCategory: 'First Class (3*)',
        hotelNames: ['Sengahloune Resort – Bungalow', 'OR', 'Pon Arena Hotel – River View'],
      },
    ],
    notes: [
      'Best visited December–March (cool and dry).',
      'Coffee plantation tour (Bolaven Plateau) available as add‑on.',
      'Kayaking around Don Khone can be arranged.',
      'Except Lao New Year (April) and Chinese New Year – surcharge may apply.',
    ],
  },
};