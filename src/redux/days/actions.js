import {
  DAY7_ON_CHANGE_CAS_OPTION,
  DAY7_VALID_CAS,
  DAY7_VALID_CAS_SUCCESS,
  DAY7_VALID_CAS_FAILED,
  DAY10_ON_CHANGE_PART1,
  DAY10_ON_CHANGE_PART2,
  DAY10_RESET_PART2,
  DAY2_ON_CHANGE_CAS_OPTION,
  DAY2_VALID_DAY,
  DAY2_VALID_DAY_SUCCESS,
  DAY2_VALID_DAY_FAILED,
  DAY3_UPDATE_DECISIONS,
  DAY3_VALIDATIONS,
  DAY3_VALIDATIONS_SUCCESS,
  DAY3_VALIDATIONS_FAILED,
  DAY4_PART2_ONDRAG,
  DAY4_PART1_ONCHANGE_IS_SELECTED,
  DAY4_VALIDATION,
  DAY4_VALIDATION_FAILED,
  DAY4_VALIDATION_SUCCESS,
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
  DAY7_VALID_DAY,
  DAY7_VALID_DAY_SUCCESS,
  DAY7_VALID_DAY_FAILED,
  DAY7_GET_DETAIL,
  DAY7_GET_DETAIL_SUCCESS,
  DAY7_GET_DETAIL_FAILED,
} from "../../constants/actionTypes";

export const day3UpdateDecisions = (decisions) => ({
  type: DAY3_UPDATE_DECISIONS,
  payload: { decisions },
});

export const onChangeCasValue = (response, axe, _idCas, _idLevel) => ({
  type: DAY7_ON_CHANGE_CAS_OPTION,
  payload: { response, axe, _idCas, _idLevel },
});
export const day2OnChangeCasValue = (categoryId, decisionId) => ({
  type: DAY2_ON_CHANGE_CAS_OPTION,
  payload: { categoryId, decisionId },
});
export const day2ValidDay = (decisions, centerId, callback) => ({
  type: DAY2_VALID_DAY,
  payload: { decisions, centerId, callback },
});
export const day2getDetail = (centerId) => ({
  type: DAY2_GET_DETAIL,
  payload: { centerId },
});
export const day2getDetailSuccess = (day2) => ({
  type: DAY2_GET_DETAIL_SUCCESS,
  payload: { day2 },
});
export const day2getDetailFailed = (error) => ({
  type: DAY2_GET_DETAIL_FAILED,
  payload: { error },
});
export const day2ValidDaySuccess = (callback) => ({
  type: DAY2_VALID_DAY_SUCCESS,
  payload: { callback },
});
export const day2ValidDayFailed = (error) => ({
  type: DAY2_VALID_DAY_FAILED,
  payload: { error },
});

export const onChangePartOneDay10 = (response, index, itemIndex) => ({
  type: DAY10_ON_CHANGE_PART1,
  payload: { response, index, itemIndex },
});

export const onChangePartTwoDay10 = (currentIndex, axe, index, response) => ({
  type: DAY10_ON_CHANGE_PART2,
  payload: { currentIndex, axe, index, response },
});

export const resetPartTwoDay10 = (currentIndex) => ({
  type: DAY10_RESET_PART2,
  payload: { currentIndex },
});

export const validCas = (cas, _idCas, _idLevel) => ({
  type: DAY7_VALID_CAS,
  payload: { _idCas, _idLevel, cas },
});

export const validCasSuccess = (cas, _idCas, _idLevel) => ({
  type: DAY7_VALID_CAS_SUCCESS,
  payload: { _idCas, _idLevel, cas },
});

export const validCasFailed = (error) => ({
  type: DAY7_VALID_CAS_FAILED,
  payload: { error },
});

export const day3Validations = (centerId, list, callback) => ({
  type: DAY3_VALIDATIONS,
  payload: { centerId, list, callback },
});

export const day3ValidationsSuccess = () => ({
  type: DAY3_VALIDATIONS_SUCCESS,
  payload: null,
});

