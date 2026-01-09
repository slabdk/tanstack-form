import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { KovaIslemDTO } from './data.type';

@Injectable({
  providedIn: 'root',
})
export class Data {
  public getFormData(): Observable<KovaIslemDTO> {
    return of({
      id: 178,
      kova: {
        id: 10,
        kovaNo: 'KOVA 10',
      },
      statu: 1,
      islemBaslangicZamani: '2026-01-08T09:11:01.307801',
      islemBitisZamani: null,
      manipulasyoncu1: {
        id: 1,
        name: 'Volkan',
        surname: 'Erdoğan',
        email: 'volkan.erdogan@vbt.com.tr',
      },
      manipulasyoncu2: null,
      vincOperatoru1: null,
      vincOperatoru2: null,
      vincOperatoru3: null,
      kantarYeri: 1,
      vardiya: {
        id: 3,
        baslangicSaat: '16:00:00',
        bitisSaat: '23:59:59',
        tarih: '2025-05-13T00:00:00',
        vardiyaNo: '3',
        activeStatus: 1,
      },
      aciklama: '123',
      konverterDokum: null,
      durum: 1,
      kovaMalzemeList: [
        {
          id: 334,
          kova: null,
          malzeme: {
            id: 72,
            malzemeNo: 'MAL-072',
            malzemeAck: '99',
            kurulumBileseni: null,
            genislikMin: null,
            genislikMax: null,
            kalinlik: null,
            cap: null,
            dokumTipi: null,
            kalite: null,
            boy: null,
            profilTipi: null,
            rayTipi: null,
            urunTipi: 'Manyetik Malzeme',
            kutukKodu: null,
            boyToleransMin: null,
            boyToleransMax: null,
            capToleransMin: null,
            capToleransMax: null,
            ovalite: null,
            kesit: null,
            kesitMaxTol: null,
            kesitMinTol: null,
            uluslararasiStd: null,
            otomotiv: null,
            emniyetParcasi: null,
            yerliIhr: null,
            tekerSeviyesi: null,
            tekerTipi: null,
            tekerPaketTipi: null,
            gobekCapi: null,
            boyaliBoyasiz: null,
            uluslararasiKalite: null,
            rayDelikBilgisi: null,
            kosegenTipi: null,
            krdTeknikResimNo: null,
            aksYuku: null,
            yuvarlanmaProfili: null,
            taslama: null,
          },
          miktar: 123,
          sira: 1,
        },
      ],
    }) as Observable<KovaIslemDTO>;
  }
}
