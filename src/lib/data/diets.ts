// Diet data and types for the diets section
// Sources: NIDDK, NIH, Academia de Nutrición y Dietética, FACE, SciELO, MedlinePlus

import VeganoSvg from "@assets/vegano.svg"
import VegetarianoSvg from "@assets/vegetariano.svg"
import SinLactosaSvg from "@assets/sin_lactosa.svg"
import OrganicoSvg from "@assets/organico.svg"
import SinAzucarSvg from "@assets/sin_azucar.svg"
import PaleoSvg from "@assets/paleo.svg"
import SinGlutenSvg from "@assets/sin_gluten.svg"
import KetoSvg from "@assets/keto.svg"

export interface DietInfo {
  id: string
  name: string
  slug: string
  tag: string
  icon: any
  brushColor: string
  shortDescription: string
  fullDescription: string
  benefits: string[]
  considerations: string[]
  tips: string[]
  allowedFoods: string[]
  avoidFoods: string[]
}

export const DIETS_DATA: DietInfo[] = [
  {
    id: "vegano",
    name: "Vegano",
    slug: "vegano",
    tag: "vegano",
    icon: VeganoSvg,
    brushColor: "#4ade80",
    shortDescription: "Alimentación 100% basada en plantas, sin ningún producto de origen animal.",
    fullDescription: "La dieta vegana excluye todos los productos de origen animal, incluyendo carne, pescado, lácteos, huevos y miel. Según estudios publicados en revistas científicas como SciELO, esta dieta se asocia con menor riesgo de enfermedades cardiovasculares, obesidad, diabetes mellitus tipo 2 e hipertensión arterial. Un análisis de más de 20 años de investigación (2024) encontró que reduce significativamente el riesgo de cáncer y enfermedades cardíacas.",
    benefits: [
      "Menor riesgo de enfermedades cardiovasculares según múltiples estudios",
      "Asociada con reducción de obesidad y diabetes tipo 2",
      "Menor riesgo de ciertos tipos de cáncer (colon, próstata, hígado)",
      "Rica en fibra, antioxidantes y compuestos vegetales beneficiosos",
      "Menor impacto ambiental y huella de carbono"
    ],
    considerations: [
      "Requiere planificación para evitar deficiencias nutricionales",
      "Posible deficiencia de vitamina B12, hierro, zinc, calcio y vitamina D",
      "Según Mayo Clinic, pueden ser necesarios suplementos de B12 y otros nutrientes",
      "Mayor riesgo de fracturas si no se asegura ingesta adecuada de calcio",
      "Consultar con profesional de nutrición para optimizar la dieta"
    ],
    tips: [
      "Suplementar vitamina B12, ya que no está disponible en plantas",
      "Combinar legumbres con cereales para obtener aminoácidos completos",
      "Incluir fuentes de omega-3 como semillas de chía, lino y nueces",
      "Consumir alimentos ricos en hierro (legumbres, espinacas) con vitamina C para mejorar absorción"
    ],
    allowedFoods: [
      "Frutas y verduras de todo tipo",
      "Legumbres (lentejas, garbanzos, frijoles, soja)",
      "Cereales integrales (arroz, quinoa, avena)",
      "Frutos secos y semillas",
      "Tofu, tempeh y proteínas vegetales",
      "Leches y yogures vegetales fortificados"
    ],
    avoidFoods: [
      "Carnes rojas y blancas",
      "Pescados y mariscos",
      "Lácteos (leche, queso, yogur)",
      "Huevos",
      "Miel y derivados de abejas",
      "Gelatina de origen animal"
    ]
  },
  {
    id: "vegetariano",
    name: "Vegetariano",
    slug: "vegetariano",
    tag: "vegetariano",
    icon: VegetarianoSvg,
    brushColor: "#bef264",
    shortDescription: "Dieta sin carne ni pescado, pero que puede incluir lácteos y huevos.",
    fullDescription: "La dieta vegetariana excluye la carne, el pescado y los mariscos, pero permite productos derivados de animales como lácteos, huevos y miel. Según el análisis de CNN (2024) de más de 20 años de investigación, seguir una dieta lacto-ovo vegetariana reduce significativamente el riesgo de desarrollar cáncer, enfermedades del corazón y muerte prematura. Es una opción más flexible que facilita obtener nutrientes esenciales.",
    benefits: [
      "Reduce factores de riesgo cardiovascular según estudios científicos",
      "Menor riesgo de hipertensión y niveles de colesterol elevado",
      "Efecto protector contra varios tipos de cáncer",
      "Más fácil de seguir que la dieta vegana estricta",
      "Menor riesgo de deficiencias nutricionales que el veganismo"
    ],
    considerations: [
      "Importante variar las fuentes de proteína",
      "El hierro de origen vegetal se absorbe menos que el de origen animal",
      "Posible necesidad de suplementar B12 en dietas ovo-vegetarianas",
      "Vigilar el consumo de grasas saturadas si se consumen muchos lácteos"
    ],
    tips: [
      "Varía tus fuentes de proteína entre lácteos, huevos y legumbres",
      "Incluye granos integrales en cada comida para fibra y nutrientes",
      "Consume hierro vegetal (espinacas, legumbres) con vitamina C",
      "Los huevos son excelente fuente de B12, colina y proteína completa"
    ],
    allowedFoods: [
      "Frutas y verduras de todo tipo",
      "Lácteos (leche, queso, yogur)",
      "Huevos",
      "Legumbres y frutos secos",
      "Cereales y granos integrales",
      "Miel"
    ],
    avoidFoods: [
      "Carne roja (res, cerdo, cordero)",
      "Aves (pollo, pavo)",
      "Pescado y mariscos",
      "Productos con gelatina animal",
      "Caldos de carne"
    ]
  },
  {
    id: "sin-lactosa",
    name: "Sin Lactosa",
    slug: "sin-lactosa",
    tag: "sin-lactosa",
    icon: SinLactosaSvg,
    brushColor: "#fbcfe8",
    shortDescription: "Libre de lactosa, ideal para personas con intolerancia a este azúcar.",
    fullDescription: "Una dieta sin lactosa es necesaria para personas con intolerancia a la lactosa, una condición en la que el cuerpo no produce suficiente lactasa, la enzima que digiere el azúcar de la leche. Según MedlinePlus, esta condición afecta a aproximadamente el 65% de la población mundial adulta, siendo más común en personas de ascendencia asiática, africana y latinoamericana. Evitar la lactosa elimina síntomas como hinchazón, gases, diarrea y dolor abdominal.",
    benefits: [
      "Elimina síntomas digestivos como hinchazón, gases y diarrea",
      "Mejora la calidad de vida en personas intolerantes",
      "Permite mejor absorción de otros nutrientes",
      "Amplia variedad de alternativas disponibles actualmente",
      "No requiere eliminar todos los lácteos, solo los que contienen lactosa"
    ],
    considerations: [
      "Es diferente a la alergia a la proteína de la leche",
      "Algunos pueden tolerar pequeñas cantidades de lactosa",
      "Los quesos muy curados suelen tener menos lactosa",
      "Importante asegurar ingesta adecuada de calcio y vitamina D"
    ],
    tips: [
      "Lee las etiquetas: lactosa, suero de leche, cuajada y sólidos lácteos contienen lactosa",
      "Los quesos curados (parmesano, cheddar añejo) tienen muy poca lactosa",
      "Las leches vegetales fortificadas aportan calcio equivalente",
      "Los yogures con probióticos activos pueden ser mejor tolerados"
    ],
    allowedFoods: [
      "Leches vegetales (almendra, soja, avena, coco)",
      "Productos lácteos sin lactosa",
      "Quesos curados y añejos",
      "Mantequilla (contiene muy poca lactosa)",
      "Todas las carnes, pescados y huevos",
      "Frutas, verduras y legumbres"
    ],
    avoidFoods: [
      "Leche regular de vaca, cabra y oveja",
      "Quesos frescos (cottage, ricotta)",
      "Helados tradicionales",
      "Crema de leche y nata",
      "Algunos productos procesados con lactosa oculta"
    ]
  },
  {
    id: "organico",
    name: "Orgánico",
    slug: "organico",
    tag: "organico",
    icon: OrganicoSvg,
    brushColor: "#22c55e",
    shortDescription: "Productos cultivados sin pesticidas sintéticos ni químicos artificiales.",
    fullDescription: "La alimentación orgánica se basa en consumir productos cultivados sin pesticidas sintéticos, fertilizantes químicos, organismos genéticamente modificados (OGM) ni aditivos artificiales. Según estudios, los productos orgánicos pueden contener mayores niveles de ciertos antioxidantes. La agricultura orgánica también beneficia al medio ambiente al proteger la biodiversidad y la calidad del suelo y agua.",
    benefits: [
      "Menor exposición a residuos de pesticidas sintéticos",
      "Algunos estudios muestran mayor contenido de antioxidantes",
      "Apoyo a prácticas agrícolas sostenibles",
      "Protección del medio ambiente y biodiversidad",
      "Sin organismos genéticamente modificados (OGM)"
    ],
    considerations: [
      "Generalmente más costoso que productos convencionales",
      "La etiqueta 'orgánico' no significa necesariamente 'más nutritivo'",
      "Buscar sellos de certificación oficiales reconocidos",
      "Los productos orgánicos también deben lavarse antes de consumir"
    ],
    tips: [
      "Prioriza orgánico para los productos con más residuos de pesticidas",
      "Busca mercados locales de productores para mejores precios",
      "Verifica que tengan certificación orgánica oficial",
      "Lava siempre frutas y verduras, incluso las orgánicas"
    ],
    allowedFoods: [
      "Frutas y verduras con certificación orgánica",
      "Carnes de animales criados sin hormonas ni antibióticos",
      "Lácteos orgánicos",
      "Granos y cereales orgánicos",
      "Productos procesados con certificación orgánica"
    ],
    avoidFoods: [
      "Productos con pesticidas sintéticos",
      "Alimentos con OGM",
      "Productos con aditivos artificiales",
      "Carnes con hormonas de crecimiento",
      "Productos sin certificación orgánica"
    ]
  },
  {
    id: "sin-azucar",
    name: "Sin Azúcar",
    slug: "sin-azucar",
    tag: "sin-azucar",
    icon: SinAzucarSvg,
    brushColor: "#fef08a",
    shortDescription: "Productos sin azúcares añadidos para un mejor control glucémico.",
    fullDescription: "Una dieta sin azúcar añadido elimina los azúcares refinados y procesados, permitiendo solo los azúcares naturalmente presentes en alimentos como frutas. Según la OMS, el consumo excesivo de azúcares añadidos se asocia con mayor riesgo de obesidad, diabetes tipo 2, enfermedades cardiovasculares y caries dental. La OMS recomienda que los azúcares libres representen menos del 10% de la ingesta calórica diaria.",
    benefits: [
      "Mejor control de los niveles de glucosa en sangre",
      "Reducción del riesgo de diabetes tipo 2 según estudios",
      "Mejora de la salud dental y menor riesgo de caries",
      "Puede ayudar en el control del peso corporal",
      "Niveles de energía más estables durante el día"
    ],
    considerations: [
      "Los azúcares naturales de frutas son parte de una dieta saludable",
      "Leer etiquetas: el azúcar tiene muchos nombres (jarabe, dextrosa, maltosa)",
      "Los edulcorantes artificiales son una alternativa pero su uso es debatido",
      "Reducir gradualmente el azúcar facilita la adaptación del paladar"
    ],
    tips: [
      "Aprende los diferentes nombres del azúcar en las etiquetas",
      "Usa especias como canela y vainilla para dar dulzor natural",
      "Opta por frutas enteras en lugar de jugos de frutas",
      "El stevia es un edulcorante natural sin calorías"
    ],
    allowedFoods: [
      "Frutas frescas enteras",
      "Verduras de todo tipo",
      "Proteínas naturales sin marinar",
      "Granos integrales sin azúcar añadido",
      "Frutos secos y semillas naturales",
      "Productos endulzados con stevia o eritritol"
    ],
    avoidFoods: [
      "Azúcar blanca, morena y de caña",
      "Jarabes (maíz, agave, arce)",
      "Refrescos y bebidas azucaradas",
      "Dulces, chocolates y golosinas",
      "Cereales de desayuno azucarados",
      "Salsas y aderezos con azúcar oculto"
    ]
  },
  {
    id: "paleo",
    name: "Paleo",
    slug: "paleo",
    tag: "paleo",
    icon: PaleoSvg,
    brushColor: "#fcd34d",
    shortDescription: "Basada en alimentos que consumían nuestros ancestros cazadores-recolectores.",
    fullDescription: "La dieta paleo, o paleolítica, se basa en consumir alimentos que habrían estado disponibles para nuestros ancestros antes de la agricultura: carnes magras, pescados, frutas, verduras, nueces y semillas. Elimina granos, lácteos, legumbres y alimentos procesados. Algunos estudios sugieren beneficios para la pérdida de peso y marcadores metabólicos a corto plazo, aunque la evidencia a largo plazo es limitada.",
    benefits: [
      "Eliminación de alimentos ultraprocesados",
      "Alto contenido de proteínas y fibra",
      "Algunos estudios muestran mejoras en glucemia a corto plazo",
      "Rica en vitaminas y minerales de fuentes naturales",
      "Puede ayudar en pérdida de peso inicial"
    ],
    considerations: [
      "Elimina grupos alimenticios nutritivos como legumbres y granos integrales",
      "Puede ser difícil de mantener a largo plazo",
      "Evidencia científica limitada para beneficios a largo plazo",
      "Riesgo de deficiencia de calcio por eliminar lácteos",
      "Consultar con profesional de nutrición antes de comenzar"
    ],
    tips: [
      "Elige carnes de animales alimentados con pasto cuando sea posible",
      "Incluye variedad de colores en frutas y verduras",
      "Los frutos secos y semillas son excelentes fuentes de grasa saludable",
      "No temas las grasas naturales del aguacate, aceite de oliva y coco"
    ],
    allowedFoods: [
      "Carnes magras y pescados",
      "Frutas y verduras",
      "Frutos secos y semillas",
      "Huevos",
      "Aceites saludables (oliva, coco, aguacate)",
      "Tubérculos (batata, yuca)"
    ],
    avoidFoods: [
      "Granos y cereales (trigo, arroz, maíz)",
      "Legumbres (frijoles, lentejas, garbanzos)",
      "Lácteos",
      "Azúcares refinados",
      "Alimentos procesados",
      "Aceites vegetales refinados"
    ]
  },
  {
    id: "sin-gluten",
    name: "Sin Gluten",
    slug: "sin-gluten",
    tag: "sin-gluten",
    icon: SinGlutenSvg,
    brushColor: "#f9a8d4",
    shortDescription: "Libre de gluten, esencial para celíacos y sensibles al gluten.",
    fullDescription: "Según el NIDDK (Instituto Nacional de Diabetes y Enfermedades Digestivas), la dieta sin gluten es el único tratamiento efectivo para la enfermedad celíaca. El gluten es una proteína presente en trigo, cebada, centeno y sus derivados. En celíacos, su consumo daña el intestino delgado. Seguir una dieta estricta sin gluten permite la curación del intestino y la remisión de los síntomas en la mayoría de los casos.",
    benefits: [
      "Único tratamiento efectivo para la enfermedad celíaca",
      "Permite la recuperación del daño intestinal",
      "Mejora la absorción de nutrientes en celíacos",
      "Alivia síntomas digestivos en personas con sensibilidad al gluten",
      "Síntomas mejoran días o semanas después de iniciar la dieta"
    ],
    considerations: [
      "No iniciar la dieta sin diagnóstico médico previo (dificulta el diagnóstico)",
      "Para personas sin celiaquía, no hay evidencia de beneficios",
      "Cuidado con la contaminación cruzada en la cocina",
      "Muchos productos procesados contienen gluten oculto",
      "Requiere lectura cuidadosa de etiquetas"
    ],
    tips: [
      "Verifica siempre las etiquetas: el gluten se esconde en salsas y condimentos",
      "Usa utensilios separados para evitar contaminación cruzada",
      "Explora harinas alternativas: almendra, coco, arroz, maíz",
      "Quinoa, arroz, maíz y amaranto son naturalmente sin gluten"
    ],
    allowedFoods: [
      "Arroz, maíz, quinoa, amaranto",
      "Frutas y verduras frescas",
      "Carnes y pescados frescos sin marinar",
      "Huevos y lácteos puros",
      "Legumbres",
      "Harinas y productos certificados sin gluten"
    ],
    avoidFoods: [
      "Trigo y todos sus derivados",
      "Cebada y malta de cebada",
      "Centeno",
      "Pan, pasta y cereales tradicionales",
      "Cerveza regular (elaborada con cebada)",
      "Salsas y sopas espesadas con harina"
    ]
  },
  {
    id: "keto",
    name: "Keto",
    slug: "keto",
    tag: "keto",
    icon: KetoSvg,
    brushColor: "#bfdbfe",
    shortDescription: "Muy baja en carbohidratos y alta en grasas saludables.",
    fullDescription: "La dieta cetogénica o keto es muy baja en carbohidratos (menos de 50g/día), alta en grasas (70-80%) y moderada en proteínas. Según la Academia de Nutrición y Dietética, fue desarrollada en 1921 para tratar la epilepsia. Meta-análisis han demostrado su efectividad para pérdida de peso a corto plazo y mejora de sensibilidad a la insulina. El cuerpo entra en cetosis, usando cetonas como combustible en lugar de glucosa.",
    benefits: [
      "Efectiva para pérdida de peso a corto plazo según estudios",
      "Tratamiento reconocido para epilepsia refractaria",
      "Puede mejorar sensibilidad a la insulina en diabéticos tipo 2",
      "Reduce el apetito según meta-análisis de 2015",
      "Algunos reportan mayor claridad mental y energía estable"
    ],
    considerations: [
      "Puede causar efectos secundarios iniciales ('keto flu')",
      "Evidencia limitada sobre seguridad a largo plazo",
      "Posibles efectos en sistema cardiovascular",
      "Riesgo de deficiencias de vitaminas y minerales",
      "Requiere supervisión de profesional de salud"
    ],
    tips: [
      "Mantén carbohidratos por debajo de 20-50g diarios para cetosis",
      "Incluye grasas saludables: aguacate, aceite de oliva, nueces",
      "Mantente muy bien hidratado y considera añadir electrolitos",
      "Planifica tus comidas y ten opciones keto disponibles"
    ],
    allowedFoods: [
      "Carnes y pescados grasos",
      "Huevos",
      "Quesos curados",
      "Aguacate",
      "Aceites saludables (oliva, coco)",
      "Verduras bajas en carbohidratos (espinacas, brócoli)",
      "Frutos secos (con moderación)"
    ],
    avoidFoods: [
      "Pan, pasta, arroz y cereales",
      "Azúcares y dulces",
      "Frutas altas en azúcar (excepto bayas con moderación)",
      "Legumbres",
      "Tubérculos (papa, batata)",
      "Bebidas azucaradas"
    ]
  }
]

export function getDietBySlug(slug: string): DietInfo | undefined {
  return DIETS_DATA.find(diet => diet.slug === slug)
}

export function getAllDietSlugs(): string[] {
  return DIETS_DATA.map(diet => diet.slug)
}
