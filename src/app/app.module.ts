import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'DemonDb',
  version: 1,
  objectStoresMeta: [
    {
      store: 'party_member',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: false } },
        { name: 'nickname', keypath: 'nickname', options: { unique: false } },
        { name: 'level', keypath: 'level', options: { unique: false } },
        {
          name: 'currentEXP',
          keypath: 'currentEXP',
          options: { unique: false },
        },
        { name: 'totalEXP', keypath: 'totalEXP', options: { unique: false } },
        { name: 'currentHP', keypath: 'currentHP', options: { unique: false } },
        { name: 'totalHP', keypath: 'totalHP', options: { unique: false } },
        { name: 'currentMP', keypath: 'currentMP', options: { unique: false } },
        { name: 'totalMP', keypath: 'totalMP', options: { unique: false } },
        { name: 'stats', keypath: 'stats', options: { unique: false } },
        { name: 'skills', keypath: 'skills', options: { unique: false } },
        { name: 'race', keypath: 'race', options: { unique: false } },
      ],
    },
  ],
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxIndexedDBModule.forRoot(dbConfig),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
