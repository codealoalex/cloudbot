export const MESSAGES = {
  text: "Hola soy tu bot asistente para tramites en el SEGIP, ¿en qué puedo ayudarte?\n1. Emision de carnet de identidad para nacionales.\n2. Emision de carnet de identidad para extranjeros.\n3. Emision de licencias de conducir.",
  nom: undefined,
  step: 0,
  opciones: {
    nac: {
      text: "1. Mayor de edad.\n2. Menor de edad.\n3. Renovación, robo o extraviadas.",
      opciones: [
        {
          text: "Certificado de nacimiento original obtenido después de julio de 2007. Emitido por el Serecí.\nDepósito bancario o transferencia de Bs 17.\nCertificación de partida única vigente, emitido por el Serecí. (Si corresponde).\nResolución administrativa de nueva inscripción (Si corresponde)",
          opciones: null,
        },
        {
          text: "Certificado de nacimiento original obtenido después de julio de 2007. Emitido por el Serecí.\nDepósito bancario o transferencia de Bs 17 a nombre del menor.\nPresencia física del menor.\nPresencia física de uno o ambos progenitores portando sus cédulas de identidad vigentes. En caso de ausencia de los padres:\n* Pariente de tercer grado consanguineo\n* Tutor legal con resolución judicial",
          opciones: null,
        },
        {
          text: "Depósito bancario o transferencia de Bs 17.\nYa sea por UNIMóvilPlus, Tigo Money, Pago con tarjeta en oficinas, Depósito bancario",
          opciones: null,
        },
      ],
    },
    ext: {
      text: "1. Primera vez.\n2. Duplicado.\n3. Renovado, temporal y definitiva.\n4. Menores de edad.\n5. Refugiados.\n6. Ciudadana/o con discapacidad.",
      opciones: [
        {
          text: "DNI o pasaporte (original y fotocopia).\nPermanencia otorgada por Migracion (original y fotocopia).\nActa de entrega otorgado por Migración (original).\nFormulario de pre-registro.\nResolución Administrativa de Migración (original).\nBoleta de depósito(original y fotocopia a nombre del interesado).\nOpcional: Certificado de matrimonio, titulo profesional (original y fotocopia)\n\nNota: Presentar todos los documentos en un folder amarillo.",
          opciones: null,
        },
        {
          text: "Boleta de depósito (original y fotocopia a nombre del interesado).\nOpcional: Certificado de matrimonio, titulo profesional (original y fotocopia)\n\nNota: Presentar todos los documentos en un folder amarillo.",
          opciones: null,
        },
        {
          text: "DNI o pasaporte (original y fotocopia).\nPermanencia otorgada por Migracion (original y fotocopia).\nActa de entrega otorgado por Migración (original).\nFormulario de pre-registro.\nResolución Administrativa de Migración (original).\nBoleta de depósito(original y fotocopia a nombre del interesado).\nOpcional: Certificado de matrimonio, titulo profesional (original y fotocopia)\n\nNota: Presentar todos los documentos en un folder amarillo.",
          opciones: null,
        },
        {
          text: "Certificado de nacimiento, pasaporte, DNI o CIE de la madre o del padre o tutor.\n\nNota: Tercera persona con poder específico (original o fotocopia legalizada).\n\nNota: Presentar todos los documentos en un folder amarillo.",
          opciones: null,
        },
        {
          text: "DNI o pasaporte (original y fotocopia).\nPermanencia otorgada por Migracion (original y fotocopia).\nActa de entrega otorgado por Migración (original).\nFormulario de pre-registro.\nResolución Administrativa de Migración (original).\nBoleta de depósito(original y fotocopia a nombre del interesado).\nOpcional: Certificado de matrimonio, titulo profesional (original y fotocopia)\nAdicional: Resolucion del Consejo Nacional del Refugiado (CONARE) original y fotocopia.\n\nNota: Presentar todos los documentos en un folder amarillo.",
          opciones: null,
        },
        {
          text: "DNI o pasaporte (original y fotocopia).\nPermanencia otorgada por Migracion (original y fotocopia).\nActa de entrega otorgado por Migración (original).\nFormulario de pre-registro.\nResolución Administrativa de Migración (original).\nBoleta de depósito(original y fotocopia a nombre del interesado).\nOpcional: Certificado de matrimonio, titulo profesional (original y fotocopia)\nAdicional: Documento oficial que acredite la condición de la persona con discapacidad (original y fotocopia).\n\nNota: Presentar todos los documentos en un folder amarillo.",
          opciones: null,
        },
      ],
    },
    lic: {
      text: "1. Primera vez.\n2. Duplicado.\n3. Renovación.\n4. Ascenso.",
    },
  },
};

export const GENERAL_OPTIONS = [
  {
    tipo: "nacional",
    nom: "nac",
  },
  {
    tipo: "extranjero",
    nom: "ext",
  },
  {
    tipo: "licencia",
    nom: "lic",
  },
];