export const day3ValidationsFailed = () => ({
  type: DAY3_VALIDATIONS_FAILED,
  payload: null,
});

export const day4Part2UpdateDecisions = (decisions) => ({
  type: DAY4_PART2_ONDRAG,
  payload: decisions,
});

export const day4Part1ChangeIsSelected = (decision) => ({
  type: DAY4_PART1_ONCHANGE_IS_SELECTED,
  payload: decision,
});

export const validDay4 = (centerId, day4, callback) => ({
  type: DAY4_VALIDATION,
  payload: { centerId, day4, callback },
});

export const validDay4Failed = (error) => ({
  type: DAY4_VALIDATION_FAILED,
  payload: { error },
});

export const validDay4Success = () => ({
  type: DAY4_VALIDATION_SUCCESS,
  payload: null,
});

export const onChangeCatDay5 = (index) => ({
  type: DAY5_ONSELECT_CAT,
  payload: index,
});

export const onChangeCategory0Rank1Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT0_RANK1,
  payload: index,
});

export const onChangeCategory0Rank2Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT0_RANK2,
  payload: index,
});

export const onChangeCategory0Rank3Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT0_RANK3,
  payload: index,
});

export const onChangeCategory0Rank4Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT0_RANK4,
  payload: index,
});
export const onChangeCategory2Rank1Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_RANK1,
  payload: index,
});

export const onChangeCategory2Rank2Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_RANK2,
  payload: index,
});

export const onChangeCategory2Rank3Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_RANK3,
  payload: index,
});

export const onChangeCategory2Rank4Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_RANK4,
  payload: index,
});

export const onChangeCategory1LeftDecisions1Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT1_LEFT_DECISIONS1,
  payload: index,
});

export const onChangeCategory1LeftDecisions2Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT1_LEFT_DECISIONS2,
  payload: index,
});

export const onChangeCategory1LeftDecisions3Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT1_LEFT_DECISIONS3,
  payload: index,
});

export const onChangeCategory1LeftDecisions4Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT1_LEFT_DECISIONS4,
  payload: index,
});

export const onChangeCategory1RightDecisions1Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS1,
  payload: index,
});

export const onChangeCategory1RightDecisions2Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS2,
  payload: index,
});

export const onChangeCategory1RightDecisions3Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS3,
  payload: index,
});

export const onChangeCategory1RightDecisions4Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT1_RIGHT_DECISIONS4,
  payload: index,
});

export const onChangeCategory2LeftDecisions1Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_LEFT_DECISIONS1,
  payload: index,
});

export const onChangeCategory2LeftDecisions2Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_LEFT_DECISIONS2,
  payload: index,
});

export const onChangeCategory2LeftDecisions3Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_LEFT_DECISIONS3,
  payload: index,
});

export const onChangeCategory2LeftDecisions4Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_LEFT_DECISIONS4,
  payload: index,
});

export const onChangeCategory2RightDecisions1Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS1,
  payload: index,
});

export const onChangeCategory2RightDecisions2Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS2,
  payload: index,
});

export const onChangeCategory2RightDecisions3Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS3,
  payload: index,
});

export const onChangeCategory2RightDecisions4Day5 = (index) => ({
  type: DAY5_ONCHANGE_CAT2_RIGHT_DECISIONS4,
  payload: index,
});

export const validDay5 = (centerId, day5, callback) => ({
  type: DAY5_VALIDATION,
  payload: { centerId, day5, callback },
});

export const validDay5Failed = (error) => ({
  type: DAY5_VALIDATION_FAILED,
  payload: { error },
});

export const validDay5Success = () => ({
  type: DAY5_VALIDATION_SUCCESS,
  payload: null,
});

export const validDay6 = (centerId, Day6, callback) => ({
  type: Day6_VALIDATION,
  payload: { centerId, Day6, callback },
});

export const validDay6Failed = (error) => ({
  type: Day6_VALIDATION_FAILED,
  payload: { error },
});

