import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Data } from '../../services/data';
import { ButtonModule } from 'primeng/button';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { KovaIslemDTO } from '../../services/data.type';
import { JsonPipe, NgIf } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ButtonModule, TanStackField, JsonPipe, InputTextModule, TableModule, NgIf],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  private dataService: Data = inject(Data);
  formKeys: WritableSignal<string[]> = signal([]);

  public trackByKovaMalzeme(index: number, item: any): number {
    return index; // Sırrı burada: Satır numarasını döndürüyoruz.
  }

  // --- 2) FORM AYARLARI ---
  form = injectForm({
    defaultValues: {
      people: [],
      kovaMalzemeList: [],
    } as unknown as KovaIslemDTO,

    // KAYDETME İŞLEMİ (Loglu)
    onSubmit: ({ value }) => {
      console.log('🚀 SUBMIT TETİKLENDİ. Ham Veri:', value);

      try {
        // UI için eklediğimiz _uiId'leri temizleyip API'ye uygun hale getiriyoruz
        const temizlenmisList = value.kovaMalzemeList?.map((item: any) => {
          if (!item) return {};
          const { _uiId, ...rest } = item;
          return rest;
        });

        const payload: KovaIslemDTO = {
          ...value,
          kovaMalzemeList: temizlenmisList ?? [],
        };

        console.log("📦 API'YE GİDEN TEMİZ VERİ:", value);

        this.dataService.saveFormData(value as KovaIslemDTO).subscribe({
          next: (res) => alert('Kayıt Başarılı!'),
          error: (err) => alert('Hata: ' + err.message),
        });
      } catch (err) {
        console.error('Kod hatası:', err);
      }
    },

    // Hata varsa burası çalışır
    onSubmitInvalid: ({ value, formApi }) => {
      console.error('⛔ FORM GEÇERSİZ! Gönderilemedi.');
      console.table(formApi.state.errors);
      alert('Formda eksik veya hatalı alanlar var. Konsolu (F12) açıp hatalara bak.');
    },
  });

  // --- 3) PATH OLUŞTURUCULAR ---
  getRowName = (i: number) => `kovaMalzemeList[${i}].id` as const;
  getRowSira = (i: number) => `kovaMalzemeList[${i}].sira` as const;
  getRowMiktar = (i: number) => `kovaMalzemeList[${i}].miktar` as const;
  getMalzemeNo = (i: number) => `kovaMalzemeList[${i}].malzeme.malzemeNo` as const;
  getMalzemeAck = (i: number) => `kovaMalzemeList[${i}].malzeme.malzemeAck` as const;
  getUrunTipi = (i: number) => `kovaMalzemeList[${i}].malzeme.urunTipi` as const;

  // Yeni satır şablonu
  defaultKovaMalzeme = {
    id: null,
    sira: 0,
    miktar: 0,
    malzeme: { malzemeNo: '', malzemeAck: '', urunTipi: '' },
  };

  public ngOnInit(): void {
    this.dataService.getFormData().subscribe((data: KovaIslemDTO) => {
      // Gelen veriye UI ID ekle (Focus sorunu için şart)
      if (data.kovaMalzemeList) {
        data.kovaMalzemeList = data.kovaMalzemeList.map((item) => ({
          ...item,
          malzeme: item.malzeme ?? { malzemeNo: '', malzemeAck: '', urunTipi: '' },
        }));
      }
      this.formKeys.set(Object.keys(data));
      this.form.update({ defaultValues: data });
    });
  }

  // Satır ekle butonuna basınca
  addKovaMalzemeRow(listApi: any) {
    // Direkt temiz nesneyi ekliyoruz
    listApi.pushValue({ ...this.defaultKovaMalzeme });
  }

  // Kaydet butonuna basınca
  public handleSaveClick() {
    console.log('🖱️ Butona basıldı. Form durumu kontrol ediliyor...');
    // Formun o anki halini bas
    console.log('Anlık Form State:', this.form.state.values);

    // Validasyon kontrolü
    if (this.form.state.errors.length > 0) {
      console.warn('⚠️ Dikkat: Formda şu an hatalar var:', this.form.state.errors);
    }

    this.form.handleSubmit();
  }

  // Value gösterimi için
  public displayValue(key: string, value: any) {
    if (typeof value === 'object' && value !== null) return 'Detay (Object)';
    return value ?? '';
  }

  public handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    this.form.handleSubmit();
  }
}
