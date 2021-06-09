import { all, call, fork, put, takeEvery } from "redux-saga/effects";

import { Day10_GET_DETAIL, DAY10_VALIDATIONS, DAY2_GET_DETAIL, DAY2_VALID_DAY, DAY3_GET_DETAIL, DAY3_VALIDATIONS, DAY4_GET_DETAIL, DAY4_VALIDATION, DAY5_GET_DETAIL, DAY5_VALIDATION, Day6_GET_DETAIL, Day6_VALIDATION, DAY7_GET_DETAIL, DAY7_VALID_CAS, DAY7_VALID_DAY, DAY8_VALIDATION } from "../../constants/actionTypes";
import { day3 } from "../../helpers/daysResponse";
import { closeDaySuccess } from "../pvgame/actions";
import { Day10getDetailFailed, Day10getDetailSuccess, day10ValidationsFailed, day10ValidationsSuccess, day2getDetailFailed, day2getDetailSuccess, day2ValidDayFailed, day2ValidDaySuccess, day3getDetailFailed, day3getDetailSuccess, day3ValidationsFailed, day3ValidationsSuccess, day4getDetailFailed, day4getDetailSuccess, day5getDetailFailed, day5getDetailSuccess, Day6getDetailFailed, Day6getDetailSuccess, day7getDetailFailed, day7getDetailSuccess, day7ValidationsFailed, day7ValidationsSuccess, validCasFailed, validCasSuccess, validDay4Failed, validDay4Success, validDay5Failed, validDay5Success, validDay6Failed, validDay6Success, validDay8Failed, validDay8Success } from "./actions";
import { activateImputabilityBadgeService, closeDayService, getDetailsService, responsesDay7, saveDecisionsService, saveDetailsService, validCasService } from "./service";

function* validCasSaga({ payload: { cas, _idCas, _idLevel } }) {
  try {
    const response = yield call(validCasService, cas, _idCas, _idLevel);
    yield put(
      validCasSuccess(response.cas, response._idCas, response._idLevel)
    );
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(validCasFailed(message));
  }
}

function* validDay2Saga({ payload: { decisions, centerId, callback } }) {
  try {
    //console.log("decisions, centerId, callback", decisions, centerId, callback);

    const d = decisions.categories.map((c) => c.decisionId);

    const response = yield call(saveDecisionsService, 2, d, centerId);
    //console.log("response *******************", response);
    const responseDetail = yield call(
      saveDetailsService,
      2,
      centerId,
      JSON.stringify(decisions)
    );
    //console.log("response *******************", responseDetail);
    const responseCloseDay = yield call(closeDayService, 2, centerId);
    //console.log("response *******************", responseCloseDay);
    yield put(closeDaySuccess(responseCloseDay));
    yield put(day2ValidDaySuccess());
    callback();
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(day2ValidDayFailed(message));
  }
}

function* day3validationSaga({ payload: { centerId, list, callback } }) {
  try {
    //console.log("decisions, centerId, callback", list, callback);

    const correctResponse = [];
    for (const d of day3) {
      const day = list.find((l) => l.id === d.id);
      if (day.category === d.category) correctResponse.push(d.id);
    }

    //console.log("########********++++++++++#########", correctResponse);

    const response = yield call(
      saveDecisionsService,
      3,
      correctResponse,
      centerId
    );
    //console.log("response *******************", response);

    const responseDetail = yield call(
      saveDetailsService,
      3,
      centerId,
      JSON.stringify(list)
    );

    //console.log("response *******************", responseDetail);

    const responseCloseDay = yield call(closeDayService, 3, centerId);
    //console.log("response *******************", responseCloseDay);

    yield put(closeDaySuccess(responseCloseDay));
    yield put(day3ValidationsSuccess());
    callback();
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(day3ValidationsFailed(message));
  }
}

