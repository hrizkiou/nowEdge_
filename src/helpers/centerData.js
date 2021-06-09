import algerie from "../assets/images/StrategicGame/algerie.svg";
import burkina_faso from "../assets/images/StrategicGame/burkina_faso.svg";
import burundi from "../assets/images/StrategicGame/burundi.svg";
import cameroon from "../assets/images/StrategicGame/cameroon.svg";
import cote_divoire from "../assets/images/StrategicGame/cote_divoire.svg";
import avatar1 from "../assets/images/StrategicGame/Group 3893.svg";
import Group_3860 from "../assets/images/StrategicGame/Group_3860.svg";
import Group_3897 from "../assets/images/StrategicGame/Group_3897.svg";
import Group_644 from "../assets/images/StrategicGame/Group_644.svg";
import haiti from "../assets/images/StrategicGame/haiti.svg";
import liban from "../assets/images/StrategicGame/liban.svg";
import mali from "../assets/images/StrategicGame/mali.svg";
import maroc from "../assets/images/StrategicGame/maroc.svg";
import niger from "../assets/images/StrategicGame/niger.svg";
import rep_dem_du_congo from "../assets/images/StrategicGame/rep_dem_du_congo.svg";
import senegal from "../assets/images/StrategicGame/senegal.svg";
import suisse from "../assets/images/StrategicGame/suisse.svg";
import tunesie from "../assets/images/StrategicGame/tunesie.svg";

const avatars = [
  {
    id: 1,
    logo: avatar1,
  },
  {
    id: 2,
    logo: Group_3860,
  },
  {
    id: 3,
    logo: Group_644,
  },
  {
    id: 4,
    logo: Group_3897,
  },
];
const countries = [
  {
    id: 1,
    logo: senegal,
  },
  {
    id: 2,
    logo: burkina_faso,
  },
  {
    id: 3,
    logo: algerie,
  },
  {
    id: 4,
    logo: liban,
  },
  {
    id: 5,
    logo: cameroon,
  },
  {
    id: 6,
    logo: burundi,
  },
  {
    id: 7,
    logo: haiti,
  },
  {
    id: 8,
    logo: cote_divoire,
  },
  {
    id: 9,
    logo: niger,
  },
  {
    id: 10,
    logo: mali,
  },
  {
    id: 11,
    logo: rep_dem_du_congo,
  },
  {
    id: 12,
    logo: tunesie,
  },
  {
    id: 13,
    logo: suisse,
  },
  {
    id: 14,
    logo: maroc,
  },
];

const responsibilities = [
  {
    id: 1,
    label: "Médecin",
  },
  {
    id: 2,
    label: "Pharmacien",
  },
  {
    id: 3,
    label: "Analyste",
  },
  {
    id: 4,
    label: "Professeur",
  },
  {
    id: 5,
    label: "Epidemiologiste",
  },
  {
    id: 6,
    label: "Autre",
  }
];

const badges = [
  {
    id: 1,
    label: "Badge Notification",
  },
  {
    id: 2,
    label: "Badge Imputabilité",
  },
  {
    id: 3,
    label: "Badge OMS",
  },
];

const getLogoById = (id, array = avatars) => {
  return array.find((a) => a.id === id);
};

export { avatars, countries, badges, responsibilities, getLogoById };
