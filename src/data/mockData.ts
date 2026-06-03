import type { PublicRecord, Landmark, TimelineEvent, EmergencyContact, ServiceCard, MayorHistory, BarangayHistory } from '../types';

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
    title: 'Present Day',
    description: 'With its pristine islands (Sombrero, Tinalisayan, Animasola) gaining national recognition, San Pascual emerges as Masbate\'s leading eco-tourism frontier, balancing transparency, conservation, and growth.'
  }
];

export const MAYOR_HISTORY: MayorHistory[] = [
  {
    id: 'm1',
    name: 'Hon. Zacarina "Saki" A. Lazaro',
    term: '2025–Present & 2022–2025 (Also served 2010–2019)',
    status: 'Incumbent',
    biography: 'A seasoned public administrator who has championed local governance, social protection programs, and infrastructure modernization across San Pascual. Under her leadership, the town has embraced digital transparency and ecological tourism development.',
    accomplishments: [
      'Pioneered the annual Isla Rancho Festival to promote municipal culture, cattle ranching, and local tourism.',
      'Modernized the Municipal Health Center with upgraded diagnostics and 24/7 ambulance coordination.',
      'Established protected marine sanctuaries around Sombrero, Tinalisayan, and Animasola Islands.'
    ],
    milestones: [
      'Spearheaded the formulation of the Coconut Productivity and Rehabilitation Assistance Program.',
      'Secured national recognition for San Pascual as Burias Island\'s primary eco-tourism frontier.'
    ]
  },
  {
    id: 'm2',
    name: 'Hon. Niño Maximino A. Lazaro',
    term: '2019–2022',
    status: 'Past',
    biography: 'Known for his focus on public safety, disaster resiliency, and road networks, he guided the municipality through major typhoons and managed the local economic relief initiatives during national health crises.',
    accomplishments: [
      'Completed major phases of the Burias Island circumferential road network, connecting remote coastal barangays to the main port.',
      'Constructed the San Pascual Municipal Gymnasium and central evacuation center.',
      'Initiated partnerships with the Bureau of Fire Protection (BFP) to secure modern emergency response equipment.'
    ],
    milestones: [
      'Enacted the weekly coastal clean-up and local mangrove reforestation mandate across all 22 barangays.',
      'Established the El Niño Response Task Force to support upland livestock and crop farms.'
    ]
  },
  {
    id: 'm3',
    name: 'Hon. Clemente "Nonoy" Aguilar Arguelles, Jr.',
    term: '2004–2010',
    status: 'Past',
    biography: 'A leader focused on economic expansion and rural development. He concentrated on expanding rural electrification, supporting agricultural cooperatives, and upgrading the town\'s trading ports.',
    accomplishments: [
      'Expanded the Poblacion Public Market and established structured copra trading zones.',
      'Successfully completed the Rural Electrification Project, bringing electricity to 18 out of 22 barangays.',
      'Built the San Pascual Municipal Passenger Pier to improve shipping links with mainland Bicol.'
    ],
    milestones: [
      'Formulated the Burias Island Coral and Marine Habitat Protection Ordinance.',
      'Co-founded the San Pascual Cattle Breeders Cooperative to stabilize livestock prices.'
    ]
  },
  {
    id: 'm4',
    name: 'Hon. Clemente "Melong" Arnaldo Arguelles, Sr.',
    term: '1992–2004',
    status: 'Past',
    biography: 'One of the longest-serving mayors of the post-dictatorship era. He laid the administrative foundations of modern San Pascual, focusing on public education, land zoning, and municipal healthcare.',
    accomplishments: [
      'Established the first Municipal Hospital Ward in San Pascual, providing local surgery and maternity care.',
      'Created the Municipal High School Scholarship program for indigent students in upland barangays.',
      'Formalized municipal revenue tariffs on commercial copra exports, stabilizing the local treasury.'
    ],
    milestones: [
      'Hosted the historic 400th anniversary celebration of the Parish of Saint Paschal Baylon (1986, as civic leader).',
      'Acquired the municipal government\'s first heavy earth-moving equipment for road maintenance.'
    ]
  },
  {
    id: 'm5',
    name: 'Hon. Estanislao B. Valdemoro',
    term: '1986–1992',
    status: 'Past',
    biography: 'Appointed as Officer-in-Charge following the 1986 EDSA Revolution and subsequently elected to a full term. He focused on democratic transition, agrarian reform support, and agricultural rehabilitation after severe typhoons.',
    accomplishments: [
      'Reorganized the local civil service to enhance transparency and responsiveness.',
      'Facilitated the distribution of agricultural land packages to local tenant farmers in coordination with national agencies.',
      'Established the first municipal-wide Farmers and Fisherfolk Cooperative Union.'
    ],
    milestones: [
      'Drafted the original Municipal Land Use and Zoning Plan for Poblacion.',
      'Successfully cleared municipal shipping channels after the devastating Typhoon Sisang (1987).'
    ]
  },
  {
    id: 'm6',
    name: 'Hon. Honorato M. Lazaro',
    term: '1972–1986',
    status: 'Past',
    biography: 'An influential leader of the mid-20th century who oversaw the early layout of Poblacion, the construction of key primary schools, and the establishment of the copra trade routes to Quezon and Masbate City.',
    accomplishments: [
      'Constructed the historic San Pascual Municipal Hall building in Poblacion.',
      'Established primary schools in 12 remote barangays, dramatically improving local literacy rates.',
      'Constructed the town\'s first solar-powered coconut drying facility (copra dryer) for small farmers.'
    ],
    milestones: [
      'Enacted the municipal ordinance declaring the historical Parish of Saint Paschal Baylon site as a protected heritage zone.'
    ]
  }
];