function* day4validationSaga({ payload: { centerId, day4, callback } }) {
  try {
    //console.log("decisions, centerId, callback", day4, callback, centerId);

    const correctResponsePart1 = [];
    const correctResponsePart2 = [];

    const correctDecision1 = day4.part1.decisions.find((d) => d.id === 148);
    const correctDecision2 = day4.part1.decisions.find((d) => d.id === 150);

    if (correctDecision1.isSelected)
      correctResponsePart1.push(correctDecision1.id);
    if (correctDecision2.isSelected)
      correctResponsePart1.push(correctDecision2.id);

    for (const d of day4.part2.decisions) {
      if (d.category_v !== "non" && d.category_v === d.category) {
        correctResponsePart2.push(d.id);
      }
    }
    const responsePart1 = yield call(
      saveDecisionsService,
      4,
      [...correctResponsePart1, ...correctResponsePart2],
      centerId
    );

    const responseDetailPart1 = yield call(
      saveDetailsService,
      4,
      centerId,
      JSON.stringify(day4)
    );

    //console.log(
    //   "responseDetailPart2 ++++++++++++++++++++",
    //   responseDetailPart1,
    //   responsePart1
    // );

    const responseCloseDay = yield call(closeDayService, 4, centerId);
    //console.log("response *******************", responseCloseDay);

    yield put(closeDaySuccess(responseCloseDay));
    yield put(validDay4Success());
    callback();
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(validDay4Failed(message));
  }
}

function* day5validationSaga({ payload: { centerId, day5, callback } }) {
  try {
    //console.log("decisions, centerId, callback", day5, callback, centerId);

    const correctResponse = [];
    switch (day5.selectedCategory) {
      case 0:
        const decisions0 = day5.categories.find((cat) => cat.id === 0);
        if (decisions0.rank1 === 173) correctResponse.push(decisions0.rank1);
        if (decisions0.rank2 === 174) correctResponse.push(decisions0.rank2);
        if (decisions0.rank3 === 175) correctResponse.push(decisions0.rank3);
        if (decisions0.rank4 === 176) correctResponse.push(decisions0.rank4);

        break;
      case 1:
        const decisions1 = day5.categories.find((cat) => cat.id === 1);
        const d1 = [];
        d1.push(decisions1.rightDecisions1);
        d1.push(decisions1.rightDecisions2);
        d1.push(decisions1.rightDecisions3);
        d1.push(decisions1.rightDecisions4);
        d1.push(decisions1.leftDecisions1);
        d1.push(decisions1.leftDecisions2);
        d1.push(decisions1.leftDecisions3);
        d1.push(decisions1.leftDecisions4);
        if (d1.some((s) => s === 165)) correctResponse.push(165);
        if (d1.some((s) => s === 166)) correctResponse.push(166);
        if (d1.some((s) => s === 167)) correctResponse.push(167);
        if (d1.some((s) => s === 168)) correctResponse.push(168);
        if (d1.some((s) => s === 169)) correctResponse.push(169);
        if (d1.some((s) => s === 170)) correctResponse.push(170);
        if (d1.some((s) => s === 171)) correctResponse.push(171);
        if (d1.some((s) => s === 172)) correctResponse.push(172);
        break;
      case 2:
        const decisions2 = day5.categories.find((cat) => cat.id === 2);
        if (decisions2.rank1 === 161) correctResponse.push(decisions2.rank1);
        if (decisions2.rank2 === 162) correctResponse.push(decisions2.rank2);
        if (decisions2.rank3 === 163) correctResponse.push(decisions2.rank3);
        if (decisions2.rank4 === 164) correctResponse.push(decisions2.rank4);

        const d = [];
        d.push(decisions2.rightDecisions1);
        d.push(decisions2.rightDecisions2);
        d.push(decisions2.rightDecisions3);
        d.push(decisions2.rightDecisions4);
        d.push(decisions2.leftDecisions1);
        d.push(decisions2.leftDecisions2);
        d.push(decisions2.leftDecisions3);
        d.push(decisions2.leftDecisions4);
        if (d.some((s) => s === 153)) correctResponse.push(153);
        if (d.some((s) => s === 154)) correctResponse.push(154);
        if (d.some((s) => s === 155)) correctResponse.push(155);
        if (d.some((s) => s === 156)) correctResponse.push(156);
        if (d.some((s) => s === 157)) correctResponse.push(157);
        if (d.some((s) => s === 158)) correctResponse.push(158);
        if (d.some((s) => s === 159)) correctResponse.push(159);
        if (d.some((s) => s === 160)) correctResponse.push(160);
        break;

      default:
        break;
    }

    const response = yield call(
      saveDecisionsService,
      5,
      correctResponse,
      centerId
    );

    //console.log("response ................", response);

    const responseDetail = yield call(
      saveDetailsService,
      5,
      centerId,
      JSON.stringify(day5)
    );
    //console.log("responseDetail ................", responseDetail);

    const responseCloseDay = yield call(closeDayService, 5, centerId);
    //console.log("response *******************", responseCloseDay);

    yield put(closeDaySuccess(responseCloseDay));
    yield put(validDay5Success());
    callback();
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(validDay5Failed(message));
  }
}

