export interface KovaIslemDTO {
  id?: number | null;
  kova?: KovaDTO | null;
  statu?: number | null;
  islemBaslangicZamani?: string | null;
  islemBitisZamani?: string | null;
  manipulasyoncu1?: UserDTO | null;
  manipulasyoncu2?: UserDTO | null;
  vincOperatoru1?: UserDTO | null;
  vincOperatoru2?: UserDTO | null;
  vincOperatoru3?: UserDTO | null;
  kantarYeri?: number | null;
  vardiya?: VardiyaDTO | null;
  aciklama?: string | null;
  konverterDokum?: KonverterDokumDTO | null;
  durum?: number | null;
  kovaMalzemeList?: KovaMalzemeDTO[] | null;
}

export interface LocalTime {
  hour?: number | null;
  minute?: number | null;
  second?: number | null;
  nano?: number | null;
}

export interface MalzemeDTO {
  id?: number | null;
  malzemeNo?: string | null;
  malzemeAck?: string | null;
  kurulumBileseni?: number | null;
  genislikMin?: number | null;
  genislikMax?: number | null;
  kalinlik?: number | null;
  cap?: number | null;
  dokumTipi?: string | null;
  kalite?: string | null;
  boy?: number | null;
  profilTipi?: string | null;
  rayTipi?: string | null;
  urunTipi?: string | null;
  kutukKodu?: string | null;
  boyToleransMin?: number | null;
  boyToleransMax?: number | null;
  capToleransMin?: number | null;
  capToleransMax?: number | null;
  ovalite?: number | null;
  kesit?: string | null;
  kesitMaxTol?: string | null;
  kesitMinTol?: string | null;
  uluslararasiStd?: string | null;
  otomotiv?: string | null;
  emniyetParcasi?: string | null;
  yerliIhr?: string | null;
  tekerSeviyesi?: string | null;
  tekerTipi?: string | null;
  tekerPaketTipi?: string | null;
  gobekCapi?: number | null;
  boyaliBoyasiz?: string | null;
  uluslararasiKalite?: string | null;
  rayDelikBilgisi?: string | null;
  kosegenTipi?: string | null;
  krdTeknikResimNo?: string | null;
  aksYuku?: string | null;
  yuvarlanmaProfili?: string | null;
  taslama?: string | null;
}
export interface KonverterDTO {
  id?: number | null;
  aciklama?: string | null;
}

export interface KovaDTO {
  id?: number | null;
  kovaNo?: string | null;
}

export interface UserDTO {
  id?: number | null;
  name?: string | null;
  surname?: string | null;
  email?: string | null;
}

export interface VardiyaDTO {
  id?: number | null;
  baslangicSaat?: LocalTime | null;
  bitisSaat?: LocalTime | null;
  tarih?: string | null;
  vardiyaNo?: string | null;
  activeStatus?: number | null;
}

export interface KonverterDokumDTO {
  id?: number | null;
  konverterDokumNo?: string | null;
  konverter?: KonverterDTO | null;
}

export interface KovaMalzemeDTO {
  id?: number | null;
  kova?: KovaIslemDTO | null;
  malzeme?: MalzemeDTO | null;
  miktar?: number | null;
  sira?: number | null;
}
