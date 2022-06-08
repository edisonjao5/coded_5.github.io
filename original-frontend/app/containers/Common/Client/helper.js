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
      "Acad�mico",
      "Adjunto",
      "Administrador",
      "Administrativo",
      "Agr�nomo",
      "Alerg�logo",
      "Almacenero",
      "Anatomista",
      "Anestesi�logo",
      "Antologista",
      "Antrop�logo",
      "Arabista",
      "Archivero",
      "Arque�logo",
      "Arquitecto",
      "Asesor",
      "Asistente",
      "Astrof�sico",
      "Astr�logo",
      "Astr�nomo",
      "Atleta",
      "ATS",
      "Autor",
      "Auxiliar",
      "Avicultor",]
    },
    { label: "B",
      values: [
        'Bacteri�logo',
        'Bedel',
        'Bibli�grafo',
        'Bibliotecario',
        'Biof�sico',
        'Bi�grafo',
        'Bi�logo',
        'Bioqu�mico',
        'Bot�nico'
      ]
    },
    { label: "C",
      values: [
        "Cancer�logo",
        "Cardi�logo",
        "Cart�grafo",
        "Castrador",
        "Catedr�tico",
        "Cirujano",
        "Cit�logo",
        "Climat�logo",
        "Codirector",
        "Comadr�n",
        "Consejero",
        "Conserje",
        "Conservador",
        "Coordinador",
        "Cosm�grafo",
        "Cosm�logo",
        "Criminalista",
        "Cron�logo"
      ]
    },
    { label: "D",
      values: [
        'Decano',
        'Decorador',
        'Defensor',
        'Delegado',
        'Delineante',
        'Dem�grafo',
        'Dentista',
        'Dermat�logo',
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
        "Ec�logo",
        "Economista",
        "Educador",
        "Egipt�logo",
        "Endocrin�logo",
        "Enfermero",
        "En�logo",
        "Entom�logo",
        "Epidemi�logo",
        "Especialista",
        "Espele�logo",
        "Estadista",
        "Estad�stico",
        "Etim�logo",
        "Etn�grafo",
        "Etn�logo",
        "Et�logo",
        "Examinador"
      ]
    },
    { label: "F",
      values: [
        "Facultativo",
        "Farmac�utico",
        "Farmac�logo",
        "Fil�logo",
        "Fil�sofo",
        "Fiscal",
        "F�sico",
        "Fisi�logo",
        "Fisioterapeuta",
        "Fonetista",
        "Fon�atra",
        "Fon�logo",
        "Forense",
        "Fot�grafo",
        "Funcionario"
      ]
    },
    { label: "G",
      values: [
        "Gem�logo",
        "Genetista",
        "Geobot�nica",
        "Geodesta",
        "Geof�sico",
        "Ge�grafo",
        "Ge�logo",
        "Geom�ntico",
        "Ge�metra",
        "Geoqu�mica",
        "Gerente",
        "Geriatra",
        "Geront�logo",
        "Gestor",
        "Grabador",
        "Graduado",
        "Graf�logo",
        "Gram�tico"
      ]
    },
    { label: "H",
      values: [
        "Hemat�logo",
        "Hepat�logo",
        "Hidroge�logo",
        "Hidr�grafo",
        "Hidr�logo",
        "Higienista",
        "Hispanista",
        "Historiador",
        "Home�pata"
      ]
    },
    { label: "I",
      values: [
        "Inform�tico",
        "Ingeniero",
        "Inmun�logo",
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
        "Lexic�grafo",
        "Lexic�logo",
        "Licenciado",
        "Ling�ista",
        "Logopeda"
      ]
    },,
    { label: "M",
      values: [
        "Maestro",
        "Matem�tico",
        "Matr�n",
        "Medico",
        "Meteor�logo",
        "Mic�logo",
        "Microbiol�gico",
        "Microcirujano",
        "Mim�grafo",
        "Mineralogista",
        "Monitor",
        "Music�logo"
      ]
    },
    { label: "N",
      values: [
        "Natur�pata",
        "Nefr�logo",
        "Neum�logo",
        "Neuroanatomista",
        "Neurobi�logo",
        "Neurocirujano",
        "Neuroembri�logo",
        "Neurofisi�logo",
        "Neur�logo",
        "Nutr�logo"
      ]
    },
    { label: "O",
      values: [
        "Ocean�grafo",
        "Odont�logo",
        "Oficial",
        "Oficinista",
        "Oftalm�logo",
        "Onc�logo",
        "�ptico",
        "Optometrista",
        "Ordenanza",
        "Orientador",
        "Ornit�logo",
        "Ortop�dico",
        "Ortopedista",
        "Oste�logo",
        "Oste�pata",
        "Otorrinolaring�logo"
      ]
    },
    { label: "P",
      values: [
        "Paleobi�logo",
        "Paleobot�nico",
        "Pale�grafo",
        "Pale�logo",
        "Paleont�logo",
        "Pat�logo",
        "Pedagogo",
        "Pediatra",
        "Pedicuro",
        "Periodista",
        "Perito",
        "Ingeniero",
        "Piscicultor",
        "Pod�logo",
        "Portero",
        "Prehistoriador",
        "Presidente",
        "Proct�logo",
        "Profesor",
        "Programador",
        "Prot�sico",
        "Proveedor",
        "Psicoanalista",
        "Psic�logo",
        "Psicof�sico",
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
        "Qu�mico",
        "Quiropr�ctico",
        "R",
        "Radioastr�nomo",
        "Radiofonista",
        "Radi�logo",
        "Radiot�cnico",
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
        "Sex�logo",
        "Sism�logo",
        "Soci�logo",
        "Subdelegado",
        "Subdirector",
        "Subsecretario"
      ]
    },
    { label: "T",
      values: [
        "T�cnico",
        "Telefonista",
        "Te�logo",
        "Terapeuta",
        "Tocoginec�logo",
        "Toc�logo",
        "Toxic�logo",
        "Traductor",
        "Transcriptor",
        "Traumat�logo",
        "Tutor"
      ]
    },
    { label: "U",
      values: [
        "Ur�logo"
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
        "Vir�logo",
        "Viticultor",
        "Vulcan�logo"
      ]
    },
    { label: "X",
      values: [
        "Xil�grafo"
      ]
    },
    { label: "YZ",
      values: [
        "Zo�logo",
        "Zoot�cnico"
      ]
    }
]