function* Day6validationSaga({ payload: { centerId, Day6, callback } }) {
  try {
    //console.log("decisions, centerId, callback", Day6, callback, centerId);

    const correctResponse = [];

    Day6.categories.map((c) => {
      correctResponse.push(c.selectedDecision1);
      correctResponse.push(c.selectedDecision2);
      correctResponse.push(c.selectedDecision3);
      correctResponse.push(c.selectedDecision4);
      correctResponse.push(c.selectedDecision5);
      correctResponse.push(c.selectedDecision6);
      if (c.id !== 3) correctResponse.push(c.selectedDecision7);
    });
    //console.log("rescorrectResponseponse ................", correctResponse);

    const response = yield call(
      saveDecisionsService,
      6,
      correctResponse,
      centerId
    );

    //console.log("response ................", response);

    const responseDetail = yield call(
      saveDetailsService,
      6,
      centerId,
      JSON.stringify(Day6)
    );
    //console.log("responseDetail ................", responseDetail);

    const responseCloseDay = yield call(closeDayService, 6, centerId);
    //console.log("response *******************", responseCloseDay);

    yield put(closeDaySuccess(responseCloseDay));
    yield put(validDay6Success());
    callback();
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(validDay6Failed(message));
  }
}

function* Day7validationSaga({ payload: { centerId, day7, callback } }) {
  try {
    // //console.log("decisions, centerId, callback", day7, day7.currentLevel);

    const level1 = day7.levels.find((l) => l._id === 1);
    const level2 = day7.levels.find((l) => l._id === 2);
    const level3 = day7.levels.find((l) => l._id === 3);

    let currentLevel = 1;
    if (level1.isValid === 1) {
      if (level2.isValid === 1) {
        if (level3.isValid === 1) {
          currentLevel = 3;
        } else {
          currentLevel = 2;
        }
      } else {
        currentLevel = 1;
      }
    } else {
      currentLevel = 1;
    }

    const correctResponse = [];

    let casData = [];

    day7.levels
      .filter((l) => l.isValid !== 2 && l.isValid !== -1)
      .map((l) => {
        l.cas.map((c) => casData.push(c));
      });

    // casData = casData.filter((c) => c.isValid === 1);

    for (const cas of casData) {
      const responseCas = responsesDay7.find((r) => r.id === cas._id);

      if (cas.autresEtiologies.response === responseCas.autresEtiologies)  correctResponse.push(responseCas.autresEtiologiesId);
      if (cas.classificationEIM.response === responseCas.classificationEIM)  correctResponse.push(responseCas.classificationEIMId);
      if (cas.delai.response === responseCas.delai)   correctResponse.push(responseCas.delaiId);
      if (cas.evocateurRole.response === responseCas.evocateurRole)  correctResponse.push(responseCas.evocateurRoleId);
      if (cas.evolution.response === responseCas.evolution)  correctResponse.push(responseCas.evolutionId);
      if (cas.facteursFav.response === responseCas.facteursFav)  correctResponse.push(responseCas.facteursFavId);
      if (cas.inputOMS.response === responseCas.inputOMS)  correctResponse.push(responseCas.inputOMSId);
      if (cas.rechallenge.response === responseCas.rechallenge)  correctResponse.push(responseCas.rechallengeId);
      if (cas.scoreBiblio.response === responseCas.scoreBiblio)  correctResponse.push(responseCas.scoreBiblioId);
      if (cas.testSpecifiques.response === responseCas.testSpecifiques)  correctResponse.push(responseCas.testSpecifiquesId);
      if (responseCas.isComplicated) {
        if (cas.autresEtiologies2.response === responseCas.autresEtiologies2)
          correctResponse.push(responseCas.autresEtiologiesId2);
        if (cas.classificationEIM2.response === responseCas.classificationEIM2)
          correctResponse.push(responseCas.classificationEIMId2);
        if (cas.delai2.response === responseCas.delai2)
          correctResponse.push(responseCas.delaiId2);
        if (cas.evocateurRole2.response === responseCas.evocateurRole2)
          correctResponse.push(responseCas.evocateurRoleId2);
        if (cas.evolution2.response === responseCas.evolution2)
          correctResponse.push(responseCas.evolutionId2);
        if (cas.facteursFav2.response === responseCas.facteursFav2)
          correctResponse.push(responseCas.facteursFavId2);
        if (cas.inputOMS2.response === responseCas.inputOMS2)
          correctResponse.push(responseCas.inputOMSId2);
        if (cas.rechallenge2.response === responseCas.rechallenge2)
          correctResponse.push(responseCas.rechallengeId2);
        if (cas.scoreBiblio2.response === responseCas.scoreBiblio2)
          correctResponse.push(responseCas.scoreBiblioId2);
        if (cas.testSpecifiques2.response === responseCas.testSpecifiques2)
          correctResponse.push(responseCas.testSpecifiquesId2);
      }
    }
    // //console.log('correctResponse', correctResponse)
//  return 
    const response = yield call(
      saveDecisionsService,
      7,
      correctResponse,
      centerId
    );

    //console.log("response ................", response);
     
    const responseDetail = yield call(
      saveDetailsService,
      7,
      centerId,
      JSON.stringify(day7)
    );
    //console.log("responseDetail ................", responseDetail);

    // if (currentLevel === 3) {
    const responseImputabilityBadge = yield call(
      activateImputabilityBadgeService,
      centerId,
      currentLevel - 1
    );

    const responseCloseDay = yield call(closeDayService, 7, centerId);
    //console.log("response *******************", responseCloseDay);

    //console.log("response *******************", responseImputabilityBadge);
    responseImputabilityBadge.status === 1 &&
      responseCloseDay.badges.push(responseImputabilityBadge);
    // }

    yield put(closeDaySuccess(responseCloseDay));
    yield put(day7ValidationsSuccess(currentLevel));
    callback();
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(day7ValidationsFailed(message));
  }
}

