import { httpClient_get, httpClient_post } from "../../helpers/api";
const responsesDay7 = [
  //NOVICE
  {
    id: 9,
    classificationEIM: "A",
    delai: "compatible",
    evolution: "suggestive",
    rechallenge: "R0",
    evocateurRole: "oui",
    facteursFav: "non",
    autresEtiologies: "absentes_apres_bilan_appropries",
    testSpecifiques: "L0",
    scoreBiblio: "B4",
    inputOMS: "certain",
    classificationEIMId: 233,
    delaiId: 234,
    evolutionId: 235,
    rechallengeId: 236,
    evocateurRoleId: 237,
    facteursFavId: 238,
    autresEtiologiesId: 239,
    testSpecifiquesId: 240,
    scoreBiblioId: 241,
    inputOMSId: 242,
  },
  {
    id: 10,
    classificationEIM: "A",
    delai: "compatible",
    evolution: "suggestive",
    rechallenge: "R0",
    evocateurRole: "oui",
    facteursFav: "non",
    autresEtiologies: "absentes_apres_bilan_appropries",
    testSpecifiques: "L0",
    scoreBiblio: "B4",
    inputOMS: "certain",

    classificationEIMId: 243,
    delaiId: 244,
    evolutionId: 245,
    rechallengeId: 246,
    evocateurRoleId: 247,
    facteursFavId: 248,
    autresEtiologiesId: 249,
    testSpecifiquesId: 250,
    scoreBiblioId: 251,
    inputOMSId: 252,
  },
  {
    id: 11,
    classificationEIM: "A",
    delai: "incompatible",
    evolution: "",
    rechallenge: "",
    evocateurRole: "",
    facteursFav: "",
    autresEtiologies: "",
    testSpecifiques: "",
    scoreBiblio: "",
    inputOMS: "",

    classificationEIMId: 253,
    delaiId: 254,
    evolutionId: 255,
    rechallengeId: 256,
    evocateurRoleId: 257,
    facteursFavId: 258,
    autresEtiologiesId: 259,
    testSpecifiquesId: 260,
    scoreBiblioId: 261,
    inputOMSId: 262,
  },
  {
    id: 12,
    classificationEIM: "B",
    delai: "incompatible",
    evolution: "",
    rechallenge: "",
    evocateurRole: "",
    facteursFav: "",
    autresEtiologies: "",
    testSpecifiques: "",
    scoreBiblio: "",
    inputOMS: "",

    classificationEIMId: 263,
    delaiId: 264,
    evolutionId: 265,
    rechallengeId: 266,
    evocateurRoleId: 267,
    facteursFavId: 268,
    autresEtiologiesId: 269,
    testSpecifiquesId: 270,
    scoreBiblioId: 271,
    inputOMSId: 272,
  },

  //Intermédiaire
  {
    id: 13,
    classificationEIM: "A",
    delai: "compatible",
    evolution: "suggestive",
    rechallenge: "R0",
    evocateurRole: "oui",
    facteursFav: "non",
    autresEtiologies: "absentes_apres_bilan_appropries",
    testSpecifiques: "L0",
    scoreBiblio: "B4",
    inputOMS: "probable",

    classificationEIMId: 273,
    delaiId: 274,
    evolutionId: 275,
    rechallengeId: 276,
    evocateurRoleId: 277,
    facteursFavId: 278,
    autresEtiologiesId: 279,
    testSpecifiquesId: 280,
    scoreBiblioId: 281,
    inputOMSId: 282,
  },
  {
    id: 14,
    classificationEIM: "B",
    delai: "compatible",
    evolution: "suggestive",
    rechallenge: "R0",
    evocateurRole: "non",
    facteursFav: "non",
    autresEtiologies: "absentes_apres_bilan_appropries",
    testSpecifiques: "L0",
    scoreBiblio: "B4",
    inputOMS: "possible",

    classificationEIMId: 283,
    delaiId: 284,
    evolutionId: 285,
    rechallengeId: 286,
    evocateurRoleId: 287,
    facteursFavId: 288,
    autresEtiologiesId: 289,
    testSpecifiquesId: 290,
    scoreBiblioId: 291,
    inputOMSId: 292,
  },
  {
    //twices
    id: 15,
    isComplicated: true,
    classificationEIM: "B",
    delai: "suggestif",
    evolution: "suggestive",
    rechallenge: "R0",
    evocateurRole: "non",
    facteursFav: "non",
    autresEtiologies: "absentes_apres_bilan_appropries",
    testSpecifiques: "L0",
    scoreBiblio: "B3",
    inputOMS: "possible",

    classificationEIM2: "B",
    delai2: "suggestif",
    evolution2: "suggestive",
    rechallenge2: "R0",
    evocateurRole2: "non",
    facteursFav2: "oui",
    autresEtiologies2: "absentes_apres_bilan_appropries",
    testSpecifiques2: "L0",
    scoreBiblio2: "B3",
    inputOMS2: "probable",
    classificationEIMId: 293,
    delaiId: 294,
    evolutionId: 295,
    rechallengeId: 296,
    evocateurRoleId: 297,
    facteursFavId: 298,
    autresEtiologiesId: 299,
    testSpecifiquesId: 300,
    scoreBiblioId: 301,
    inputOMSId: 302,
    classificationEIMId2: 303,
    delaiId2: 304,
    evolutionId2: 305,
    rechallengeId2: 306,
    evocateurRoleId2: 307,
    facteursFavId2: 308,
    autresEtiologiesId2: 309,
    testSpecifiquesId2: 310,
    scoreBiblioId2: 311,
    inputOMSId2: 312,
  },
  {
    id: 16,
    classificationEIM: "A",
    delai: "incompatible",
    evolution: "",
    rechallenge: "",
    evocateurRole: "",
    facteursFav: "",
    autresEtiologies: "",
    testSpecifiques: "",
    scoreBiblio: "",
    inputOMS: "",
    classificationEIMId: 313,
    delaiId: 314,
    evolutionId: 315,
    rechallengeId: 316,
    evocateurRoleId: 317,
    facteursFavId: 318,
    autresEtiologiesId: 319,
    testSpecifiquesId: 320,
    scoreBiblioId: 321,
    inputOMSId: 322,
  },
  //Expert
  {
    //twices
    id: 17,
    isComplicated: true,
    classificationEIM: "B",
    delai: "compatible",
    evolution: "suggestive",
    rechallenge: "R0",
    evocateurRole: "non",
    facteursFav: "non",
    autresEtiologies: "absentes_apres_bilan_appropries",
    testSpecifiques: "L0",
    scoreBiblio: "B3",
    inputOMS: "probable",

    classificationEIM2: "B",
    delai2: "suggestif",
    evolution2: "suggestive",
    rechallenge2: "R0",
    evocateurRole2: "non",
    facteursFav2: "non",
    autresEtiologies2: "absentes_apres_bilan_appropries",
    testSpecifiques2: "L0",
    scoreBiblio2: "B3",
    inputOMS2: "probable",

    classificationEIMId: 323,
    delaiId: 324,
    evolutionId: 325,
    rechallengeId: 326,
    evocateurRoleId: 327,
    facteursFavId: 328,
    autresEtiologiesId: 329,
    testSpecifiquesId: 330,
    scoreBiblioId: 331,
    inputOMSId: 332,
    classificationEIMId2: 333,
    delaiId2: 334,
    evolutionId2: 335,
    rechallengeId2: 336,
    evocateurRoleId2: 337,
    facteursFavId2: 338,
    autresEtiologiesId2: 339,
    testSpecifiquesId2: 340,
    scoreBiblioId2: 341,
    inputOMSId2: 342,
  },
  {
    //twices
    id: 18,
    isComplicated: true,
    classificationEIM: "B",
    delai: "compatible",
    evolution: "non_concluante",
    rechallenge: "R0",
    evocateurRole: "non",
    facteursFav: "non",
    autresEtiologies: "non_recherchees",
    testSpecifiques: "L0",
    scoreBiblio: "B3",
    inputOMS: "possible",

    classificationEIM2: "B",
    delai2: "compatible",
    evolution2: "non_concluante",
    rechallenge2: "R0",
    evocateurRole2: "non",
    facteursFav2: "non",
    autresEtiologies2: "non_recherchees",
    testSpecifiques2: "L0",
    scoreBiblio2: "B3",
    inputOMS2: "possible",

    classificationEIMId: 343,
    delaiId: 344,
    evolutionId: 345,
    rechallengeId: 346,
    evocateurRoleId: 347,
    facteursFavId: 348,
    autresEtiologiesId: 349,
    testSpecifiquesId: 350,
    scoreBiblioId: 351,
    inputOMSId: 352,
    classificationEIMId2: 353,
    delaiId2: 354,
    evolutionId2: 355,
    rechallengeId2: 356,
    evocateurRoleId2: 357,
    facteursFavId2: 358,
    autresEtiologiesId2: 359,
    testSpecifiquesId2: 360,
    scoreBiblioId2: 361,
    inputOMSId2: 362,
  },
  {
    //twices
    id: 19,
    isComplicated: true,
    classificationEIM: "B",
    delai: "compatible",
    evolution: "non_concluante",
    rechallenge: "R0",
    evocateurRole: "non",
    facteursFav: "non",
    autresEtiologies: "absentes_apres_bilan_appropries",
    testSpecifiques: "L0",
    scoreBiblio: "B4",
    inputOMS: "probable",

    classificationEIM2: "B",
    delai2: "suggestif",
    evolution2: "non_concluante",
    rechallenge2: "R0",
    evocateurRole2: "non",
    facteursFav2: "non",
    autresEtiologies2: "absentes_apres_bilan_appropries",
    testSpecifiques2: "L0",
    scoreBiblio2: "B4",
    inputOMS2: "possible",

    classificationEIMId: 363,
    delaiId: 364,
    evolutionId: 365,
    rechallengeId: 366,
    evocateurRoleId: 367,
    facteursFavId: 368,
    autresEtiologiesId: 369,
    testSpecifiquesId: 370,
    scoreBiblioId: 371,
    inputOMSId: 372,
    classificationEIMId2: 373,
    delaiId2: 374,
    evolutionId2: 375,
    rechallengeId2: 376,
    evocateurRoleId2: 377,
    facteursFavId2: 378,
    autresEtiologiesId2: 379,
    testSpecifiquesId2: 380,
    scoreBiblioId2: 381,
    inputOMSId2: 382,
  },
  {
    //twices
    id: 20,
    isComplicated: true,
    classificationEIM: "B",
    delai: "compatible",
    evolution: "suggestive",
    rechallenge: "R0",
    evocateurRole: "non",
    facteursFav: "non",
    autresEtiologies: "absentes_apres_bilan_appropries",
    testSpecifiques: "L0",
    scoreBiblio: "B4",
    inputOMS: "possible",

    classificationEIM2: "B",
    delai2: "compatible",
    evolution2: "suggestive",
    rechallenge2: "R0",
    evocateurRole2: "non",
    facteursFav2: "non",
    autresEtiologies2: "absentes_apres_bilan_appropries",
    testSpecifiques2: "L0",
    scoreBiblio2: "B4",
    inputOMS2: "possible",

    classificationEIMId: 383,
    delaiId: 384,
    evolutionId: 385,
    rechallengeId: 386,
    evocateurRoleId: 387,
    facteursFavId: 388,
    autresEtiologiesId: 389,
    testSpecifiquesId: 390,
    scoreBiblioId: 391,
    inputOMSId: 392,
    classificationEIMId2: 393,
    delaiId2: 394,
    evolutionId2: 395,
    rechallengeId2: 396,
    evocateurRoleId2: 397,
    facteursFavId2: 398,
    autresEtiologiesId2: 399,
    testSpecifiquesId2: 400,
    scoreBiblioId2: 401,
    inputOMSId2: 402,
  },
];
const validCasService = (cas, _idCas, _idLevel) => {
 

  const correctResponse = responsesDay7.find((r) => r.id === _idCas);

  if (cas.classificationEIM.response === correctResponse.classificationEIM) {
    cas.classificationEIM.isValid = 1;
  } else cas.classificationEIM.isValid = 0;

  if (cas.delai.response === correctResponse.delai) {
    cas.delai.isValid = 1;
  } else cas.delai.isValid = 0;

  if (cas.evolution.response === correctResponse.evolution) {
    cas.evolution.isValid = 1;
  } else cas.evolution.isValid = 0;

  if (cas.rechallenge.response === correctResponse.rechallenge) {
    cas.rechallenge.isValid = 1;
  } else cas.rechallenge.isValid = 0;

  if (cas.evocateurRole.response === correctResponse.evocateurRole) {
    cas.evocateurRole.isValid = 1;
  } else cas.evocateurRole.isValid = 0;

  if (cas.facteursFav.response === correctResponse.facteursFav) {
    cas.facteursFav.isValid = 1;
  } else cas.facteursFav.isValid = 0;

  if (cas.autresEtiologies.response === correctResponse.autresEtiologies) {
    cas.autresEtiologies.isValid = 1;
  } else cas.autresEtiologies.isValid = 0;

  if (cas.testSpecifiques.response === correctResponse.testSpecifiques) {
    cas.testSpecifiques.isValid = 1;
  } else cas.testSpecifiques.isValid = 0;

  if (cas.scoreBiblio.response === correctResponse.scoreBiblio) {
    cas.scoreBiblio.isValid = 1;
  } else cas.scoreBiblio.isValid = 0;

  if (cas.inputOMS.response === correctResponse.inputOMS) {
    cas.inputOMS.isValid = 1;
  } else cas.inputOMS.isValid = 0;

  if (correctResponse.isComplicated) {
    if (
      cas.classificationEIM2.response === correctResponse.classificationEIM2
    ) {
      cas.classificationEIM2.isValid = 1;
    } else cas.classificationEIM2.isValid = 0;

    if (cas.delai2.response === correctResponse.delai2) {
      cas.delai2.isValid = 1;
    } else cas.delai2.isValid = 0;

    if (cas.evolution2.response === correctResponse.evolution2) {
      cas.evolution2.isValid = 1;
    } else cas.evolution2.isValid = 0;

    if (cas.rechallenge2.response === correctResponse.rechallenge2) {
      cas.rechallenge2.isValid = 1;
    } else cas.rechallenge2.isValid = 0;

    if (cas.evocateurRole2.response === correctResponse.evocateurRole2) {
      cas.evocateurRole2.isValid = 1;
    } else cas.evocateurRole2.isValid = 0;

    if (cas.facteursFav2.response === correctResponse.facteursFav2) {
      cas.facteursFav2.isValid = 1;
    } else cas.facteursFav2.isValid = 0;

    if (cas.autresEtiologies2.response === correctResponse.autresEtiologies2) {
      cas.autresEtiologies2.isValid = 1;
    } else cas.autresEtiologies2.isValid = 0;

    if (cas.testSpecifiques2.response === correctResponse.testSpecifiques2) {
      cas.testSpecifiques2.isValid = 1;
    } else cas.testSpecifiques2.isValid = 0;

    if (cas.scoreBiblio2.response === correctResponse.scoreBiblio2) {
      cas.scoreBiblio2.isValid = 1;
    } else cas.scoreBiblio2.isValid = 0;

    if (cas.inputOMS2.response === correctResponse.inputOMS2) {
      cas.inputOMS2.isValid = 1;
    } else cas.inputOMS2.isValid = 0;
  }

  if (
    cas.classificationEIM.isValid === 1 &&
    cas.delai.isValid === 1 &&
    cas.evolution.isValid === 1 &&
    cas.rechallenge.isValid === 1 &&
    cas.evocateurRole.isValid === 1 &&
    cas.facteursFav.isValid === 1 &&
    cas.autresEtiologies.isValid === 1 &&
    cas.testSpecifiques.isValid === 1 &&
    cas.scoreBiblio.isValid === 1 &&
    cas.inputOMS.isValid === 1
  ) {
    if (correctResponse.isComplicated) {
      if (
        cas.classificationEIM2.isValid === 1 &&
        cas.delai2.isValid === 1 &&
        cas.evolution2.isValid === 1 &&
        cas.rechallenge2.isValid === 1 &&
        cas.evocateurRole2.isValid === 1 &&
        cas.facteursFav2.isValid === 1 &&
        cas.autresEtiologies2.isValid === 1 &&
        cas.testSpecifiques2.isValid === 1 &&
        cas.scoreBiblio2.isValid === 1 &&
        cas.inputOMS2.isValid === 1
      ) {
        cas.isValid = 1;
      } else {
        cas.isValid = 0;
      }
    } else {
      cas.isValid = 1;
    }
  } else {
    cas.isValid = 0;
  }

  return { cas, _idCas, _idLevel };
};