export const BARANGAY_HISTORY: BarangayHistory[] = [
  {
    id: 'b1',
    name: 'Bolod (Poblacion)',
    captain: 'Hon. Ruben G. Padilla',
    termStart: '2023',
    history: 'The name Bolod comes from "burol" (hill), as the Poblacion sits on a slightly elevated plain overlooking the harbor. Serving as the town center, it is the historic site where Spanish missionaries founded the Parish of Saint Paschal Baylon in 1586, making it one of the oldest settlements in Bicol and Masbate.',
    livelihood: ['Commercial Trade', 'Public Services', 'Small-Scale Fishing'],
    population: '3,626',
    pastCaptains: ['Hon. Clemente Arguelles III', 'Hon. Jose Lazaro', 'Hon. Felipa Alindogan'],
    coastal: true
  },
  {
    id: 'b2',
    name: 'Boca Chica',
    captain: 'Hon. Henry A. Arcenal',
    termStart: '2023',
    history: 'Boca Chica translates to "small mouth" in Spanish, describing the narrow water passage between the Burias mainland and the offshore reefs. It was historically a vital lookout station against coastal raiders and is now a thriving community of fishermen and boat builders.',
    livelihood: ['Artisanal Fishing', 'Copra Production', 'Wooden Boatbuilding'],
    population: '2,756',
    pastCaptains: ['Hon. Juan Rivera', 'Hon. Ramon Santos'],
    coastal: true
  },
  {
    id: 'b3',
    name: 'Busing',
    captain: 'Hon. Rizalie P. Velasco',
    termStart: '2023',
    history: 'Named after the native "busing" reed that once choked the local creek. Settled in the early 20th century by farmers attracted to its fertile soil, Busing has remained San Pascual\'s agricultural heartland, supplying rice and coconuts to the rest of the island.',
    livelihood: ['Lowland Farming', 'Cattle Grazing', 'Copra Processing'],
    population: '1,886',
    pastCaptains: ['Hon. Manuel Busing', 'Hon. Clara Lopez'],
    coastal: false
  },
  {
    id: 'b4',
    name: 'Cueva',
    captain: 'Hon. Consuelo B. Zaldua',
    termStart: '2023',
    history: 'Famous for the limestone caverns ("cuevas") scattered throughout its rugged hills. Archeological findings suggest these caves were used by pre-colonial islanders. During World War II, the caves served as a crucial hideout for local anti-occupation guerilla forces.',
    livelihood: ['Copra Production', 'Corn Farming', 'Cave Ecotourism'],
    population: '2,788',
    pastCaptains: ['Hon. Pedro Cueva', 'Hon. Anita De Guzman'],
    coastal: false
  },
  {
    id: 'b5',
    name: 'Dangcalan',
    captain: 'Hon. Marcos M. Mandawe Jr.',
    termStart: '2023',
    history: 'Dangcalan is named after the native Bitaog (Dangcalan) trees that grow along its sandy shores. The tough wood of these trees was historically prized by locals for building sturdy hulls for sea-going bangkas.',
    livelihood: ['Coastal Fishing', 'Copra Production', 'Seaweed Farming'],
    population: '1,430',
    pastCaptains: ['Hon. Salvador Perez', 'Hon. Gregoria Reyes'],
    coastal: true
  },
  {
    id: 'b6',
    name: 'Halabangbaybay',
    captain: 'Hon. Adora B. Ygot',
    termStart: '2023',
    history: 'In the local Bicol-Masbateño language, Halabangbaybay means "long beach," referencing the wide 2-kilometer stretch of white sand lining the barangay. It has evolved from a quiet coconut grove into a popular gateway for visiting tourists.',
    livelihood: ['Cottage Tourism', 'Coastal Fishing', 'Coconut Cultivation'],
    population: '1,150',
    pastCaptains: ['Hon. Victorio Alindogan', 'Hon. Josefa Ramos'],
    coastal: true
  },
  {
    id: 'b7',
    name: 'Iniwaran',
    captain: 'Hon. Salvador Q. Dadua',
    termStart: '2023',
    history: 'Derived from "iniwar" (isolated), as this barangay was cut off from the main town center for generations by dense jungle and hills. The construction of the municipal road system in the early 2000s opened it up to rapid agricultural growth.',
    livelihood: ['Upland Rice Farming', 'Cattle Ranching', 'Root Crop Production'],
    population: '2,360',
    pastCaptains: ['Hon. Alejandro Gomez', 'Hon. Roberto Tan'],
    coastal: false
  },
  {
    id: 'b8',
    name: 'Ki-Buaya (Rizal)',
    captain: 'Hon. Joeper B. Corporal',
    termStart: '2023',
    history: 'Originally named Ki-Buaya due to the large crocodiles that inhabited its extensive mangrove swamps in the 1800s. It was later renamed Rizal to honor the national hero, but the community proudly retains its historical identity in local folk tales.',
    livelihood: ['Mangrove Crab Harvesting', 'Small-scale Agriculture', 'Estuary Fishing'],
    population: '846',
    pastCaptains: ['Hon. Felix Castillo', 'Hon. Leonora Diaz'],
    coastal: true
  },
  {
    id: 'b9',
    name: 'Ki-Romero (Roxas)',
    captain: 'Hon. Rafaelito O. Dagohoy, Sr.',
    termStart: '2023',
    history: 'Named after Romero, an early cattle rancher who held land here in the early American colonial era. Renamed Roxas after President Manuel Roxas, the barangay continues to showcase a strong cowboy culture with wide-open grazing lands.',
    livelihood: ['Cattle Herding', 'Copra Production', 'Livestock Trading'],
    population: '1,487',
    pastCaptains: ['Hon. Eduardo Fernandez', 'Hon. Maria Romero'],
    coastal: false
  },
  {
    id: 'b10',
    name: 'Laurente',
    captain: 'Hon. Mary Anne M. Quibot',
    termStart: '2023',
    history: 'Named after Capitan Laurente, a late-19th-century tribal leader who moved his clan inland to avoid coastal pirate raids. Laurente has remained a peaceful upland agricultural community ever since.',
    livelihood: ['Copra Production', 'Root Crops', 'Corn Farming'],
    population: '2,752',
    pastCaptains: ['Hon. Mateo Ramirez', 'Hon. Fe Valenzuela'],
    coastal: false
  },
  {
    id: 'b11',
    name: 'Mabini',
    captain: 'Hon. Felipe M. Dela Peña',
    termStart: '2023',
    history: 'Established in the mid-20th century during a wave of agricultural expansion on Burias Island. Named after Apolinario Mabini, the barangay is characterized by rolling hills used primarily for pasture.',
    livelihood: ['Cattle Ranching', 'Upland Corn Farming', 'Copra Processing'],
    population: '1,779',
    pastCaptains: ['Hon. Alfonso Santos', 'Hon. Patricia Cruz'],
    coastal: false
  },
  {
    id: 'b12',
    name: 'Mabuhay',
    captain: 'Hon. Marisol B. Espares',
    termStart: '2023',
    history: 'Established as a settlement area in the 1950s for migrants from the Bicol mainland seeking farm land. The name reflects the settlers\' hope for a prosperous life. Today, it hosts several thriving agricultural cooperatives.',
    livelihood: ['Copra Production', 'Poultry Farming', 'Upland Rice'],
    population: '1,410',
    pastCaptains: ['Hon. Juan Almonte', 'Hon. Josefina Belen'],
    coastal: false
  },
  {
    id: 'b13',
    name: 'Malaking Ilog',
    captain: 'Hon. Celso M. Dagohoy',
    termStart: '2023',
    history: 'Named after the Malaking Ilog River, the widest freshwater river on Burias Island. The river has historically provided irrigation for the town\'s most extensive rice paddies, making this barangay the rice granary of San Pascual.',
    livelihood: ['Lowland Rice Farming', 'River Fishing', 'Copra Production'],
    population: '1,911',
    pastCaptains: ['Hon. Andres Cruz', 'Hon. Roberto Espinas'],
    coastal: true
  },
  {
    id: 'b14',
    name: 'Mapanique',
    captain: 'Hon. Manilou G. Hermosa',
    termStart: '2023',
    history: 'Derived from "paniki" (bats), as the dense limestone forests surrounding this coastal area host thousands of fruit bats. These bats are historically celebrated for maintaining the island\'s lush fruit orchards and ecosystems.',
    livelihood: ['Coastal Fishing', 'Fruit Orchards', 'Copra Farming'],
    population: '1,984',
    pastCaptains: ['Hon. Cesar Castro', 'Hon. Angela Santos'],
    coastal: true
  },
  {
    id: 'b15',
    name: 'Nazareno',
    captain: 'Hon. Maria Patropez Villanueva',
    termStart: '2023',
    history: 'Founded by Catholic fishermen who built a chapel dedicated to the Black Nazarene. The community is famous for its traditional fish drying (tuyo and tinapa), supplying preserved fish to interior island barangays.',
    livelihood: ['Fish Drying', 'Coastal Fishing', 'Salt Harvesting'],
    population: '1,298',
    pastCaptains: ['Hon. Ernesto Hernandez', 'Hon. Clara Lopez'],
    coastal: true
  },
  {
    id: 'b16',
    name: 'Pinamasingan',
    captain: 'Hon. Cresencio M. Villaganas',
    termStart: '2023',
    history: 'Named after the local word "pasingan" (sharpening stone). Historically, fishermen and coastal guards gathered on its gravel beaches to sharpen their tools and bolos using the specialized dark river stones.',
    livelihood: ['Artisanal Fishing', 'Copra Production', 'Pebble and Gravel Trade'],
    population: '2,005',
    pastCaptains: ['Hon. Gregorio Aquino', 'Hon. Anita Robles'],
    coastal: true
  },
  {
    id: 'b17',
    name: 'Quintina',
    captain: 'Hon. Vicente B. Combate',
    termStart: '2023',
    history: 'Named in honor of Dona Quintina, a historical Spanish-era landowner who donated large parcels of land to tenant coconut farmers in the early 1900s, fostering a strong community spirit that persists today.',
    livelihood: ['Coconut Cultivation', 'Agricultural Cooperatives', 'Vegetable Farming'],
    population: '1,637',
    pastCaptains: ['Hon. Miguel Barlizo', 'Hon. Sonia Velez'],
    coastal: false
  },
  {
    id: 'b18',
    name: 'San Jose',
    captain: 'Hon. Retchel C. Del Rosario',
    termStart: '2023',
    history: 'Named after Saint Joseph, the patron of workers. Established in the early 20th century as a trading crossroad, it serves as the main connection point between the upland farms and the Poblacion shipping ports.',
    livelihood: ['Vegetable Cultivation', 'Pig Farming', 'Copra Trading'],
    population: '1,409',
    pastCaptains: ['Hon. Santiago Vargas', 'Hon. Elena Castillo'],
    coastal: false
  },
  {
    id: 'b19',
    name: 'San Pedro',
    captain: 'Hon. Ricardo Y. Bulanon',
    termStart: '2023',
    history: 'Named after Saint Peter, patron of fishermen. San Pedro has historically been the busiest commercial fishing community in San Pascual, containing a large fleet of traditional motorized fishing vessels.',
    livelihood: ['Commercial Fishing', 'Inter-island Shipping', 'Boat Maintenance'],
    population: '3,232',
    pastCaptains: ['Hon. Jose Lazaro Sr.', 'Hon. Ruben De Leon'],
    coastal: true
  },
  {
    id: 'b20',
    name: 'San Rafael',
    captain: 'Hon. Regino Auman Jr.',
    termStart: '2023',
    history: 'A picturesque upland barangay dedicated to Saint Raphael. Its open, wind-swept hills have historically been some of the most productive cattle ranching areas on Burias Island.',
    livelihood: ['Cattle Ranching', 'Upland Corn Farming', 'Copra Production'],
    population: '3,140',
    pastCaptains: ['Hon. Felipe Lopez', 'Hon. Maria Elena Gomez'],
    coastal: false
  },
  {
    id: 'b21',
    name: 'Santa Cruz',
    captain: 'Hon. Gregorio T. Escarlan',
    termStart: '2023',
    history: 'Named after the Holy Cross. Historically vulnerable to typhoon surges, the residents banded together in the 1980s to plant a massive mangrove forest, which now serves as an award-winning ecological protection zone.',
    livelihood: ['Mangrove Crabbing', 'Eco-tourism Services', 'Copra Production'],
    population: '1,945',
    pastCaptains: ['Hon. Jose Dela Rosa', 'Hon. Teresa Ramos'],
    coastal: true
  },
  {
    id: 'b22',
    name: 'Terraplin',
    captain: 'Hon. Arnold R. Ortega Jr.',
    termStart: '2023',
    history: 'Derived from the Spanish "terraplén" (embankment), named after the ancient stone seawall constructed by Spanish authorities and local volunteers to protect the low-lying agricultural plains from salt-water intrusion.',
    livelihood: ['Salt Bed Harvesting', 'Coastal Fishing', 'Coconut Cultivation'],
    population: '1,618',
    pastCaptains: ['Hon. Ricardo Salazar', 'Hon. Gloria Hernandez'],
    coastal: true
  }
];
