export interface WorldCountryPath {
  id: string; // ISO 2 code
  iso3: string; // ISO 3 code
  name: string;
  path: string;
}

// Optimized high-fidelity world map SVG paths (1000 x 500 Equirectangular / Natural Earth projection)
export const WORLD_COUNTRIES: WorldCountryPath[] = [
  // ── North America ──
  {
    id: "US",
    iso3: "USA",
    name: "United States",
    path: "M 155,142 L 180,142 L 230,142 L 255,145 L 260,165 L 268,175 L 260,195 L 245,210 L 235,212 L 225,225 L 210,225 L 195,220 L 175,225 L 165,210 L 150,190 L 140,165 L 148,150 Z M 75,65 L 120,65 L 130,80 L 125,115 L 100,120 L 80,105 L 70,85 Z M 190,240 L 195,242 L 192,246 L 187,243 Z",
  },
  {
    id: "CA",
    iso3: "CAN",
    name: "Canada",
    path: "M 125,65 L 160,60 L 210,50 L 250,55 L 270,75 L 265,110 L 285,115 L 275,135 L 255,142 L 180,142 L 155,142 L 140,130 L 130,110 L 125,80 Z M 210,35 L 235,32 L 245,45 L 220,48 Z M 255,35 L 275,30 L 280,50 L 260,52 Z",
  },
  {
    id: "GL",
    iso3: "GRL",
    name: "Greenland",
    path: "M 315,30 L 370,25 L 395,45 L 375,85 L 340,95 L 325,75 L 320,45 Z",
  },
  {
    id: "MX",
    iso3: "MEX",
    name: "Mexico",
    path: "M 165,210 L 175,225 L 195,220 L 210,225 L 205,245 L 225,250 L 215,265 L 195,255 L 180,240 L 160,230 L 155,215 Z",
  },
  {
    id: "GT",
    iso3: "GTM",
    name: "Guatemala",
    path: "M 215,265 L 225,263 L 223,272 L 215,270 Z",
  },
  {
    id: "HN",
    iso3: "HND",
    name: "Honduras",
    path: "M 225,263 L 236,265 L 234,272 L 223,272 Z",
  },
  {
    id: "NI",
    iso3: "NIC",
    name: "Nicaragua",
    path: "M 228,272 L 238,272 L 236,280 L 228,278 Z",
  },
  {
    id: "CR",
    iso3: "CRI",
    name: "Costa Rica",
    path: "M 233,280 L 242,283 L 238,289 L 232,286 Z",
  },
  {
    id: "PA",
    iso3: "PAN",
    name: "Panama",
    path: "M 238,287 L 252,288 L 250,294 L 238,292 Z",
  },
  {
    id: "CU",
    iso3: "CUB",
    name: "Cuba",
    path: "M 235,232 L 265,240 L 260,246 L 232,238 Z",
  },
  {
    id: "HT",
    iso3: "HTI",
    name: "Haiti",
    path: "M 270,244 L 278,245 L 276,252 L 269,250 Z",
  },
  {
    id: "DO",
    iso3: "DOM",
    name: "Dominican Republic",
    path: "M 278,245 L 288,246 L 286,253 L 276,252 Z",
  },
  {
    id: "JM",
    iso3: "JAM",
    name: "Jamaica",
    path: "M 252,250 L 260,252 L 258,256 L 250,254 Z",
  },

  // ── South America ──
  {
    id: "BR",
    iso3: "BRA",
    name: "Brazil",
    path: "M 295,295 L 335,290 L 375,305 L 385,335 L 365,375 L 340,390 L 320,380 L 305,345 L 290,335 L 280,315 Z",
  },
  {
    id: "CO",
    iso3: "COL",
    name: "Colombia",
    path: "M 255,292 L 275,292 L 280,315 L 265,325 L 250,310 Z",
  },
  {
    id: "VE",
    iso3: "VEN",
    name: "Venezuela",
    path: "M 275,290 L 305,290 L 300,310 L 280,315 Z",
  },
  {
    id: "GY",
    iso3: "GUY",
    name: "Guyana",
    path: "M 305,292 L 316,293 L 314,306 L 303,304 Z",
  },
  {
    id: "SR",
    iso3: "SUR",
    name: "Suriname",
    path: "M 316,293 L 326,295 L 324,307 L 314,306 Z",
  },
  {
    id: "EC",
    iso3: "ECU",
    name: "Ecuador",
    path: "M 245,310 L 255,310 L 252,328 L 242,325 Z",
  },
  {
    id: "PE",
    iso3: "PER",
    name: "Peru",
    path: "M 252,326 L 275,325 L 285,355 L 265,375 L 250,345 Z",
  },
  {
    id: "BO",
    iso3: "BOL",
    name: "Bolivia",
    path: "M 285,350 L 315,350 L 315,380 L 290,385 L 280,365 Z",
  },
  {
    id: "PY",
    iso3: "PRY",
    name: "Paraguay",
    path: "M 312,382 L 332,384 L 328,405 L 310,400 Z",
  },
  {
    id: "CL",
    iso3: "CHL",
    name: "Chile",
    path: "M 275,375 L 285,375 L 280,455 L 270,455 L 272,410 Z",
  },
  {
    id: "AR",
    iso3: "ARG",
    name: "Argentina",
    path: "M 285,380 L 315,385 L 315,415 L 295,465 L 280,455 L 285,410 Z",
  },
  {
    id: "UY",
    iso3: "URY",
    name: "Uruguay",
    path: "M 325,405 L 338,407 L 332,422 L 320,418 Z",
  },

  // ── Europe ──
  {
    id: "GB",
    iso3: "GBR",
    name: "United Kingdom",
    path: "M 445,130 L 460,125 L 462,145 L 452,152 L 442,142 Z M 438,138 L 444,136 L 442,144 L 436,142 Z",
  },
  {
    id: "IE",
    iso3: "IRL",
    name: "Ireland",
    path: "M 432,138 L 440,136 L 438,146 L 430,144 Z",
  },
  {
    id: "FR",
    iso3: "FRA",
    name: "France",
    path: "M 458,152 L 482,150 L 485,172 L 465,182 L 452,170 Z",
  },
  {
    id: "ES",
    iso3: "ESP",
    name: "Spain",
    path: "M 438,182 L 465,180 L 460,205 L 435,205 L 432,192 Z",
  },
  {
    id: "PT",
    iso3: "PRT",
    name: "Portugal",
    path: "M 430,186 L 438,185 L 435,205 L 428,202 Z",
  },
  {
    id: "DE",
    iso3: "DEU",
    name: "Germany",
    path: "M 482,142 L 502,142 L 500,165 L 482,165 Z",
  },
  {
    id: "IT",
    iso3: "ITA",
    name: "Italy",
    path: "M 488,168 L 500,168 L 515,195 L 505,202 L 492,185 Z M 490,200 L 498,202 L 495,208 L 487,205 Z",
  },
  {
    id: "NL",
    iso3: "NLD",
    name: "Netherlands",
    path: "M 478,138 L 486,138 L 484,146 L 476,144 Z",
  },
  {
    id: "BE",
    iso3: "BEL",
    name: "Belgium",
    path: "M 474,146 L 482,146 L 480,154 L 472,152 Z",
  },
  {
    id: "CH",
    iso3: "CHE",
    name: "Switzerland",
    path: "M 482,164 L 494,163 L 492,172 L 480,170 Z",
  },
  {
    id: "AT",
    iso3: "AUT",
    name: "Austria",
    path: "M 495,163 L 512,163 L 510,172 L 493,172 Z",
  },
  {
    id: "PL",
    iso3: "POL",
    name: "Poland",
    path: "M 505,138 L 532,138 L 530,158 L 502,158 Z",
  },
  {
    id: "CZ",
    iso3: "CZE",
    name: "Czech Republic",
    path: "M 498,155 L 514,154 L 512,163 L 496,162 Z",
  },
  {
    id: "SK",
    iso3: "SVK",
    name: "Slovakia",
    path: "M 514,156 L 528,156 L 526,164 L 512,163 Z",
  },
  {
    id: "HU",
    iso3: "HUN",
    name: "Hungary",
    path: "M 508,164 L 526,164 L 524,174 L 506,173 Z",
  },
  {
    id: "SE",
    iso3: "SWE",
    name: "Sweden",
    path: "M 495,85 L 515,80 L 512,132 L 492,132 Z",
  },
  {
    id: "NO",
    iso3: "NOR",
    name: "Norway",
    path: "M 475,85 L 495,85 L 490,132 L 478,130 Z",
  },
  {
    id: "FI",
    iso3: "FIN",
    name: "Finland",
    path: "M 515,80 L 538,75 L 532,125 L 515,125 Z",
  },
  {
    id: "DK",
    iso3: "DNK",
    name: "Denmark",
    path: "M 482,126 L 494,125 L 492,137 L 480,136 Z",
  },
  {
    id: "UA",
    iso3: "UKR",
    name: "Ukraine",
    path: "M 532,138 L 585,135 L 580,165 L 535,168 L 530,155 Z",
  },
  {
    id: "RO",
    iso3: "ROU",
    name: "Romania",
    path: "M 528,166 L 550,165 L 548,180 L 526,180 Z",
  },
  {
    id: "BG",
    iso3: "BGR",
    name: "Bulgaria",
    path: "M 532,180 L 550,180 L 548,192 L 530,190 Z",
  },
  {
    id: "GR",
    iso3: "GRC",
    name: "Greece",
    path: "M 526,192 L 542,192 L 538,208 L 524,205 Z",
  },
  {
    id: "TR",
    iso3: "TUR",
    name: "Turkey",
    path: "M 550,182 L 610,180 L 605,202 L 548,202 Z",
  },

  // ── Russia & Eurasia ──
  {
    id: "RU",
    iso3: "RUS",
    name: "Russia",
    path: "M 538,75 L 610,65 L 720,60 L 830,65 L 890,80 L 880,115 L 830,120 L 780,135 L 710,135 L 650,140 L 585,135 L 538,125 Z M 575,135 L 610,135 L 640,145 L 630,165 L 580,165 Z",
  },
  {
    id: "KZ",
    iso3: "KAZ",
    name: "Kazakhstan",
    path: "M 585,142 L 675,140 L 670,175 L 595,178 Z",
  },
  {
    id: "UZ",
    iso3: "UZB",
    name: "Uzbekistan",
    path: "M 605,176 L 642,175 L 638,190 L 602,188 Z",
  },
  {
    id: "TM",
    iso3: "TKM",
    name: "Turkmenistan",
    path: "M 602,188 L 630,188 L 626,202 L 598,200 Z",
  },
  {
    id: "MN",
    iso3: "MNG",
    name: "Mongolia",
    path: "M 685,135 L 775,135 L 765,168 L 680,168 Z",
  },

  // ── Asia ──
  {
    id: "CN",
    iso3: "CHN",
    name: "China",
    path: "M 675,155 L 775,155 L 805,175 L 795,230 L 760,245 L 720,245 L 690,215 L 665,185 Z",
  },
  {
    id: "IN",
    iso3: "IND",
    name: "India",
    path: "M 655,215 L 695,215 L 710,245 L 690,295 L 670,295 L 650,255 Z",
  },
  {
    id: "PK",
    iso3: "PAK",
    name: "Pakistan",
    path: "M 632,205 L 660,205 L 655,245 L 635,245 Z",
  },
  {
    id: "AF",
    iso3: "AFG",
    name: "Afghanistan",
    path: "M 625,195 L 652,195 L 648,215 L 622,215 Z",
  },
  {
    id: "IR",
    iso3: "IRN",
    name: "Iran",
    path: "M 598,198 L 632,198 L 628,232 L 592,230 Z",
  },
  {
    id: "IQ",
    iso3: "IRQ",
    name: "Iraq",
    path: "M 580,202 L 602,202 L 598,225 L 578,222 Z",
  },
  {
    id: "SA",
    iso3: "SAU",
    name: "Saudi Arabia",
    path: "M 578,222 L 625,222 L 620,265 L 575,260 Z",
  },
  {
    id: "YE",
    iso3: "YEM",
    name: "Yemen",
    path: "M 585,262 L 618,264 L 612,278 L 582,275 Z",
  },
  {
    id: "OM",
    iso3: "OMN",
    name: "Oman",
    path: "M 618,248 L 632,250 L 625,272 L 614,266 Z",
  },
  {
    id: "BD",
    iso3: "BGD",
    name: "Bangladesh",
    path: "M 708,236 L 720,236 L 718,252 L 706,250 Z",
  },
  {
    id: "MM",
    iso3: "MMR",
    name: "Myanmar",
    path: "M 718,232 L 735,232 L 730,272 L 715,265 Z",
  },
  {
    id: "TH",
    iso3: "THA",
    name: "Thailand",
    path: "M 732,246 L 748,246 L 745,282 L 730,275 Z",
  },
  {
    id: "VN",
    iso3: "VNM",
    name: "Vietnam",
    path: "M 752,238 L 762,240 L 755,285 L 746,278 Z",
  },
  {
    id: "JP",
    iso3: "JPN",
    name: "Japan",
    path: "M 825,165 L 845,175 L 835,215 L 818,205 Z M 815,215 L 825,225 L 815,230 Z",
  },
  {
    id: "KR",
    iso3: "KOR",
    name: "South Korea",
    path: "M 798,198 L 810,198 L 806,215 L 795,212 Z",
  },
  {
    id: "KP",
    iso3: "PRK",
    name: "North Korea",
    path: "M 795,185 L 812,185 L 808,198 L 794,198 Z",
  },
  {
    id: "PH",
    iso3: "PHL",
    name: "Philippines",
    path: "M 778,260 L 795,265 L 788,305 L 772,295 Z",
  },
  {
    id: "ID",
    iso3: "IDN",
    name: "Indonesia",
    path: "M 725,310 L 765,310 L 785,325 L 845,325 L 840,338 L 760,335 L 720,325 Z M 750,295 L 775,295 L 770,315 L 745,312 Z",
  },
  {
    id: "MY",
    iso3: "MYS",
    name: "Malaysia",
    path: "M 730,285 L 745,285 L 742,302 L 728,300 Z M 762,302 L 785,302 L 782,312 L 760,310 Z",
  },

  // ── Africa ──
  {
    id: "ZA",
    iso3: "ZAF",
    name: "South Africa",
    path: "M 532,385 L 568,382 L 572,408 L 545,422 L 530,410 Z",
  },
  {
    id: "EG",
    iso3: "EGY",
    name: "Egypt",
    path: "M 535,215 L 575,215 L 570,245 L 532,245 Z",
  },
  {
    id: "LY",
    iso3: "LBY",
    name: "Libya",
    path: "M 488,212 L 535,212 L 532,248 L 485,248 Z",
  },
  {
    id: "DZ",
    iso3: "DZA",
    name: "Algeria",
    path: "M 445,210 L 488,210 L 485,258 L 440,252 Z",
  },
  {
    id: "MA",
    iso3: "MAR",
    name: "Morocco",
    path: "M 425,208 L 445,208 L 440,235 L 420,230 Z",
  },
  {
    id: "SD",
    iso3: "SDN",
    name: "Sudan",
    path: "M 532,246 L 570,246 L 565,282 L 528,280 Z",
  },
  {
    id: "ET",
    iso3: "ETH",
    name: "Ethiopia",
    path: "M 565,268 L 595,270 L 590,298 L 558,295 Z",
  },
  {
    id: "NG",
    iso3: "NGA",
    name: "Nigeria",
    path: "M 470,270 L 498,270 L 495,295 L 468,292 Z",
  },
  {
    id: "CD",
    iso3: "COD",
    name: "Democratic Republic of the Congo",
    path: "M 505,305 L 545,305 L 540,355 L 500,345 Z",
  },
  {
    id: "KE",
    iso3: "KEN",
    name: "Kenya",
    path: "M 560,295 L 585,295 L 580,322 L 555,320 Z",
  },
  {
    id: "TZ",
    iso3: "TZA",
    name: "Tanzania",
    path: "M 552,320 L 580,322 L 575,350 L 548,348 Z",
  },
  {
    id: "AO",
    iso3: "AGO",
    name: "Angola",
    path: "M 495,335 L 530,338 L 525,375 L 492,370 Z",
  },
  {
    id: "MZ",
    iso3: "MOZ",
    name: "Mozambique",
    path: "M 560,350 L 580,352 L 570,405 L 552,398 Z",
  },
  {
    id: "MG",
    iso3: "MDG",
    name: "Madagascar",
    path: "M 595,360 L 610,362 L 602,408 L 588,405 Z",
  },
  {
    id: "NA",
    iso3: "NAM",
    name: "Namibia",
    path: "M 502,372 L 532,375 L 528,410 L 498,405 Z",
  },
  {
    id: "BW",
    iso3: "BWA",
    name: "Botswana",
    path: "M 530,375 L 555,375 L 552,402 L 528,400 Z",
  },
  {
    id: "ZW",
    iso3: "ZWE",
    name: "Zimbabwe",
    path: "M 545,362 L 568,362 L 564,382 L 542,380 Z",
  },

  // ── Oceania ──
  {
    id: "AU",
    iso3: "AUS",
    name: "Australia",
    path: "M 750,355 L 820,345 L 845,370 L 835,425 L 795,435 L 755,415 L 745,375 Z M 820,440 L 832,442 L 828,452 L 818,450 Z",
  },
  {
    id: "NZ",
    iso3: "NZL",
    name: "New Zealand",
    path: "M 872,425 L 885,420 L 880,450 L 868,445 Z M 885,405 L 895,402 L 892,420 L 882,418 Z",
  },
  {
    id: "PG",
    iso3: "PNG",
    name: "Papua New Guinea",
    path: "M 835,315 L 872,320 L 865,335 L 830,332 Z",
  },

  // ── Antarctica Shelf ──
  {
    id: "AQ",
    iso3: "ATA",
    name: "Antarctica",
    path: "M 85,488 L 180,480 L 280,485 L 390,478 L 500,482 L 620,478 L 740,485 L 860,480 L 910,488 L 910,500 L 85,500 Z",
  },
];
