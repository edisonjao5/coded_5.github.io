import Fuse from 'fuse.js';

export const doQuery = (entities, query = {}) => {
  if (!entities) return [];
  let queriedEntities = [...entities];

  if (query.notIn) {
    queriedEntities = queriedEntities.filter(
      item => !query.notIn.includes(item.UserID),
    );
  }

  if (query.textSearch) {
    const fuse = new Fuse(queriedEntities, {
      keys: ['Name', 'LastNames', 'Rut', 'Comuna.Name'],
      threshold: 0,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
    });
    queriedEntities = fuse.search(query.textSearch);
  }

  /* sort */
  const { sort } = query;
  if (sort) {
    queriedEntities = queriedEntities.sort((a, b) => {
      if (sort.by === 'Comuna') {
        if (a[sort.by].Name.toLowerCase() > b[sort.by].Name.toLowerCase())
          return sort.asc ? 1 : -1;
        if (a[sort.by].Name.toLowerCase() < b[sort.by].Name.toLowerCase())
          return sort.asc ? -1 : 1;
      } else {
        if (a[sort.by].toLowerCase() > b[sort.by].toLowerCase())
          return sort.asc ? 1 : -1;
        if (a[sort.by].toLowerCase() < b[sort.by].toLowerCase())
          return sort.asc ? -1 : 1;
      }

      return 0;
    });
  }

  return queriedEntities;
};

export const shouldShowField = (fieldName, focusHide) =>
  !(focusHide && focusHide.includes(fieldName));

export const clientFullname = client =>
  client ? `${client.Name} ${client.LastNames} / ${client.Rut}` : '';