const saveDetailsService = (dayId, centerId, details) => {
  return httpClient_post(`/participant/pvgame/savedecisiondetails`, {
    centerId,
    dayId,
    details,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
const saveDecisionsService = (dayId, decisions, centerId) => {
  return httpClient_post(`/participant/pvgame/savedecisions`, {
    centerId,
    decisions,
    dayId,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
const activateImputabilityBadgeService = (centerId, level) => {
  return httpClient_post(
    `/participant/pvgame/activateimputabilitybadge?centerId=${centerId}&level=${level}`,
    {}
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
const closeDayService = (dayId, centerId) => {
  return httpClient_get(
    `/participant/pvgame/closeday?centerId=${centerId}&dayId=${dayId}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};

const getDetailsService = (dayId, centerId, parse = true) => {
  return httpClient_get(
    `/participant/pvgame/getdecisiondetails?centerId=${centerId}&dayId=${dayId}`
  )
    .then((response) => {
      if (!parse) {
        return response.data[0];
      }
      if (response.data.length > 0) {
        const data = response.data[0];
        data.details = JSON.parse(data.details);
        return data;
      } else {
        return {};
      }
    })
    .catch((error) => {
      throw error;
    });
};


const getHistoricScores = (centerId) => {

  return httpClient_get(
    `/participant/pvgame/gethistoricscores?centerId=${centerId}`
  )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}

export {
  validCasService,
  saveDetailsService,
  saveDecisionsService,
  closeDayService,
  getDetailsService,
  activateImputabilityBadgeService,
  getHistoricScores,
  responsesDay7
};
