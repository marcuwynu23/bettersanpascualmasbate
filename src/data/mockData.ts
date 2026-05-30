import type { PublicRecord, Landmark, TimelineEvent, EmergencyContact, ServiceCard } from '../types';

export const CITY_STATS = {
  population: '44,641',
  populationYear: '2024',
  barangays: '22',
  craterLakes: '0', // San Pablo has lakes, San Pascual has islands!
  islandsCount: '3 Major Islands',
  foundedYear: '1586',
  location: 'Burias Island, Masbate',
  capitalTitle: 'Cattle Ranching Capital'
};

export const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    id: '1',
    agency: 'MDRRMO San Pascual',
    number: '0910-356-4146',
    description: 'Municipal Disaster Risk Reduction & Management Office (Primary Contact)',
    icon: 'ShieldAlert',
    type: 'Local'
  },
  {
    id: '2',
    agency: 'San Pascual Municipal Police Station',
    number: '0998-598-6085',
    description: 'Philippine National Police (PNP) Local Station',
    icon: 'PhoneCall',
    type: 'Local'
  },
  {
    id: '3',
    agency: 'San Pascual Fire Station',
    number: '0917-882-3432',
    description: 'Bureau of Fire Protection (BFP) Local Station',
    icon: 'Flame',
    type: 'Local'
  },
  {
    id: '4',
    agency: 'San Pascual District Hospital',
    number: '0930-441-2894',
    description: 'Emergency Medical Services and Admission',
    icon: 'Activity',
    type: 'Local'
  },
  {
    id: '5',
    agency: 'National Emergency Hotline',
    number: '911',
    description: 'National Centralized Emergency Dispatch',
    icon: 'Radio',
    type: 'National'
  }
];

export const SERVICE_CARDS: ServiceCard[] = [
  {
    id: 's1',
    title: 'Rural Health Unit & Wellness',
    description: 'Primary healthcare services, maternal health, immunization programs, and free basic medicine distribution.',
    sector: 'Health',
    icon: 'Heart',
    details: [
      'Daily medical consultations and basic diagnostics',
      'Childhood immunization and nutritional assistance',
      'Free maintenance medicine programs for seniors',
      '24/7 emergency ambulance coordination'
    ]
  },
  {
    id: 's2',
    title: 'Burias Island Educational Portal',
    description: 'Supporting public elementary and secondary schools in San Pascual, and scholarship assistance programs.',
    sector: 'Education',
    icon: 'BookOpen',
    details: [
      'LGU Scholarship Grants for college-bound residents',
      'Distribution of free school supplies and uniforms',
      'Local library and study centers in Poblacion',
      'ALS (Alternative Learning System) support'
    ]
  },
  {
    id: 's3',
    title: 'Business & Business Permits (BPLO)',
    description: 'One-stop shop for local entrepreneurs, business registration, permit renewals, and tourism registrations.',
    sector: 'Business',
    icon: 'Briefcase',
    details: [
      'Simplified Business Permit and Licensing System (BPLS)',
      'Tourism business accreditation and compliance',
      'Local farmer and fisherfolk enterprise permits',
      'Micro-finance and cooperative support seminars'
    ]
  },
  {
    id: 's4',
    title: 'Social Welfare & Development (MSWD)',
    description: 'Direct assistance to marginalized sectors, senior citizens, PWDs, and family planning resources.',
    sector: 'Social Welfare',
    icon: 'Users',
    details: [
      'Social Pension distribution for indigent senior citizens',
      'PWD identification cards and accessibility benefits',
      'Pantawid Pamilyang Pilipino Program (4Ps) assistance',
      'Crisis intervention and emergency cash assistance'
    ]
  },
  {
    id: 's5',
    title: 'Agriculture, Fisheries & Tourism Office',
    description: 'Empowering the farming, cattle ranching, fishing communities, and managing Burias Island tourism.',
    sector: 'Agriculture & Tourism',
    icon: 'Compass',
    details: [
      'Free distribution of high-yield coconut seedlings',
      'Fisherfolk boat registration and fuel subsidies',
      'Livestock vaccination and cattle management support',
      'Registration and safety briefings for island hopping tours'
    ]
  }
];

