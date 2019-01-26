import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core'
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'
import { Exercise } from '../exercise.model'
import { TrainingService } from '../training.service'
import { Subscription } from 'rxjs'
import { ConfigService } from 'src/app/shared/config.service'

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.scss']
})
export class PastTrainingsComponent
  implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = []
  currentStation: string
  stations: string[]

  dataSource = new MatTableDataSource<Exercise>()
  private finishedExercisesSubscription: Subscription

  @ViewChild(MatSort) sort: MatSort
  @ViewChild(MatPaginator) paginator: MatPaginator

  constructor(
    private trainingService: TrainingService,
    private config: ConfigService
  ) {}

  ngOnInit() {
    this.finishedExercisesSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      exercises => {
        this.dataSource.data = exercises
      }
    )
    this.trainingService.fetchCompletedOrCancelledExercises()
    this.stations = this.config.getStations()
    this.currentStation = this.stations[0]
    this.displayedColumns = this.config.getColumnsForStation(
      this.currentStation
    )
  }

  ngOnDestroy() {
    if (this.finishedExercisesSubscription) {
      this.finishedExercisesSubscription.unsubscribe()
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }

  toggleColumns() {
    console.log('toggleColumns BEFORE: ' + this.currentStation)

    this.currentStation = this.stations[
      (this.stations.indexOf(this.currentStation) + 1) % this.stations.length
    ]
    console.log('toggleColumns AFTER: ' + this.currentStation)
    this.displayedColumns = this.config.getColumnsForStation(
      this.currentStation
    )
    console.log('new columns ' + this.displayedColumns)
  }
}
