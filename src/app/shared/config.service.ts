import { Injectable } from '@angular/core'

@Injectable()
export class ConfigService {
  config = {
    ams: {
      columns: ['bella', 'name', 'duration', 'calories', 'date']
    },
    cdg: {
      columns: ['name', 'duration', 'calories']
    },
    cai: {
      columns: ['name', 'duration', 'bella']
    }
  }

  getColumnsForStation(station: string) {
    return this.config[station].columns
  }

  getStations() {
    return Object.keys(this.config)
  }
}