export const PUBLIC_RECORDS: PublicRecord[] = [
  {
    id: 'rec-1',
    title: 'Ordinance Regulating Marine Tourism and Island Hopping Activities in Sombrero, Tinalisayan, and Animasola Islands',
    number: 'Ordinance No. 2024-18',
    category: 'Ordinance',
    date: '2024-03-12',
    summary: 'Establishes safety standards, ecological fees, tour guide certification, and carrying capacity regulations for tourist boats visiting key island attractions in San Pascual to preserve the marine environment.',
    status: 'Enacted',
    fileSize: '1.4 MB'
  },
  {
    id: 'rec-2',
    title: 'Annual General Fund and Executive Budget of the Municipality of San Pascual for Fiscal Year 2025',
    number: 'Budget Resolution No. 2024-45',
    category: 'Annual Budget',
    date: '2024-11-20',
    summary: 'Allocation of the local municipal budget of PHP 185 million, prioritizing agricultural subsidies (coconut & cattle), municipal health center upgrades, road networks, and eco-tourism infrastructure development.',
    status: 'Approved',
    fileSize: '4.8 MB'
  },
  {
    id: 'rec-3',
    title: 'Resolution Commending the Organizers and Participants of the Isla Rancho Festival for Successful Cultural Preservation',
    number: 'Resolution No. 2025-08',
    category: 'Resolution',
    date: '2025-05-22',
    summary: 'Official commendation by the Sangguniang Bayan to all barangay contingents for showcasing the traditional ranching and coconut culture during the annual festival.',
    status: 'Approved',
    fileSize: '820 KB'
  },
  {
    id: 'rec-4',
    title: 'Executive Order Mandating All Barangays to Formulate Local Mangrove Reforestation and Coastal Clean-up Protocols',
    number: 'Executive Order No. 2024-05',
    category: 'Executive Order',
    date: '2024-02-15',
    summary: 'Directs the 22 barangays of San Pascual to establish weekly coastal cleanups and map out municipal mangrove preservation zones to combat typhoon storm surges.',
    status: 'Active',
    fileSize: '1.1 MB'
  },
  {
    id: 'rec-5',
    title: 'Ordinance Institutionalizing the Coconut Productivity and Rehabilitation Assistance Program',
    number: 'Ordinance No. 2023-11',
    category: 'Ordinance',
    date: '2023-08-05',
    summary: 'Provides local funding for the distribution of dwarf coconut varieties to smallholder farmers and offers training on copra processing optimization.',
    status: 'Enacted',
    fileSize: '2.1 MB'
  },
  {
    id: 'rec-6',
    title: 'Resolution Authorizing the Mayor to Sign a Memorandum of Agreement with the BFP for a Brand New Fire Truck Allocation',
    number: 'Resolution No. 2024-12',
    category: 'Resolution',
    date: '2024-04-18',
    summary: 'Approves the partnership to acquire a modern fire engine suited for the coastal terrain of Burias Island, stationed at Poblacion, San Pascual.',
    status: 'Approved',
    fileSize: '950 KB'
  },
  {
    id: 'rec-7',
    title: 'Executive Order Activating the El Niño Response Task Force and Emergency Drought Assistance Fund',
    number: 'Executive Order No. 2025-02',
    category: 'Executive Order',
    date: '2025-03-01',
    summary: 'Allocates resources to deliver water supplies to cattle ranches and upland vegetable farms experiencing severe lack of rainfall.',
    status: 'Active',
    fileSize: '1.2 MB'
  }
];