export const professions = [
  { label: "A",
    values: [
      "Abogado",
      "Académico",
      "Adjunto",
      "Administrador",
      "Administrativo",
      "Agrónomo",
      "Alergólogo",
      "Almacenero",
      "Anatomista",
      "Anestesiólogo",
      "Antologista",
      "Antropólogo",
      "Arabista",
      "Archivero",
      "Arqueólogo",
      "Arquitecto",
      "Asesor",
      "Asistente",
      "Astrofísico",
      "Astrólogo",
      "Astrónomo",
      "Atleta",
      "ATS",
      "Autor",
      "Auxiliar",
      "Avicultor",]
    },
    { label: "B",
      values: [
        'Bacteriólogo',
        'Bedel',
        'Bibliógrafo',
        'Bibliotecario',
        'Biofísico',
        'Biógrafo',
        'Biólogo',
        'Bioquímico',
        'Botánico'
      ]
    },
    { label: "C",
      values: [
        "Cancerólogo",
        "Cardiólogo",
        "Cartógrafo",
        "Castrador",
        "Catedrático",
        "Cirujano",
        "Citólogo",
        "Climatólogo",
        "Codirector",
        "Comadrón",
        "Consejero",
        "Conserje",
        "Conservador",
        "Coordinador",
        "Cosmógrafo",
        "Cosmólogo",
        "Criminalista",
        "Cronólogo"
      ]
    },
    { label: "D",
      values: [
        'Decano',
        'Decorador',
        'Defensor',
        'Delegado',
        'Delineante',
        'Demógrafo',
        'Dentista',
        'Dermatólogo',
        'Dibujante',
        'Directivo',
        'Director',
        'Dirigente',
        'Doctor',
        'Documentalista'
      ]
    },
    { label: "E",
      values: [
        "Ecólogo",
        "Economista",
        "Educador",
        "Egiptólogo",
        "Endocrinólogo",
        "Enfermero",
        "Enólogo",
        "Entomólogo",
        "Epidemiólogo",
        "Especialista",
        "Espeleólogo",
        "Estadista",
        "Estadístico",
        "Etimólogo",
        "Etnógrafo",
        "Etnólogo",
        "Etólogo",
        "Examinador"
      ]
    },
    { label: "F",
      values: [
        "Facultativo",
        "Farmacéutico",
        "Farmacólogo",
        "Filólogo",
        "Filósofo",
        "Fiscal",
        "Físico",
        "Fisiólogo",
        "Fisioterapeuta",
        "Fonetista",
        "Foníatra",
        "Fonólogo",
        "Forense",
        "Fotógrafo",
        "Funcionario"
      ]
    },
    { label: "G",
      values: [
        "Gemólogo",
        "Genetista",
        "Geobotánica",
        "Geodesta",
        "Geofísico",
        "Geógrafo",
        "Geólogo",
        "Geomántico",
        "Geómetra",
        "Geoquímica",
        "Gerente",
        "Geriatra",
        "Gerontólogo",
        "Gestor",
        "Grabador",
        "Graduado",
        "Grafólogo",
        "Gramático"
      ]
    },
    { label: "H",
      values: [
        "Hematólogo",
        "Hepatólogo",
        "Hidrogeólogo",
        "Hidrógrafo",
        "Hidrólogo",
        "Higienista",
        "Hispanista",
        "Historiador",
        "Homeópata"
      ]
    },
    { label: "I",
      values: [
        "Informático",
        "Ingeniero",
        "Inmunólogo",
        "Inspector",
        "Interino",
        "Interventor",
        "Investigador"
      ]
    },
    { label: "J",
      values: [
        "Jardinero",
        "Jefe",
        "Juez"
      ]
    },
    { label: "L",
      values: [
        "Latinista",
        "Lector",
        "Letrado",
        "Lexicógrafo",
        "Lexicólogo",
        "Licenciado",
        "Lingüista",
        "Logopeda"
      ]
    },,
    { label: "M",
      values: [
        "Maestro",
        "Matemático",
        "Matrón",
        "Medico",
        "Meteorólogo",
        "Micólogo",
        "Microbiológico",
        "Microcirujano",
        "Mimógrafo",
        "Mineralogista",
        "Monitor",
        "Musicólogo"
      ]
    },
    { label: "N",
      values: [
        "Naturópata",
        "Nefrólogo",
        "Neumólogo",
        "Neuroanatomista",
        "Neurobiólogo",
        "Neurocirujano",
        "Neuroembriólogo",
        "Neurofisiólogo",
        "Neurólogo",
        "Nutrólogo"
      ]
    },
    { label: "O",
      values: [
        "Oceanógrafo",
        "Odontólogo",
        "Oficial",
        "Oficinista",
        "Oftalmólogo",
        "Oncólogo",
        "Óptico",
        "Optometrista",
        "Ordenanza",
        "Orientador",
        "Ornitólogo",
        "Ortopédico",
        "Ortopedista",
        "Osteólogo",
        "Osteópata",
        "Otorrinolaringólogo"
      ]
    },
    { label: "P",
      values: [
        "Paleobiólogo",
        "Paleobotánico",
        "Paleógrafo",
        "Paleólogo",
        "Paleontólogo",
        "Patólogo",
        "Pedagogo",
        "Pediatra",
        "Pedicuro",
        "Periodista",
        "Perito",
        "Ingeniero",
        "Piscicultor",
        "Podólogo",
        "Portero",
        "Prehistoriador",
        "Presidente",
        "Proctólogo",
        "Profesor",
        "Programador",
        "Protésico",
        "Proveedor",
        "Psicoanalista",
        "Psicólogo",
        "Psicofísico",
        "Psicopedagogo",
        "Psicoterapeuta",
        "Psiquiatra",
        "Publicista",
        "Publicitario",
        "Puericultor"
      ]
    },
    { label: "Q",
      values: [
        "Químico",
        "Quiropráctico",
        "R",
        "Radioastrónomo",
        "Radiofonista",
        "Radiólogo",
        "Radiotécnico",
        "Radiotelefonista",
        "Radiotelegrafista",
        "Radioterapeuta",
        "Rector"
      ]
    },
    { label: "S",
      values: [
        "Sanitario",
        "Secretario",
        "Sexólogo",
        "Sismólogo",
        "Sociólogo",
        "Subdelegado",
        "Subdirector",
        "Subsecretario"
      ]
    },
    { label: "T",
      values: [
        "Técnico",
        "Telefonista",
        "Teólogo",
        "Terapeuta",
        "Tocoginecólogo",
        "Tocólogo",
        "Toxicólogo",
        "Traductor",
        "Transcriptor",
        "Traumatólogo",
        "Tutor"
      ]
    },
    { label: "U",
      values: [
        "Urólogo"
      ]
    },
    { label: "V",
      values: [
        "Veterinario",
        "Vicedecano",
        "Vicedirector",
        "Vicegerente",
        "Vicepresidente",
        "Vicerrector",
        "Vicesecretario",
        "Virólogo",
        "Viticultor",
        "Vulcanólogo"
      ]
    },
    { label: "X",
      values: [
        "Xilógrafo"
      ]
    },
    { label: "YZ",
      values: [
        "Zoólogo",
        "Zootécnico"
      ]
    }
]
