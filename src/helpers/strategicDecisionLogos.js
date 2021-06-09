import React, {useEffect, useState} from 'react';
import {ReactComponent as Groupe332} from '../assets/images/groupe332.svg';
import {ReactComponent as Chimney} from '../assets/images/chimney.svg';
import {ReactComponent as Megaphone} from '../assets/images/megaphone.svg';
import {ReactComponent as Setup} from '../assets/images/setup.svg';
import { useTranslation } from 'react-i18next';

  const GetTypeAndLogo = (type) => {

  const { t } = useTranslation();
    switch (type) {

     
      case "r_d_capacity":
        return {
          typeName:  t("stratEdge.config.AnsS.RDCapacity"),
          logo:  <Chimney className="sim-tab-icon" />
        }
      case "r_d_cost":
        return {
          typeName: t("stratEdge.config.AnsS.RDCost"),
          logo: <Groupe332 className="sim-tab-icon" />
        }
      case "human_resources":
        return {
          typeName: t("stratEdge.config.AnsS.RessourceHumain"),
          logo: <i className="  fas fa-users sim-tab-icon-v"></i>
        }
      case "marketing":
        return {
          typeName: t("stratEdge.config.AnsS.marketing"),
          logo:  <Megaphone className="sim-tab-icon" />
        }
      case "maintenance":
        return {
          typeName: t("stratEdge.config.AnsS.maintenance"),
          logo:  <Setup className="sim-tab-icon" />
        }
    
      default:
        return {
          typeName: "R&D cout",
          logo: <Groupe332 className="sim-tab-icon" />
        }
    }
  }

  export {GetTypeAndLogo}