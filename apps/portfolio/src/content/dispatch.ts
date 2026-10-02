/**
 * Fictional fixtures for the AI Dispatching case-study demo, ported verbatim
 * from the design prototype (`Portfolio Mockups v4.dc.html`, the `D`/`L`/
 * `scoreOf`/`DR` constants). All data is illustrative only.
 */

export type DriverId = "mr" | "ao" | "jk" | "tb" | "dl" | "sw" | "rn" | "pc";

export interface Candidate {
  name: string;
  meta: string;
  score: string;
}

export const drivers: Record<DriverId, Candidate> = {
  mr: { name: "Marcus Reed", meta: "18 mi from pickup · 9.5 h drive time left", score: "4.50" },
  ao: { name: "Ana Ortiz", meta: "41 mi deadhead · 7 h left", score: "4.00" },
  jk: { name: "James Kim", meta: "12 mi · runs this lane weekly", score: "4.75" },
  tb: { name: "Tasha Brooks", meta: "55 mi deadhead · 10 h left", score: "3.50" },
  dl: { name: "Dev Lal", meta: "33 mi · reefer certified", score: "4.25" },
  sw: { name: "Sam Wu", meta: "22 mi · 6 h left", score: "4.50" },
  rn: { name: "Rosa Nuñez", meta: "70 mi deadhead · 11 h left", score: "3.25" },
  pc: { name: "Pat Cole", meta: "48 mi · home time Fri", score: "3.75" },
};

export interface Load {
  id: string;
  shipper: string;
  puWin: string;
  from: string;
  doWin: string;
  to: string;
  req: string;
  rec: DriverId;
  alts: DriverId[];
  eq: string;
}

export const loads: Load[] = [
  { id: "L-1042", shipper: "SH-31", puWin: "Nov 2 01:30", from: "Oklahoma City, OK", doWin: "Nov 2 06:00", to: "Enid, OK", req: "1", rec: "mr", alts: ["jk", "ao", "dl"], eq: "Dry van · 38,000 lb" },
  { id: "L-1057", shipper: "SH-44", puWin: "Oct 31 13:00", from: "Dallas, TX", doWin: "Oct 31 16:00", to: "Roanoke, TX", req: "1", rec: "jk", alts: ["sw", "mr", "tb"], eq: "Dry van · 22,500 lb" },
  { id: "L-1063", shipper: "SH-31", puWin: "Oct 31 11:30", from: "Mansfield, TX", doWin: "Oct 31 14:00", to: "Midlothian, TX", req: "2", rec: "sw", alts: ["dl", "pc", "rn"], eq: "Reefer · 41,000 lb" },
  { id: "L-1078", shipper: "SH-76", puWin: "Nov 1 08:00", from: "Mansfield, TX", doWin: "Nov 1 10:30", to: "Fort Worth, TX", req: "1", rec: "ao", alts: ["tb", "jk", "pc"], eq: "Flatbed · 30,200 lb" },
  { id: "L-1084", shipper: "SH-26", puWin: "Oct 31 00:00", from: "Oklahoma City, OK", doWin: "Oct 31 07:00", to: "Amarillo, TX", req: "1", rec: "dl", alts: ["rn", "sw", "ao"], eq: "Reefer · 36,800 lb" },
  { id: "L-1091", shipper: "SH-16", puWin: "Oct 31 08:00", from: "Mansfield, TX", doWin: "Oct 31 09:30", to: "Arlington, TX", req: "1", rec: "tb", alts: ["mr", "pc", "dl"], eq: "Dry van · 27,400 lb" },
  { id: "L-1102", shipper: "SH-68", puWin: "Oct 27 19:00", from: "Dallas, TX", doWin: "Oct 27 21:00", to: "Denton, TX", req: "1", rec: "pc", alts: ["jk", "sw", "ao"], eq: "Dry van · 19,900 lb" },
  { id: "L-1118", shipper: "SH-35", puWin: "Nov 1 02:30", from: "Houston, TX", doWin: "Nov 1 05:00", to: "Houston, TX", req: "2", rec: "rn", alts: ["tb", "mr", "dl"], eq: "Flatbed · 33,600 lb" },
];

export const scoreOf: Record<string, string> = {
  "L-1042": "4.50",
  "L-1057": "4.75",
  "L-1063": "4.25",
  "L-1078": "4.00",
  "L-1084": "3.75",
  "L-1091": "4.50",
  "L-1102": "3.50",
  "L-1118": "4.25",
};

export interface DriverRow {
  id: DriverId;
  home: string;
  now: string;
  hos: string;
  rec: string;
  alts: string[];
}

export const driverRows: DriverRow[] = [
  { id: "mr", home: "Dallas, TX", now: "Fort Worth, TX", hos: "9.5 h", rec: "L-1057", alts: ["L-1042", "L-1091", "L-1102"] },
  { id: "ao", home: "Oklahoma City, OK", now: "Norman, OK", hos: "7 h", rec: "L-1042", alts: ["L-1084", "L-1078", "L-1063"] },
  { id: "jk", home: "Arlington, TX", now: "Dallas, TX", hos: "10 h", rec: "L-1102", alts: ["L-1057", "L-1091", "L-1078"] },
  { id: "tb", home: "Houston, TX", now: "Katy, TX", hos: "10 h", rec: "L-1118", alts: ["L-1063", "L-1091", "L-1078"] },
  { id: "dl", home: "Amarillo, TX", now: "Lubbock, TX", hos: "8 h", rec: "L-1084", alts: ["L-1042", "L-1063", "L-1078"] },
  { id: "sw", home: "Mansfield, TX", now: "Mansfield, TX", hos: "6 h", rec: "L-1063", alts: ["L-1078", "L-1091", "L-1057"] },
  { id: "rn", home: "Houston, TX", now: "Pasadena, TX", hos: "11 h", rec: "L-1091", alts: ["L-1118", "L-1063", "L-1102"] },
  { id: "pc", home: "Fort Worth, TX", now: "Grand Prairie, TX", hos: "7.5 h", rec: "L-1078", alts: ["L-1102", "L-1057", "L-1042"] },
];

/** Loads viewed as "candidates" (for the Drivers tab's recommendation/search panel). */
export const loadCandidates: Record<string, Candidate> = Object.fromEntries(
  loads.map((l) => [
    l.id,
    { name: `${l.id} · ${l.from} → ${l.to}`, meta: `${l.puWin} · ${l.eq}`, score: scoreOf[l.id] },
  ]),
);

export function laneFor(loadId: string): string {
  const load = loads.find((l) => l.id === loadId);
  return load ? `${load.from} → ${load.to}` : "";
}