function* day8validationSaga({ payload: { centerId, day8, callback } }) {
  try {
    //console.log("decisions, centerId, callback", day8, callback, centerId);

    const correctResponse = [];

    day8.dataMedicaments.map((dm) => {
      let input = "";
      switch (dm.title) {
        case "paracetamol":
          dm.input.map((s) => {
            input += s;
          });
          if (input.toUpperCase() === "N02BE01") correctResponse.push(403);
          break;
        case "zyloric":
          dm.input.map((s) => {
            input += s;
          });
          if (input.toUpperCase() === "M04AA01") correctResponse.push(410);

          break;
        case "artotec":
          dm.input.map((s) => {
            input += s;
          });
          if (input.toUpperCase() === "M01AB55") correctResponse.push(404);

          break;
        case "amoxil":
          dm.input.map((s) => {
            input += s;
          });
          if (input.toUpperCase() === "N03AX09") correctResponse.push(411);

          break;
        case "amoxicilline":
          dm.input.map((s) => {
            input += s;
          });
          if (input.toUpperCase() === "J01CA04") correctResponse.push(409);

          break;
        case "brexin":
          dm.input.map((s) => {
            input += s;
          });
          if (input.toUpperCase() === "M01AC01") correctResponse.push(405);

          break;
        case "dextran":
          dm.input.map((s) => {
            input += s;
          });
          if (input.toUpperCase() === "B03AC06") correctResponse.push(406);

          break;
        case "depakine":
          dm.input.map((s) => {
            input += s;
          });
          if (input.toUpperCase() === "N03AG01") correctResponse.push(407);

          break;
        case "anafranil":
          dm.input.map((s) => {
            input += s;
          });
          if (input.toUpperCase() === "N06AA04") correctResponse.push(408);

          break;

        default:
          break;
      }
      //console.log("#################", dm.title, input);
    });

    day8.effetsIndesirables.map((ei) => {
      switch (ei.title) {
        case "augmentation":
          if (ei.slectedPT === 412) correctResponse.push(412);
          if (ei.slectedSOC === 413) correctResponse.push(413);
          break;

        case "metrorragies":
          if (ei.slectedPT === 414) correctResponse.push(414);
          if (ei.slectedSOC === 415) correctResponse.push(415);
          break;

        case "vomissements":
          if (ei.slectedPT === 416) correctResponse.push(416);
          if (ei.slectedSOC === 417) correctResponse.push(417);
          break;

        case "douleurs":
          if (ei.slectedPT === 418) correctResponse.push(418);
          if (ei.slectedSOC === 417) correctResponse.push(419);
          break;

        case "choc":
          if (ei.slectedPT === 420) correctResponse.push(420);
          if (ei.slectedSOC === 421) correctResponse.push(421);
          break;

        case "eruption":
          if (ei.slectedPT === 422) correctResponse.push(422);
          if (ei.slectedSOC === 425) correctResponse.push(423);
          break;

        case "cheilite":
          if (ei.slectedPT === 424) correctResponse.push(424);
          if (ei.slectedSOC === 425) correctResponse.push(425);
          break;

        case "poly":
          if (ei.slectedPT === 426) correctResponse.push(426);
          if (ei.slectedSOC === 427) correctResponse.push(427);
          break;

        case "syndrome":
          if (ei.slectedPT === 428) correctResponse.push(428);
          if (ei.slectedSOC === 425) correctResponse.push(429);
          break;

        default:
          break;
      }
    });

    //console.log("##########correctResponse#######", correctResponse);

    const response = yield call(
      saveDecisionsService,
      8,
      correctResponse,
      centerId
    );

    //console.log("response ................", response);

    const responseDetail = yield call(
      saveDetailsService,
      8,
      centerId,
      JSON.stringify(day8)
    );
    //console.log("responseDetail ................", responseDetail);

    const responseCloseDay = yield call(closeDayService, 8, centerId);
    //console.log("response *******************", responseCloseDay);

    yield put(closeDaySuccess(responseCloseDay));

    yield put(validDay8Success());
    callback();
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(validDay8Failed(message));
  }
}