export const validDay6Success = () => ({
  type: Day6_VALIDATION_SUCCESS,
  payload: null,
});
export const onChangeCat3Day6 = (id, value) => ({
  type: Day6_ONCHANGE_CAT3,
  payload: { id, value },
});
export const onChangeCat2Day6 = (id, value) => ({
  type: Day6_ONCHANGE_CAT2,
  payload: { id, value },
});
export const onChangeCat1Day6 = (id, value) => ({
  type: Day6_ONCHANGE_CAT1,
  payload: { id, value },
});
export const validDay8 = (centerId, day8, callback) => ({
  type: DAY8_VALIDATION,
  payload: { centerId, day8, callback },
});

export const validDay8Failed = (error) => ({
  type: DAY8_VALIDATION_FAILED,
  payload: { error },
});

export const validDay8Success = () => ({
  type: DAY8_VALIDATION_SUCCESS,
  payload: null,
});

export const day3getDetail = (centerId) => ({
  type: DAY3_GET_DETAIL,
  payload: { centerId },
});
export const day3getDetailSuccess = (day3) => ({
  type: DAY3_GET_DETAIL_SUCCESS,
  payload: { day3 },
});
export const day3getDetailFailed = (error) => ({
  type: DAY3_GET_DETAIL_FAILED,
  payload: { error },
});

export const day4getDetail = (centerId) => ({
  type: DAY4_GET_DETAIL,
  payload: { centerId },
});
export const day4getDetailSuccess = (day4) => ({
  type: DAY4_GET_DETAIL_SUCCESS,
  payload: { day4 },
});
export const day4getDetailFailed = (error) => ({
  type: DAY4_GET_DETAIL_FAILED,
  payload: { error },
});

export const day5getDetail = (centerId) => ({
  type: DAY5_GET_DETAIL,
  payload: { centerId },
});
export const day5getDetailSuccess = (day5) => ({
  type: DAY5_GET_DETAIL_SUCCESS,
  payload: { day5 },
});
export const day5getDetailFailed = (error) => ({
  type: DAY5_GET_DETAIL_FAILED,
  payload: { error },
});

export const day7getDetail = (centerId) => ({
  type: DAY7_GET_DETAIL,
  payload: { centerId },
});
export const day7getDetailSuccess = (day7) => ({
  type: DAY7_GET_DETAIL_SUCCESS,
  payload: { day7 },
});
export const day7getDetailFailed = (error) => ({
  type: DAY7_GET_DETAIL_FAILED,
  payload: { error },
});

export const Day6getDetail = (centerId) => ({
  type: Day6_GET_DETAIL,
  payload: { centerId },
});
export const Day6getDetailSuccess = (Day6) => ({
  type: Day6_GET_DETAIL_SUCCESS,
  payload: { Day6 },
});
export const Day6getDetailFailed = (error) => ({
  type: Day6_GET_DETAIL_FAILED,
  payload: { error },
});

export const day10Validations = (centerId, day10, callback) => ({
  type: DAY10_VALIDATIONS,
  payload: { centerId, day10, callback },
});

export const day10ValidationsSuccess = () => ({
  type: DAY10_VALIDATIONS_SUCCESS,
  payload: null,
});

export const day10ValidationsFailed = () => ({
  type: DAY10_VALIDATIONS_FAILED,
  payload: null,
});

export const Day10getDetail = (centerId) => ({
  type: Day10_GET_DETAIL,
  payload: { centerId },
});
export const Day10getDetailSuccess = (day10) => ({
  type: Day10_GET_DETAIL_SUCCESS,
  payload: { day10 },
});
export const Day10getDetailFailed = (error) => ({
  type: Day10_GET_DETAIL_FAILED,
  payload: { error },
});

export const day7Validations = (centerId, day7, callback) => ({
  type: DAY7_VALID_DAY,
  payload: { centerId, day7, callback },
});
export const day7ValidationsSuccess = (currentLevel) => ({
  type: DAY7_VALID_DAY_SUCCESS,
  payload: { currentLevel },
});
export const day7ValidationsFailed = (error) => ({
  type: DAY7_VALID_DAY_FAILED,
  payload: { error },
});
