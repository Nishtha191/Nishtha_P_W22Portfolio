import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Location } from './location';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private storage: SQLiteObject;
  locationList = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.init();
    });
  }

  async init() {
    const db = await this.sqlite.create(
      {
        name: 'geodb.db',
        location: 'default'
      }
    );
    this.storage = db;
    this.storage.executeSql('SELECT * FROM locationtable', [])
      .then(res => {
        if (res.rows.length > 0) {
          this.getLocations();
          this.isDbReady.next(true);
        } else {
          this.getFakeData();
        }
      });
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchLocations(): Observable<Location[]> {
    return this.locationList.asObservable();
  }

  // Render fake data
  getFakeData() {
    this.httpClient.get(
      'assets/dump.sql',
      { responseType: 'text' }
    ).subscribe(data => {
      this.sqlPorter.importSqlToDb(this.storage, data)
        .then(_ => {
          this.getLocations();
          this.isDbReady.next(true);
        })
        .catch(error => console.error(error));
    });
  }

  // Get list
  async getLocations() {
    const res = await this.storage.executeSql('SELECT * FROM locationtable', []);
    let items: Location[] = [];
    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          locationtime: res.rows.item(i).locationtime,
          latitude: res.rows.item(i).latitude,
          longitude: res.rows.item(i).longitude
          //locationtime: res.rows.item(i).locationtime
        });
      }
    }
    this.locationList.next(items);
  }

  // Delete
  async deleteLocation(locationtime) {
    const _ = await this.storage.executeSql('DELETE FROM locationtable WHERE locationtime = ?', [locationtime]);
    this.getLocations();
  }

   // Add
   async addLocation(locationtime, latitude, longitude) {
    let data = [locationtime, latitude, longitude];
    const res = await this.storage.executeSql('INSERT INTO locationtable (locationtime, latitude, longitude) VALUES (?, ?, ?)', data);
     this.getLocations();
  }
}