function* day10validationSaga({ payload: { centerId, day10, callback } }) {
  try {
    //console.log("decisions, centerId, callback", day10, callback, centerId);

    const correctResponse = [];

    const responsePart1Ids = [
      day10.part1["1"]["1"],
      day10.part1["1"]["2"],
      day10.part1["1"]["3"],
      day10.part1["1"]["5"],
      day10.part1["1"]["6"],
      day10.part1["1"]["7"],
      day10.part1["2"]["1"],
      day10.part1["2"]["2"],
      day10.part1["2"]["3"],
      day10.part1["2"]["4"],
      day10.part1["2"]["5"],
      day10.part1["2"]["6"],
      day10.part1["2"]["7"],
      day10.part1["3"]["1"],
      day10.part1["3"]["2"],
      day10.part1["3"]["3"],
      day10.part1["3"]["4"],
      day10.part1["3"]["5"],
      day10.part1["3"]["6"],
      day10.part1["3"]["7"],
      day10.part1["3"]["8"],
      day10.part1["3"]["9"],
    ];

    //console.log('day10.part1["1"]["1"]', responsePart1Ids);

    const correctResponsePart1Ids = [
      639,
      640,
      641,
      642,
      643,
      644,
      651,
      652,
      653,
      654,
      655,
      656,
      657,
      664,
      665,
      666,
      667,
      668,
      669,
      670,
      671,
      672,
    ];

    for (const id of correctResponsePart1Ids) {
      const res = responsePart1Ids.find((rp) => rp === id);
      if (res) {
        correctResponse.push(id);
      }
    }

    if (day10.part2["1"]["1"]["1"]) correctResponse.push(680);
    if (day10.part2["1"]["1"]["2"]) correctResponse.push(681);
    if (day10.part2["1"]["3"]["1"]) correctResponse.push(682);
    if (day10.part2["1"]["4"]["2"]) correctResponse.push(683);
    if (day10.part2["1"]["7"]["1"]) correctResponse.push(684);
    if (day10.part2["1"]["8"]["3"]) correctResponse.push(685);
    if (day10.part2["1"]["8"]["1"]) correctResponse.push(686);
    if (day10.part2["1"]["9"]["1"]) correctResponse.push(687);
    if (day10.part2["1"]["10"]["1"]) correctResponse.push(688);

    if (day10.part2["2"]["6"]["1"]) correctResponse.push(689);
    if (day10.part2["2"]["6"]["2"]) correctResponse.push(690);
    if (day10.part2["2"]["4"]["1"]) correctResponse.push(691);
    if (day10.part2["2"]["4"]["2"]) correctResponse.push(692);
    if (day10.part2["2"]["8"]["3"]) correctResponse.push(693);
    if (day10.part2["2"]["9"]["2"]) correctResponse.push(694);
    if (day10.part2["2"]["9"]["1"]) correctResponse.push(695);

    if (day10.part2["3"]["1"]["2"]) correctResponse.push(696);
    if (day10.part2["3"]["4"]["1"]) correctResponse.push(697);
    if (day10.part2["3"]["4"]["2"]) correctResponse.push(698);
    if (day10.part2["3"]["6"]["2"]) correctResponse.push(699);
    if (day10.part2["3"]["6"]["1"]) correctResponse.push(700);
    if (day10.part2["3"]["9"]["2"]) correctResponse.push(701);
    if (day10.part2["3"]["9"]["1"]) correctResponse.push(702);

    //console.log("##########correctResponse#######", correctResponse);

    const response = yield call(
      saveDecisionsService,
      10,
      correctResponse,
      centerId
    );

    //console.log("response ................", response);

    const responseDetail = yield call(
      saveDetailsService,
      10,
      centerId,
      JSON.stringify(day10)
    );
    //console.log("responseDetail ................", responseDetail);

    const responseCloseDay = yield call(closeDayService, 10, centerId);
    //console.log("response *******************", responseCloseDay);

    yield put(closeDaySuccess(responseCloseDay));

    yield put(day10ValidationsSuccess());
    callback();
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(day10ValidationsFailed(message));
  }
}

