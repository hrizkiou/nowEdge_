import {
  DAY7_ON_CHANGE_CAS_OPTION,
  DAY7_VALID_CAS,
  DAY7_VALID_CAS_SUCCESS,
  DAY7_VALID_CAS_FAILED,
  DAY7_VALID_DAY,
  DAY7_VALID_DAY_SUCCESS,
  DAY7_VALID_DAY_FAILED,
  DAY10_ON_CHANGE_PART1,
  DAY10_ON_CHANGE_PART2,
  DAY10_RESET_PART2,
  DAY2_VALID_DAY,
  DAY2_VALID_DAY_FAILED,
  DAY2_VALID_DAY_SUCCESS,
  DAY3_UPDATE_DECISIONS,
  DAY2_ON_CHANGE_CAS_OPTION,
  DAY3_VALIDATIONS,
  DAY3_VALIDATIONS_SUCCESS,
  DAY3_VALIDATIONS_FAILED,
  DAY4_PART2_ONDRAG,
  DAY4_PART1_ONCHANGE_IS_SELECTED,
  DAY4_VALIDATION,
  DAY4_VALIDATION_SUCCESS,
  DAY4_VALIDATION_FAILED,
  DAY5_ONSELECT_CAT,
  DAY5_ONCHANGE_CAT0_RANK1,
  DAY5_ONCHANGE_CAT0_RANK2,
  DAY5_ONCHANGE_CAT0_RANK3,
  DAY5_ONCHANGE_CAT0_RANK4,
  DAY5_ONCHANGE_CAT1_LEFT_DECISIONS1,
  DAY5_ONCHANGE_CAT1_LEFT_DECISIONS2,
  DAY5_ONCHANGE_CAT1_LEFT_DECISIONS3,
  DAY5_ONCHANGE_CAT1_LEFT_DECISIONS4,
  DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS1,
  DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS2,
  DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS3,
  DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS4,
  DAY5_ONCHANGE_CAT2_LEFT_DECISIONS1,
  DAY5_ONCHANGE_CAT2_LEFT_DECISIONS2,
  DAY5_ONCHANGE_CAT2_LEFT_DECISIONS3,
  DAY5_ONCHANGE_CAT2_LEFT_DECISIONS4,
  DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS1,
  DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS2,
  DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS3,
  DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS4,
  DAY5_ONCHANGE_CAT2_RANK1,
  DAY5_ONCHANGE_CAT2_RANK2,
  DAY5_ONCHANGE_CAT2_RANK3,
  DAY5_ONCHANGE_CAT2_RANK4,
  DAY5_VALIDATION,
  DAY5_VALIDATION_FAILED,
  DAY5_VALIDATION_SUCCESS,
  Day6_ONCHANGE_CAT2,
  Day6_ONCHANGE_CAT3,
  Day6_ONCHANGE_CAT1,
  Day6_VALIDATION,
  Day6_VALIDATION_SUCCESS,
  Day6_VALIDATION_FAILED,
  DAY8_VALIDATION,
  DAY8_VALIDATION_FAILED,
  DAY8_VALIDATION_SUCCESS,
  DAY2_GET_DETAIL,
  DAY2_GET_DETAIL_FAILED,
  DAY2_GET_DETAIL_SUCCESS,
  DAY3_GET_DETAIL,
  DAY3_GET_DETAIL_SUCCESS,
  DAY3_GET_DETAIL_FAILED,
  DAY4_GET_DETAIL,
  DAY4_GET_DETAIL_SUCCESS,
  DAY4_GET_DETAIL_FAILED,
  DAY5_GET_DETAIL,
  DAY5_GET_DETAIL_SUCCESS,
  DAY5_GET_DETAIL_FAILED,
  Day6_GET_DETAIL,
  Day6_GET_DETAIL_SUCCESS,
  Day6_GET_DETAIL_FAILED,
  DAY10_VALIDATIONS,
  DAY10_VALIDATIONS_SUCCESS,
  DAY10_VALIDATIONS_FAILED,
  Day10_GET_DETAIL,
  Day10_GET_DETAIL_SUCCESS,
  Day10_GET_DETAIL_FAILED,
  DAY7_GET_DETAIL,
DAY7_GET_DETAIL_SUCCESS,
DAY7_GET_DETAIL_FAILED
} from "../../constants/actionTypes";
import { REHYDRATE } from "redux-persist";

