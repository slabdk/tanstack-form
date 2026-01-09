import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { Data } from '../../services/data';
import { Button } from 'primeng/button';
import { injectForm, TanStackField } from '@tanstack/angular-form';
import { KovaIslemDTO } from '../../services/data.type';
import { JsonPipe } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { describe } from 'vitest';

@Component({
  selector: 'app-form',
  imports: [Button, TanStackField, JsonPipe, InputText],
  templateUrl: './form.html',
  styleUrl: './form.css',
})
export class Form implements OnInit {
  private dataService: Data = inject(Data);
  form = injectForm({
    defaultValues: {} as KovaIslemDTO,
    onSubmit({ value }) {
      // Do something with form data
      console.log(value);
    },
  });
  formKeys: WritableSignal<string[]> = signal([]);

  public ngOnInit(): void {
    this.dataService.getFormData().subscribe((data: KovaIslemDTO) => {
      // Object.keys(data) bize string[] döner
      const keys = Object.keys(data) as Array<keyof KovaIslemDTO>;

      keys.forEach((key) => {
        // Index signature hatasını önlemek için (data as any) kullanıyoruz
        const value = (data as any)[key];

        // Detaylı tip belirleme mantığı
        let displayType: string = typeof value;

        if (value === null) {
          displayType = 'NULL (Boş)';
        } else if (Array.isArray(value)) {
          displayType = `ARRAY (Dizi) - Uzunluk: ${value.length}`;
        } else if (typeof value === 'object') {
          displayType = 'OBJECT (Nesne)';
        }

        console.log(
          ` Alan: ${String(key).padEnd(25)} | Tip: ${displayType.padEnd(15)} | Değer:`,
          value,
        );
      });

      this.formKeys.set(Object.keys(data));
      this.form.update({ defaultValues: data });
    });
  }

  public handleSubmit(event: SubmitEvent) {
    console.log(event);
  }
}