function* day2getDetailSaga({ payload: { centerId } }) {
  try {
    const responseDetail = yield call(getDetailsService, 2, centerId);
    //console.log("responseDetail ................", responseDetail);

    yield put(day2getDetailSuccess(responseDetail.details));
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(day2getDetailFailed(message));
  }
}

function* day3getDetailSaga({ payload: { centerId } }) {
  try {
    const responseDetail = yield call(getDetailsService, 3, centerId);
    //console.log("responseDetail ................", responseDetail);

    yield put(day3getDetailSuccess(responseDetail.details));
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(day3getDetailFailed(message));
  }
}

function* day4getDetailSaga({ payload: { centerId } }) {
  try {
    const responseDetail = yield call(getDetailsService, 4, centerId);
    //console.log("responseDetail ................", responseDetail);

    yield put(day4getDetailSuccess(responseDetail.details));
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(day4getDetailFailed(message));
  }
}

function* day7getDetailSaga({ payload: { centerId } }) {
  try {
    const responseDetail = yield call(getDetailsService, 7, centerId);
    //console.log("responseDetail ................", responseDetail);

    yield put(day7getDetailSuccess(responseDetail.details));
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(day7getDetailFailed(message));
  }
}

function* day5getDetailSaga({ payload: { centerId } }) {
  try {
    const responseDetail = yield call(getDetailsService, 5, centerId);
    //console.log("responseDetail ................", responseDetail);

    yield put(day5getDetailSuccess(responseDetail.details));
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(day5getDetailFailed(message));
  }
}