const INIT_STATE = {
  day10: {
    part1: {
      1: {
        1: "",
        2: "",
        3: "",
        5: "",
        6: "",
        7: "",
      },
      2: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
      },
      3: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
      },
    },
    part2: {
      1: {
        1: {
          1: false,
          2: false,
        },
        2: {
          1: false,
          2: false,
          3: false,
        },
        3: {
          1: false,
          2: false,
          3: false,
        },
        4: {
          1: false,
          2: false,
          3: false,
        },
        5: {
          1: false,
          2: false,
          3: false,
        },
        6: {
          1: false,
          2: false,
        },
        7: {
          1: false,
          2: false,
        },
        8: {
          1: false,
          2: false,
          3: false,
        },
        9: {
          1: false,
          2: false,
          3: false,
        },
        10: {
          1: false,
          2: false,
          3: false,
        },
      },
      2: {
        1: {
          1: false,
          2: false,
        },
        2: {
          1: false,
          2: false,
          3: false,
        },
        3: {
          1: false,
          2: false,
          3: false,
        },
        4: {
          1: false,
          2: false,
          3: false,
        },
        5: {
          1: false,
          2: false,
          3: false,
        },
        6: {
          1: false,
          2: false,
        },
        7: {
          1: false,
          2: false,
        },
        8: {
          1: false,
          2: false,
          3: false,
        },
        9: {
          1: false,
          2: false,
          3: false,
        },
        10: {
          1: false,
          2: false,
          3: false,
        },
      },
      3: {
        1: {
          1: false,
          2: false,
        },
        2: {
          1: false,
          2: false,
          3: false,
        },
        3: {
          1: false,
          2: false,
          3: false,
        },
        4: {
          1: false,
          2: false,
          3: false,
        },
        5: {
          1: false,
          2: false,
          3: false,
        },
        6: {
          1: false,
          2: false,
        },
        7: {
          1: false,
          2: false,
        },
        8: {
          1: false,
          2: false,
          3: false,
        },
        9: {
          1: false,
          2: false,
          3: false,
        },
        10: {
          1: false,
          2: false,
          3: false,
        },
      },
    },
  },
  day2: {
    categories: [
      {
        id: 1,
        decisionId: null,
        decisions: [66, 67, 68],
      },
      {
        id: 2,
        decisionId: null,
        decisions: [69, 70, 71],
      },
      {
        id: 3,
        decisionId: null,
        decisions: [72, 73, 74],
      },
      {
        id: 4,
        decisionId: null,
        decisions: [75, 76, 77],
      },
      {
        id: 5,
        decisionId: null,
        decisions: [78, 79, 80],
      },
      {
        id: 6,
        decisionId: null,
        decisions: [81, 82, 83],
      },
      {
        id: 7,
        decisionId: null,
        decisions: [84, 85, 86],
      },
    ],
  },
  day3: {
    categories: [
      {
        id: 1,
        // text: "Pharmacovigilance team (WHO) Geneva",

        block: 1,
      },
      {
        id: 2,
        // text: "Upssala Monitoring Centre",
        block: 1,
      },
      {
        id: 3,
        // text: "Rabat collaborating center RCC",

        block: 1,
      },
      {
        id: 4,
        // text: "Les bailleurs de fonds",

        block: 2,
      },
      {
        id: 5,
        // text: "Les sociétés savantes",

        block: 2,
      },
      {
        id: 6,
        // text: "Les bureaux régionaux et nationaux de l'OMS",

        block: 2,
      },
    ],
    decisions: [
      {
        id: 87,
        category: "block",
      },
      {
        id: 88,
        category: "block",
      },
      {
        id: 89,
        category: "block",
      },
      {
        id: 90,
        category: "block",
      },
      {
        id: 91,
        category: "block",
      },
      {
        id: 92,
        category: "block",
      },
      {
        id: 93,
        category: "block",
      },
      {
        id: 94,
        category: "block",
      },
      {
        id: 95,
        category: "block",
      },
      {
        id: 96,
        category: "block",
      },

      {
        id: 97,
        category: "block",
      },
      {
        id: 98,
        category: "block",
      },
      {
        id: 99,
        category: "block",
      },
      {
        id: 100,
        category: "block",
      },
      {
        id: 101,
        category: "block",
      },
      {
        id: 102,
        category: "block",
      },
      {
        id: 103,
        category: "block",
      },
      {
        id: 104,
        category: "block",
      },

      {
        id: 107,
        category: "block",
      },

      {
        id: 108,
        category: "block",
      },
      {
        id: 106,
        category: "block",
      },
      {
        id: 109,
        category: "block",
      },

      {
        id: 105,
        category: "block",
      },
      {
        id: 110,
        category: "block",
      },
      {
        id: 111,
        category: "block",
      },
      {
        id: 112,
        category: "block",
      },
      {
        id: 113,
        category: "block",
      },
      {
        id: 114,
        category: "block",
      },
      {
        id: 115,
        category: "block",
      },
      {
        id: 117,
        category: "block",
      },
      {
        id: 116,
        category: "block",
      },
      {
        id: 120,
        category: "block",
      },
      {
        id: 118,
        category: "block",
      },
      {
        id: 119,
        category: "block",
      },

      {
        id: 122,
        category: "block",
      },
      {
        id: 121,
        category: "block",
      },
    ],
  },
  day4: {
    part1: {
      decisions: [
        {
          id: 147,
          isSelected: false,
        },
        {
          id: 148,
          isSelected: false,
        },
        {
          id: 149,
          isSelected: false,
        },
        {
          id: 150,
          isSelected: false,
        },
        {
          id: 151,
          isSelected: false,
        },
        {
          id: 152,
          isSelected: false,
        },
      ],
    },
    part2: {
      decisions: [
        {
          id: 123,
          category: "non",
          blocIndex: 0,
          category_v: "pat",
        },
        {
          id: 124,
          category: "non",
          blocIndex: 0,
          category_v: "pat",
        },
        {
          id: 125,
          category: "non",
          blocIndex: 0,
          category_v: "pat",
        },
        {
          id: 126,
          category: "non",
          blocIndex: 0,
          category_v: "evi",
        },
        {
          id: 127,
          category: "non",
          blocIndex: 0,
          category_v: "evi",
        },
        {
          id: 128,
          category: "non",
          blocIndex: 0,
          category_v: "evi",
        },
        {
          id: 129,
          category: "non",
          blocIndex: 0,
          category_v: "prods",
        },
        {
          id: 130,
          category: "non",
          blocIndex: 0,
          category_v: "prods",
        },
        {
          id: 131,
          category: "non",
          blocIndex: 0,
          category_v: "prods",
        },
        {
          id: 132,
          category: "non",
          blocIndex: 0,
          category_v: "notif",
        },
        {
          id: 133,
          category: "non",
          blocIndex: 0,
          category_v: "notif",
        },
        {
          id: 134,
          category: "non",
          blocIndex: 0,
          category_v: "notif",
        },
        {
          id: 135,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 136,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 137,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 138,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 139,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 140,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 141,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 142,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 143,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 144,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 145,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
        {
          id: 146,
          category: "non",
          blocIndex: 0,
          category_v: "non",
        },
      ],
    },
  },
  day5: {
    selectedCategory: -1,
    categories: [
      {
        id: 2,
        decisions: [
          153,
          154,
          155,
          156,
          157,
          158,
          159,
          160,
          161,
          162,
          163,
          164,
          177,
          178,
          179,
          180,
          181,
          182,
          183,
          184,
        ],
        rank1: null,
        rank2: null,
        rank3: null,
        rank4: null,
        rightDecisions1: null,
        rightDecisions2: null,
        rightDecisions3: null,
        rightDecisions4: null,
        leftDecisions1: null,
        leftDecisions2: null,
        leftDecisions3: null,
        leftDecisions4: null,
      },
      {
        id: 1,
        decisions: [
          165,
          166,
          167,
          168,
          169,
          170,
          171,
          172,
          185,
          186,
          187,
          188,
          189,
          190,
          191,
          192,
        ],
        rightDecisions1: null,
        rightDecisions2: null,
        rightDecisions3: null,
        rightDecisions4: null,
        leftDecisions1: null,
        leftDecisions2: null,
        leftDecisions3: null,
        leftDecisions4: null,
      },
      {
        id: 0,
        decisions: [173, 174, 175, 176],
        rank1: null,
        rank2: null,
        rank3: null,
        rank4: null,
      },
    ],
  },
  Day6: {
    categories: [
      {
        id: 1, //Telephone
        decisions: [
          193,
          194,
          195,
          196,
          197,
          198,
          199,
          200,
          201,
          202,
          203,
          204,
          205,
          206,
        ],
        selectedDecision1: null,
        selectedDecision2: null,
        selectedDecision3: null,
        selectedDecision4: null,
        selectedDecision5: null,
        selectedDecision6: null,
        selectedDecision7: null,
      },
      {
        id: 2, //Email
        decisions: [
          207,
          208,
          209,
          210,
          211,
          212,
          213,
          214,
          215,
          216,
          217,
          218,
          219,
          220,
        ],
        selectedDecision1: null,
        selectedDecision2: null,
        selectedDecision3: null,
        selectedDecision4: null,
        selectedDecision5: null,
        selectedDecision6: null,
        selectedDecision7: null,
      },
      {
        id: 3, //papier
        decisions: [221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232],
        selectedDecision1: null,
        selectedDecision2: null,
        selectedDecision3: null,
        selectedDecision4: null,
        selectedDecision5: null,
        selectedDecision6: null,
      },
    ],
  },
  day7: {
    currentLevel: 1,
    levels: [
      {
        _id: 1,
        cas: [
          {
            _id: 9,
            content: [
              "191",
              "192",
              "193",
              "194",
              "195", 
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
          {
            _id: 10,
            content: [
              "1101",
              "1102",
              "1103",
              "1104",
              "1105",
              "1106",
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
          {
            _id: 11,
            content: [
              "1111",
              "1112",
              "1113",
              "1114",
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
          {
            _id: 12,
            content: [
              "1121",
              "1122",
              ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
        ],
        isValid: 2, // 1 valid, 0 non valid, -1 locked, 2 opened
      },
      {
        _id: 2,
        cas: [
          {
            _id: 13,
            content: [
              "2131",
              "2132",
              "2133",
              "2134",
              "2135",
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
          {
            _id: 14,
            content: [
              "2141",
              "2142",
              "2143",
              "2144",
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
          {
            _id: 15,
            isComplicated: true,
            medic1: "Zyloric",
            medic2: "Amoxil",
            content: [
              "2151",
              "2152",
              "2153",
              "2154",
              "2155",
              "2156",
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            classificationEIM2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
          {
            _id: 16,
            content: [
              "2161",
              "2162",
              "2163",
              "2164",
              "2165",
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
        ],
        isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 opened
      },
      {
        _id: 3,
        cas: [
          {
            _id: 17,
            isComplicated: true,
            medic1: "Depakine",
            medic2: "Lamictal",
            content: [
              "3171",
              "3172",
              "3173",
              "3174",
              "3175",
              "3176",
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            classificationEIM2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
          {
            _id: 18,
            isComplicated: true,
            medic1: "Anafranil",
            medic2: "Haldol",
            content: [
              "3181",
              "3182",
              "3183",
              "3184",
              "3185",
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            classificationEIM2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
          {
            _id: 19,
            isComplicated: true,
            medic1: "Allopurinol",
            medic2: "amoxicilline",
            content: [
              "3191",
              "3192",
              "3193",
              "3194",
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            classificationEIM2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
          {
            _id: 20,
            isComplicated: true,
            medic1: "Allopurinol",
            medic2: "Colchicine",
            content: [
              "3201",
              "3202",
              "3203",
              "3204",
              "3205",
              "3206",
            ],
            isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 answered
            classificationEIM: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            classificationEIM2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            delai2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evolution2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            rechallenge2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            evocateurRole2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            facteursFav2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            autresEtiologies2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            testSpecifiques2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            scoreBiblio2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
            inputOMS2: {
              response: "",
              isValid: -1, // 1 valid, 0 non valid, -1 not answered},
            },
          },
        ],
        isValid: -1, // 1 valid, 0 non valid, -1 locked, 2 opened
      },
    ],
  },
  loading: false,
};

const Days = (state = INIT_STATE, action) => {
  let levels = state.day7.levels;
  let categories = state.day2.categories;
  let categoriesday5 = state.day5.categories;
  let decisionsDay4Part1 = state.day4.part1.decisions;
  let decisionsDay6 = state.Day6.decisions;
  let part2;
  switch (action.type) {
    case DAY7_ON_CHANGE_CAS_OPTION:
      levels = state.day7.levels;
      levels = levels.map((level) => {
        if (level._id === action.payload._idLevel) {
          level.cas = level.cas.map((c) => {
            if (c._id === action.payload._idCas) {
              c[action.payload.axe].response = action.payload.response;
              return c;
            }
            return c;
          });
        }
        return level;
      });

      return { ...state, day7: { levels: [...levels] } };

    case DAY2_ON_CHANGE_CAS_OPTION:
      categories = state.day2.categories;
      categories = categories.map((category) => {
        if (category.id === action.payload.categoryId) {
          category.decisionId = action.payload.decisionId;
        }
        return category;
      });

      return { ...state, day2: { categories: [...categories] } };

    case DAY7_VALID_CAS:
      return { ...state, loading: true };

    case DAY2_VALID_DAY:
      return { ...state, loading: true };
    case DAY3_UPDATE_DECISIONS:
      return {
        ...state,
        day3: { ...state.day3, decisions: [...action.payload.decisions] },
      };

    case DAY7_VALID_CAS_SUCCESS:
      levels = state.day7.levels;
      levels = levels.map((level) => {
        if (level._id === action.payload._idLevel) {
          const validation = [];
          let isValidLevel = false;
          level.cas = level.cas.map((c) => {
            if (c._id === action.payload._idCas) {
              c = action.payload.cas;
            }
            if (c.isValid === 1) {
              level.isValid = 1;
              isValidLevel = true;
            } else if (c.isValid === 0) {
              validation.push(c.isValid);
            }
            return c;
          });
          //console.log("validation.length", validation, validation.length);

          if (validation.length === 4) {
            level.isValid = 0;
          }

          // if (isValidLevel) {
          //   level.cas = level.cas.map((c) => {
          //     if (c.isValid === -1) {
          //       c.isValid = 2;
          //     }
          //     return c;
          //   });
          // }
        }
        return level;
      });

      levels = levels.map((level, index) => {
        if (level.isValid === 1) {
          if (levels[index + 1]?.isValid && levels[index + 1]?.isValid === -1) {
            levels[index + 1].isValid = 2;
          }
        }
        return level;
      });

      return { ...state, day7: { levels: [...levels] }, loading: false };

    case DAY7_VALID_CAS_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case DAY2_VALID_DAY_FAILED:
      return { ...state, error: action.payload.error, loading: false };
    case DAY2_VALID_DAY_SUCCESS:
      return { ...state, loading: false };

    case DAY10_ON_CHANGE_PART1:
      state.day10.part1[action.payload.index][action.payload.itemIndex] =
        action.payload.response;
      return { ...state };
    case DAY10_ON_CHANGE_PART2:
      state.day10.part2[action.payload.currentIndex][action.payload.axe][
        action.payload.index
      ] = action.payload.response;
      return { ...state };
    case DAY10_RESET_PART2:
      part2 = state.day10.part2;
      part2[action.payload.currentIndex] = {
        1: {
          1: false,
          2: false,
        },
        2: {
          1: false,
          2: false,
          3: false,
        },
        3: {
          1: false,
          2: false,
          3: false,
        },
        4: {
          1: false,
          2: false,
          3: false,
        },
        5: {
          1: false,
          2: false,
          3: false,
        },
        6: {
          1: false,
          2: false,
        },
        7: {
          1: false,
          2: false,
        },
        8: {
          1: false,
          2: false,
          3: false,
        },
        9: {
          1: false,
          2: false,
          3: false,
        },
        10: {
          1: false,
          2: false,
          3: false,
        },
      };
      return {
        ...state,
        day10: {
          ...state.day10,
          part2,
        },
      };

    case DAY3_VALIDATIONS:
      return { ...state, loading: true };
    case DAY3_VALIDATIONS_SUCCESS:
      return { ...state, loading: false };
    case DAY3_VALIDATIONS_FAILED:
      return { ...state, loading: false };
    case DAY10_VALIDATIONS:
      return { ...state, loading: true };
    case DAY10_VALIDATIONS_SUCCESS:
      return { ...state, loading: false };
    case DAY10_VALIDATIONS_FAILED:
      return { ...state, loading: false };
    case DAY4_PART2_ONDRAG:
      return {
        ...state,
        day4: {
          ...state.day4,
          part2: {
            decisions: action.payload,
          },
        },
        loading: false,
      };
    case DAY4_PART1_ONCHANGE_IS_SELECTED:
      decisionsDay4Part1 = decisionsDay4Part1.map((decision) => {
        if (decision.id === action.payload.id) {
          decision.isSelected = !decision.isSelected;
        }
        return decision;
      });
      return {
        ...state,
        day4: {
          ...state.day4,
          part1: {
            decisions: [...decisionsDay4Part1],
          },
        },
        loading: false,
      };
    case DAY4_VALIDATION:
      return {
        ...state,
        loading: true,
      };

    case DAY4_VALIDATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DAY5_ONSELECT_CAT:
      return {
        ...state,
        day5: { ...state.day5, selectedCategory: action.payload },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT0_RANK1:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 0) {
          category.rank1 = action.payload;
        }
        return category;
      });
      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT0_RANK2:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 0) {
          category.rank2 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT0_RANK3:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 0) {
          category.rank3 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT0_RANK4:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 0) {
          category.rank4 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT1_LEFT_DECISIONS1:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 1) {
          category.leftDecisions1 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT1_LEFT_DECISIONS2:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 1) {
          category.leftDecisions2 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT1_LEFT_DECISIONS3:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 1) {
          category.leftDecisions3 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT1_LEFT_DECISIONS4:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 1) {
          category.leftDecisions4 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS1:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 1) {
          category.rightDecisions1 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS2:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 1) {
          category.rightDecisions2 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS3:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 1) {
          category.rightDecisions3 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS4:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 1) {
          category.rightDecisions4 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };

    case DAY5_ONCHANGE_CAT2_LEFT_DECISIONS1:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.leftDecisions1 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT2_LEFT_DECISIONS2:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.leftDecisions2 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT2_LEFT_DECISIONS3:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.leftDecisions3 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT2_LEFT_DECISIONS4:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.leftDecisions4 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS1:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.rightDecisions1 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS2:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.rightDecisions2 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS3:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.rightDecisions3 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS4:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.rightDecisions4 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };

    case DAY5_ONCHANGE_CAT2_RANK1:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.rank1 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT2_RANK2:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.rank2 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT2_RANK3:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.rank3 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };
    case DAY5_ONCHANGE_CAT2_RANK4:
      categoriesday5 = state.day5.categories;
      categoriesday5 = categoriesday5.map((category) => {
        if (category.id === 2) {
          category.rank4 = action.payload;
        }
        return category;
      });

      return {
        ...state,
        day5: { ...state.day5, categories: categoriesday5 },
        loading: false,
      };

    case DAY4_VALIDATION_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case DAY5_VALIDATION:
      return {
        ...state,
        loading: true,
      };

    case DAY5_VALIDATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DAY5_VALIDATION_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case DAY8_VALIDATION:
      return {
        ...state,
        loading: true,
      };

    case DAY8_VALIDATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DAY8_VALIDATION_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case Day6_ONCHANGE_CAT3:
      decisionsDay6 = state.Day6.categories;
      decisionsDay6 = decisionsDay6.map((category) => {
        if (category.id === 3) {
          switch (action.payload.id) {
            case 1:
              category.selectedDecision1 = action.payload.value;
              break;
            case 2:
              category.selectedDecision2 = action.payload.value;
              break;
            case 3:
              category.selectedDecision3 = action.payload.value;
              break;
            case 4:
              category.selectedDecision4 = action.payload.value;
              break;
            case 5:
              category.selectedDecision5 = action.payload.value;
              break;
            case 6:
              category.selectedDecision6 = action.payload.value;
              break;

            default:
              break;
          }
        }
        return category;
      });

      return {
        ...state,
        Day6: { ...state.Day6, categories: decisionsDay6 },
        loading: false,
      };

    case Day6_ONCHANGE_CAT2:
      decisionsDay6 = state.Day6.categories;
      decisionsDay6 = decisionsDay6.map((category) => {
        if (category.id === 2) {
          //console.log("category", category);
          switch (action.payload.id) {
            case 1:
              category.selectedDecision1 = action.payload.value;
              break;
            case 2:
              category.selectedDecision2 = action.payload.value;
              break;
            case 3:
              category.selectedDecision3 = action.payload.value;
              break;
            case 4:
              category.selectedDecision4 = action.payload.value;
              break;
            case 5:
              category.selectedDecision5 = action.payload.value;
              break;
            case 6:
              category.selectedDecision6 = action.payload.value;
              break;
            case 7:
              category.selectedDecision7 = action.payload.value;
              break;

            default:
              break;
          }
        }
        return category;
      });

      return {
        ...state,
        Day6: { ...state.Day6, categories: decisionsDay6 },
        loading: false,
      };

    case Day6_ONCHANGE_CAT1:
      decisionsDay6 = state.Day6.categories;
      decisionsDay6 = decisionsDay6.map((category) => {
        if (category.id === 1) {
          //console.log("category", category);
          switch (action.payload.id) {
            case 1:
              category.selectedDecision1 = action.payload.value;
              break;
            case 2:
              category.selectedDecision2 = action.payload.value;
              break;
            case 3:
              category.selectedDecision3 = action.payload.value;
              break;
            case 4:
              category.selectedDecision4 = action.payload.value;
              break;
            case 5:
              category.selectedDecision5 = action.payload.value;
              break;
            case 6:
              category.selectedDecision6 = action.payload.value;
              break;
            case 7:
              category.selectedDecision7 = action.payload.value;
              break;

            default:
              break;
          }
        }
        return category;
      });

      return {
        ...state,
        Day6: { ...state.Day6, categories: decisionsDay6 },
        loading: false,
      };

    case Day6_VALIDATION:
      return {
        ...state,
        loading: true,
      };

    case Day6_VALIDATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case Day6_VALIDATION_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case DAY2_GET_DETAIL:
      return {
        ...state,
        loading: true,
      };

    case DAY2_GET_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        day2: action.payload.day2,
      };

    case DAY2_GET_DETAIL_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case DAY3_GET_DETAIL:
      return {
        ...state,
        loading: true,
      };

    case DAY3_GET_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        day3: { ...state.day3, decisions: action.payload.day3 },
      };

    case DAY3_GET_DETAIL_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case DAY4_GET_DETAIL:
      return {
        ...state,
        loading: true,
      };

    case DAY4_GET_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        day4: action.payload.day4,
      };

    case DAY4_GET_DETAIL_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case DAY5_GET_DETAIL:
      return {
        ...state,
        loading: true,
      };

    case DAY5_GET_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        day5: action.payload.day5,
      };

    case DAY5_GET_DETAIL_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case DAY7_GET_DETAIL:
      return {
        ...state,
        loading: true,
      };

    case DAY7_GET_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        day7: action.payload.day7,
      };

    case DAY7_GET_DETAIL_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case Day10_GET_DETAIL:
      return {
        ...state,
        loading: true,
      };

    case Day10_GET_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        day10: action.payload.day10,
      };

    case Day10_GET_DETAIL_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case Day6_GET_DETAIL:
      return {
        ...state,
        loading: true,
      };

    case Day6_GET_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        Day6: action.payload.Day6,
      };

    case Day6_GET_DETAIL_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case DAY7_VALID_DAY:
      return { ...state, loading: true };

    case DAY7_VALID_DAY_SUCCESS:
      return {
        ...state,
        day7: { ...state.day7, currentLevel: action.payload.currentLevel },
        loading: false,
      };

    case DAY7_VALID_DAY_FAILED:
      return { ...state, error: action.payload.error, loading: false };

    case REHYDRATE:
      return action.payload
        ? {
            ...state,
            ...action.payload.Days,
          }
        : {
            ...state,
          };
    default:
      return { ...state };
  }
};

export default Days;
