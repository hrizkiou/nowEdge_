const data = {
  initialData: {
    asset_classes: [
      {
        description: 'An equity market is a market in which shares of companies are issued and traded, either through exchanges or over-the-counter markets. Also known as the stock market, it is one of the most vital areas of a market economy. It gives companies access to capital to grow their business, and investors a piece of ownership in a company with the potential to realize gains in their investment based on the company s future performance.',
        id: 1,
        name: 'Equity'
      },
      {
        description: 'The bond market (also debt market or credit market) is a financial market where participants can issue new debt, known as the primary market, or buy and sell debt securities, known as the secondary market. This is usually in the form of bonds, but it may include notes, bills, and so for public and private expenditures. The bond market has largely been dominated by the United States, which accounts for about 39% of the market. As of 2017, the size of the worldwide bond market (total debt outstanding) is estimated at $100.13 trillion, according to Securities Industry and Financial Markets Association',
        id: 2,
        name: 'Bonds'
      }
    ],
    assets: [
      {
        asset_class_id: 1,
        id: 1,
        market_id: 1,
        name: 'Air Liquide',
        sector: 'Basic Materials',
        ticker: 'AI.PA'
      },
      {
        asset_class_id: 1,
        id: 2,
        market_id: 1,
        name: 'Airbus',
        sector: 'Industrials',
        ticker: 'AIR.PA'
      },
      {
        asset_class_id: 1,
        id: 3,
        market_id: 1,
        name: 'Alstom',
        sector: 'Industrials',
        ticker: 'ALO.PA'
      },
      {
        asset_class_id: 1,
        id: 4,
        market_id: 1,
        name: 'Arcelor Mittal',
        sector: 'Basic Materials',
        ticker: 'MT.AS'
      },
      {
        asset_class_id: 1,
        id: 5,
        market_id: 1,
        name: 'Atos',
        sector: 'Technology',
        ticker: 'ATO.PA'
      },
      {
        asset_class_id: 1,
        id: 6,
        market_id: 1,
        name: 'Axa',
        sector: 'Financial Services',
        ticker: 'CS.PA'
      },
      {
        asset_class_id: 1,
        id: 7,
        market_id: 1,
        name: 'Bnp Paribas',
        sector: 'Financial Services',
        ticker: 'BNP.PA'
      },
      {
        asset_class_id: 1,
        id: 8,
        market_id: 1,
        name: 'Bouygues',
        sector: 'Industrials',
        ticker: 'EN.PA'
      },
      {
        asset_class_id: 1,
        id: 9,
        market_id: 1,
        name: 'CapGemini',
        sector: 'Technology',
        ticker: 'CAP.PA'
      },
      {
        asset_class_id: 1,
        id: 10,
        market_id: 1,
        name: 'Carrefour',
        sector: 'Consumer Defensive',
        ticker: 'CA.PA'
      },
      {
        asset_class_id: 1,
        id: 11,
        market_id: 1,
        name: 'Credit Agricole',
        sector: 'Financial Services',
        ticker: 'ACA.PA'
      },
      {
        asset_class_id: 1,
        id: 12,
        market_id: 1,
        name: 'Danone',
        sector: 'Consumer Defensive',
        ticker: 'BN.PA'
      },
      {
        asset_class_id: 1,
        id: 13,
        market_id: 1,
        name: 'Dassault Systemes',
        sector: 'Technology',
        ticker: 'DSY.PA'
      },
      {
        asset_class_id: 1,
        id: 14,
        market_id: 1,
        name: 'Engie',
        sector: 'Utilities',
        ticker: 'ENGI.PA'
      },
      {
        asset_class_id: 1,
        id: 15,
        market_id: 1,
        name: 'Essilor',
        sector: 'Healthcare',
        ticker: 'EI.PA'
      },
      {
        asset_class_id: 1,
        id: 16,
        market_id: 1,
        name: 'Hermes',
        sector: 'Consumer Cyclical',
        ticker: 'RMS.PA'
      },
      {
        asset_class_id: 1,
        id: 17,
        market_id: 1,
        name: 'Kering',
        sector: 'Consumer Cyclical',
        ticker: 'KER.PA'
      },
      {
        asset_class_id: 1,
        id: 18,
        market_id: 1,
        name: 'L Oréal',
        sector: 'Consumer Defensive',
        ticker: 'OR.PA'
      },
      {
        asset_class_id: 1,
        id: 19,
        market_id: 1,
        name: 'Legrand SA',
        sector: 'Industrials',
        ticker: 'LR.PA'
      },
      {
        asset_class_id: 1,
        id: 20,
        market_id: 1,
        name: 'LVMH',
        sector: 'Consumer Cyclical',
        ticker: 'MC.PA'
      },
      {
        asset_class_id: 1,
        id: 21,
        market_id: 1,
        name: 'Michelin',
        sector: 'Industrials',
        ticker: 'ML.PA'
      },
      {
        asset_class_id: 1,
        id: 22,
        market_id: 1,
        name: 'Orange',
        sector: 'Communication Services',
        ticker: 'ORA.PA'
      },
      {
        asset_class_id: 1,
        id: 23,
        market_id: 1,
        name: 'Pernod Ricard',
        sector: 'Consumer Defensive',
        ticker: 'RI.PA'
      },
      {
        asset_class_id: 1,
        id: 24,
        market_id: 1,
        name: 'Publicis',
        sector: 'Communication Services',
        ticker: 'PUB.PA'
      },
      {
        asset_class_id: 1,
        id: 25,
        market_id: 1,
        name: 'Renault',
        sector: 'Consumer Cyclical',
        ticker: 'RNO.PA'
      },
      {
        asset_class_id: 1,
        id: 26,
        market_id: 1,
        name: 'Safran',
        sector: 'Industrials',
        ticker: 'SAF.PA'
      },
      {
        asset_class_id: 1,
        id: 27,
        market_id: 1,
        name: 'Saint Gobain',
        sector: 'Industrials',
        ticker: 'SGO.PA'
      },
      {
        asset_class_id: 1,
        id: 28,
        market_id: 1,
        name: 'Sanofi',
        sector: 'Healthcare',
        ticker: 'SAN.PA'
      },
      {
        asset_class_id: 1,
        id: 29,
        market_id: 1,
        name: 'Schneider Electric',
        sector: 'Industrials',
        ticker: 'SU.PA'
      },
      {
        asset_class_id: 1,
        id: 30,
        market_id: 1,
        name: 'Societe Generale',
        sector: 'Financial Services',
        ticker: 'GLE.PA'
      },
      {
        asset_class_id: 1,
        id: 31,
        market_id: 1,
        name: 'Stellantis',
        sector: 'Consumer Cyclical',
        ticker: 'STLA.PA'
      },
      {
        asset_class_id: 1,
        id: 32,
        market_id: 1,
        name: 'Stmicroelectronics',
        sector: 'Technology',
        ticker: 'STM.PA'
      },
      {
        asset_class_id: 1,
        id: 33,
        market_id: 1,
        name: 'Teleperformance',
        sector: 'Industrials',
        ticker: 'TEP.PA'
      },
      {
        asset_class_id: 1,
        id: 34,
        market_id: 1,
        name: 'Thales',
        sector: 'Industrials',
        ticker: 'HO.PA'
      },
      {
        asset_class_id: 1,
        id: 35,
        market_id: 1,
        name: 'Total',
        sector: 'Energy',
        ticker: 'FP.PA'
      },
      {
        asset_class_id: 1,
        id: 36,
        market_id: 1,
        name: 'Unibail Rodamco Wes',
        sector: 'Real Estate',
        ticker: 'URW.AS'
      },
      {
        asset_class_id: 1,
        id: 37,
        market_id: 1,
        name: 'Veolia Environ.',
        sector: 'Industrials',
        ticker: 'VIE.PA'
      },
      {
        asset_class_id: 1,
        id: 38,
        market_id: 1,
        name: 'Vinci',
        sector: 'Industrials',
        ticker: 'DG.PA'
      },
      {
        asset_class_id: 1,
        id: 39,
        market_id: 1,
        name: 'Vivendi',
        sector: 'Communication Services',
        ticker: 'VIV.PA'
      },
      {
        asset_class_id: 1,
        id: 40,
        market_id: 1,
        name: 'Worldline',
        sector: 'Technology',
        ticker: 'WLN.PA'
      },
      {
        asset_class_id: 1,
        id: 41,
        market_id: 2,
        name: 'Beiersdorf',
        sector: 'Consumer Defensive',
        ticker: 'BEI.DE'
      },
      {
        asset_class_id: 1,
        id: 42,
        market_id: 2,
        name: 'Fresenius Medical Care',
        sector: 'Healthcare',
        ticker: 'FME.DE'
      },
      {
        asset_class_id: 1,
        id: 43,
        market_id: 2,
        name: 'Henkel & Co.',
        sector: 'Consumer Defensive',
        ticker: 'HEN3.DE'
      },
      {
        asset_class_id: 1,
        id: 44,
        market_id: 2,
        name: 'MERCK',
        sector: 'Healthcare',
        ticker: 'MRK.DE'
      },
      {
        asset_class_id: 1,
        id: 45,
        market_id: 2,
        name: 'HeidelbergCement',
        sector: 'Basic Materials',
        ticker: 'HEI.DE'
      },
      {
        asset_class_id: 1,
        id: 46,
        market_id: 2,
        name: 'Linde',
        sector: 'Basic Materials',
        ticker: 'LIN.DE'
      },
      {
        asset_class_id: 1,
        id: 47,
        market_id: 2,
        name: 'Allianz',
        sector: 'Financial Services',
        ticker: 'ALV.DE'
      },
      {
        asset_class_id: 1,
        id: 48,
        market_id: 2,
        name: 'Bayer',
        sector: 'Healthcare',
        ticker: 'BAYN.DE'
      },
      {
        asset_class_id: 1,
        id: 49,
        market_id: 2,
        name: 'Volkswagen',
        sector: 'Consumer Cyclical',
        ticker: 'VOW3.DE'
      },
      {
        asset_class_id: 1,
        id: 50,
        market_id: 2,
        name: 'MUV2',
        sector: 'Financial Services',
        ticker: 'MUV2.DE'
      },
      {
        asset_class_id: 1,
        id: 51,
        market_id: 2,
        name: 'Daimler',
        sector: 'Consumer Cyclical',
        ticker: 'DAI.DE'
      },
      {
        asset_class_id: 1,
        id: 52,
        market_id: 2,
        name: 'SAP',
        sector: 'Technology',
        ticker: 'SAP.DE'
      },
      {
        asset_class_id: 1,
        id: 53,
        market_id: 2,
        name: 'Fresenius',
        sector: 'Healthcare',
        ticker: 'FRE.DE'
      },
      {
        asset_class_id: 1,
        id: 54,
        market_id: 2,
        name: 'Infineon',
        sector: 'Technology',
        ticker: 'IFX.DE'
      },
      {
        asset_class_id: 1,
        id: 55,
        market_id: 2,
        name: 'Deutsche Börse',
        sector: 'Financial Services',
        ticker: 'DB1.DE'
      },
      {
        asset_class_id: 1,
        id: 56,
        market_id: 2,
        name: 'E.ON',
        sector: 'Utilities',
        ticker: 'EOAN.DE'
      },
      {
        asset_class_id: 1,
        id: 57,
        market_id: 2,
        name: 'Deutsche Telekom',
        sector: 'Communication Services',
        ticker: 'DTE.DE'
      },
      {
        asset_class_id: 1,
        id: 58,
        market_id: 2,
        name: 'Vonovia',
        sector: 'Real Estate',
        ticker: 'VNA.DE'
      },
      {
        asset_class_id: 1,
        id: 59,
        market_id: 2,
        name: 'RWE',
        sector: 'Utilities',
        ticker: 'RWE.DE'
      },
      {
        asset_class_id: 1,
        id: 60,
        market_id: 2,
        name: 'Adidas',
        sector: 'Consumer Cyclical',
        ticker: 'ADS.DE'
      },
      {
        asset_class_id: 1,
        id: 61,
        market_id: 2,
        name: 'Siemens',
        sector: 'Industrials',
        ticker: 'SIE.DE'
      },
      {
        asset_class_id: 1,
        id: 62,
        market_id: 2,
        name: 'Continental',
        sector: 'Consumer Cyclical',
        ticker: 'CON.DE'
      },
      {
        asset_class_id: 1,
        id: 63,
        market_id: 2,
        name: 'Deutsche Post',
        sector: 'Industrials',
        ticker: 'DPW.DE'
      },
      {
        asset_class_id: 1,
        id: 64,
        market_id: 2,
        name: 'Deutsche Wohnen',
        sector: 'Real Estate',
        ticker: 'DWNI.DE'
      },
      {
        asset_class_id: 1,
        id: 65,
        market_id: 2,
        name: 'BASF',
        sector: 'Basic Materials',
        ticker: 'BAS.DE'
      },
      {
        asset_class_id: 1,
        id: 66,
        market_id: 2,
        name: 'Deutsche Bank',
        sector: 'Financial Services',
        ticker: 'DBK.DE'
      },
      {
        asset_class_id: 1,
        id: 67,
        market_id: 2,
        name: 'BMW',
        sector: 'Consumer Cyclical',
        ticker: 'BMW.DE'
      },
      {
        asset_class_id: 1,
        id: 68,
        market_id: 2,
        name: 'Delivery Hero',
        sector: 'Consumer Cyclical',
        ticker: 'DHER.DE'
      },
      {
        asset_class_id: 1,
        id: 69,
        market_id: 2,
        name: 'Covestro',
        sector: 'Basic Materials',
        ticker: '1COV.DE'
      },
      {
        asset_class_id: 1,
        id: 70,
        market_id: 2,
        name: 'MULTI-UNITS LUXEMBOURG - Lyxor Euro Government Bond (DR) UCITS ETF - Acc',
        sector: 'Other',
        ticker: 'MTX.DE'
      }
    ],
    indicators: [
      {
        id: 1,
        name: 'Cash Position'
      },
      {
        id: 2,
        name: 'Valorisation'
      },
      {
        id: 3,
        name: 'P&L'
      },
      {
        id: 4,
        name: 'Sharp Ratio'
      },
      {
        id: 5,
        name: 'VaR95'
      },
      {
        id: 6,
        name: 'VaR99'
      },
      {
        id: 7,
        name: 'Beta'
      },
      {
        id: 8,
        name: 'Max DD'
      },
      {
        id: 9,
        name: 'Volatility'
      }
    ],
    markets: [
      {
        description: 'Le CAC 40 est le principal indice boursier de la Bourse de Paris.  \r\nCréé avec 1 000 points de base au 31 décembre 1987 par la Compagnie des agents de change, l indice CAC 40 (CAC signifiant Cotation Assistée en Continu) est déterminé à partir des cours de quarante actions cotées en continu sur le premier marché parmi les cent sociétés dont les échanges sont les plus abondants sur Euronext Paris, \r\nqui fait partie d Euronext, la première bourse européenne. Ces sociétés, représentatives des différentes branches d activités, reflètent en principe la tendance globale de\r\n l économie des grandes entreprises françaises et leur liste est revue régulièrement pour maintenir cette représentativité',
        id: 1,
        name: 'CAC40'
      },
      {
        description: 'Le DAX ou Deutscher AktienindeX est le principal indice boursier allemand. \r\n Sa valeur est fondée sur le cours des actions des 30 plus importantes entreprises cotées à la Bourse de Francfort (Francfort-sur-le-Main).\r\n Le cours des actions est tiré du système de trading électronique Xetra. Selon Deutsche Börse, \r\n opérateur de Xetra, le DAX mesure la performance des trente plus importantes sociétés allemandes du Prime Standard en matière de volume \r\n de transactions et de capitalisation boursière',
        id: 2,
        name: 'DAX'
      }
    ],
    portfolio: {
      game_session_id: 2318,
      id: 4,
      last_indicators: [],
      user_id: 1064
    }
  }
}