function* Day6getDetailSaga({ payload: { centerId } }) {
  try {
    const responseDetail = yield call(getDetailsService, 6, centerId);
    //console.log("responseDetail ................", responseDetail);

    yield put(Day6getDetailSuccess(responseDetail.details));
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(Day6getDetailFailed(message));
  }
}

function* Day10getDetailSaga({ payload: { centerId } }) {
  try {
    const responseDetail = yield call(getDetailsService, 10, centerId);
    //console.log("responseDetail ................", responseDetail);

    yield put(Day10getDetailSuccess(responseDetail.details));
  } catch (error) {
    //console.log("error ................", error);
    let message;
    switch (error.status) {
      case 500:
        message = "Internal Server Error";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = error;
    }
    yield put(Day10getDetailFailed(message));
  }
}

export function* watchDay10GetDetails() {
  yield takeEvery(Day10_GET_DETAIL, Day10getDetailSaga);
}

export function* watchDay6GetDetails() {
  yield takeEvery(Day6_GET_DETAIL, Day6getDetailSaga);
}

export function* watchDay7GetDetails() {
  yield takeEvery(DAY7_GET_DETAIL, day7getDetailSaga);
}

export function* watchDay5GetDetails() {
  yield takeEvery(DAY5_GET_DETAIL, day5getDetailSaga);
}

export function* watchDay4GetDetails() {
  yield takeEvery(DAY4_GET_DETAIL, day4getDetailSaga);
}

export function* watchDay2GetDetails() {
  yield takeEvery(DAY2_GET_DETAIL, day2getDetailSaga);
}

export function* watchDay3GetDetails() {
  yield takeEvery(DAY3_GET_DETAIL, day3getDetailSaga);
}

export function* watchValidDay8() {
  yield takeEvery(DAY8_VALIDATION, day8validationSaga);
}

export function* watchValidDay6() {
  yield takeEvery(Day6_VALIDATION, Day6validationSaga);
}

export function* watchValidDay7() {
  yield takeEvery(DAY7_VALID_DAY, Day7validationSaga);
}

export function* watchValidDay5() {
  yield takeEvery(DAY5_VALIDATION, day5validationSaga);
}

export function* watchValidDay4() {
  yield takeEvery(DAY4_VALIDATION, day4validationSaga);
}

export function* watchValidDay10() {
  yield takeEvery(DAY10_VALIDATIONS, day10validationSaga);
}
export function* watchValidDay3() {
  yield takeEvery(DAY3_VALIDATIONS, day3validationSaga);
}
export function* watchValidDay2() {
  yield takeEvery(DAY2_VALID_DAY, validDay2Saga);
}

export function* watchValidCas() {
  yield takeEvery(DAY7_VALID_CAS, validCasSaga);
}

function* DaysSaga() {
  yield all([
    fork(watchValidCas),
    fork(watchValidDay2),
    fork(watchValidDay3),
    fork(watchValidDay4),
    fork(watchValidDay5),
    fork(watchValidDay6),
    fork(watchValidDay7),
    fork(watchValidDay8),
    fork(watchValidDay10),
    fork(watchDay2GetDetails),
    fork(watchDay3GetDetails),
    fork(watchDay4GetDetails),
    fork(watchDay5GetDetails),
    fork(watchDay6GetDetails),
    fork(watchDay7GetDetails),
    fork(watchDay10GetDetails),
  ]);
}

export default DaysSaga;