export const LANDMARKS: Landmark[] = [
  {
    id: 'l1',
    name: 'Sombrero Island',
    description: 'San Pascual\'s crown jewel, this uninhabited island is named for its unique hat-like limestone rock formation. It boasts powdery white sand beaches and crystal-clear turquoise waters teeming with diverse marine life.',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', // Beautiful generic tropical beach
    location: 'Offshore Northern Burias Island',
    category: 'Nature'
  },
  {
    id: 'l2',
    name: 'Tinalisayan Island and Sandbar',
    description: 'Famous for its long, winding sandbar that disappears and reappears with the tides. The island features striking rust-colored sandstone cliffs that provide a dramatic contrast with the surrounding crystal waters.',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80', // Tropical sandbar
    location: '15 mins boat ride from Sombrero Island',
    category: 'Adventure'
  },
  {
    id: 'l3',
    name: 'Animasola Island',
    description: 'An geological wonder featuring breathtaking monolithic rock formations with horizontal layers of ancient sedimentary stone. Natural tidal pools offer a serene place to swim and marvel at the raw beauty of nature.',
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80', // Striking rocks
    location: 'East Coast of San Pascual',
    category: 'Nature'
  },
  {
    id: 'l4',
    name: 'San Pascual Baylon Parish Church',
    description: 'A historic church considered one of the oldest in Bicol and Masbate, founded during the Spanish Galleon era in 1586. It stands as a spiritual anchor for the town and has withstood centuries of typhoons and pirate raids.',
    imageUrl: 'https://images.unsplash.com/photo-1548625361-155de6c7f5f8?auto=format&fit=crop&w=800&q=80', // Spanish old building/church look
    location: 'Poblacion, San Pascual',
    category: 'Historical'
  },
  {
    id: 'l5',
    name: 'The Swiftlet House (Balinsasayaw)',
    description: 'A fascinating structure that is home to approximately 80,000 swiftlets (locally known as balinsasayaw). The birds reside in harmony inside the house, creating a unique urban ecological phenomenon where nests are protected.',
    imageUrl: 'https://images.unsplash.com/photo-1552084117-56a987666449?auto=format&fit=crop&w=800&q=80', // Nature sanctuary
    location: 'Poblacion, San Pascual',
    category: 'Cultural'
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't1',
    year: '16th Century',
    title: 'Spanish Galleon Harbor Established',
    description: 'Due to its deep and protected bay, Spanish naval expeditions establish San Pascual (then known as a harbor of Burias Island) as a critical shelter and supply stop for ships sailing across the Pacific.'
  },
  {
    id: 't2',
    year: '1586',
    title: 'Parish Foundation',
    description: 'Missionaries officially establish the Parish of Saint Paschal Baylon. The patron saint is chosen as a protector against sea-borne pirate raids, and a coral stone chapel is erected.'
  },
  {
    id: 't3',
    year: '1911',
    title: 'Municipal Building Built',
    description: 'Under the American colonial administration, the historic Municipal Hall of San Pascual is constructed in Poblacion, establishing it as the center of civil governance for northern Burias Island.'
  },
  {
    id: 't4',
    year: '1980s',
    title: 'The Cattle and Copra Boom',
    description: 'San Pascual undergoes rapid agricultural development, establishing itself as a premier cattle ranching hub and a major source of copra (dried coconut) in the Bicol region.'
  },
  {
    id: 't5',
    year: '2015',
    title: 'Inauguration of Isla Rancho Festival',
    description: 'The local government officially inaugurates the Isla Rancho Festival, a week-long socio-cultural festival held every May that honors St. Paschal Baylon and celebrates the island\'s unique cowboy/ranching heritage.'
  },
  {
    id: 't6',
    year: 'Present Day',
    title: 'Eco-Tourism Frontier',
    description: 'With its pristine islands (Sombrero, Tinalisayan, Animasola) gaining national recognition, San Pascual emerges as Masbate\'s leading eco-tourism frontier, balancing transparency, conservation, and growth.'
  }
];
