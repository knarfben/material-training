import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core'
import {
  MatTableDataSource,
  MatSort,
  MatPaginator,
  MatDialog
} from '@angular/material'
import { Exercise } from '../exercise.model'
import { TrainingService } from '../training.service'
import { Subscription } from 'rxjs'
import { ConfigService } from 'src/app/shared/config.service'
import { UIService } from 'src/app/shared/ui.service'
import { BasicDialogComponent } from 'src/app/basic-dialog/basic-dialog.component'

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
  dataLoadingSubs: Subscription
  spinMe: boolean
  changedExercisesSubscription: Subscription
  exercises: Exercise[]
  selectedExercise: string

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService,
    private config: ConfigService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.finishedExercisesSubscription = this.trainingService.finishedExercisesChanged.subscribe(
      exercises => {
        this.dataSource.data = exercises
      }
    )
    this.dataSource.filterPredicate = function(data, filter: string): boolean {
      console.log('Filter predicate called here with ' + filter)
      console.log('data.name = ' + data.name)

      const ret = filter.includes(data.name)
      console.log('predicate returns ' + ret)

      return ret
    }
    this.trainingService.fetchCompletedOrCancelledExercises()
    this.stations = this.config.getStations()
    this.currentStation = this.stations[1]
    this.displayedColumns = this.config.getColumnsForStation(
      this.currentStation
    )
    this.dataLoadingSubs = this.uiService.loadingStateChanged.subscribe(
      isLoading => {
        this.spinMe = isLoading
      }
    )
    this.changedExercisesSubscription = this.trainingService.changedExercises.subscribe(
      exs => {
        this.exercises = exs
      }
    )
    this.trainingService.fetchAvailableExercises()
  }

  ngOnDestroy() {
    if (this.finishedExercisesSubscription) {
      this.finishedExercisesSubscription.unsubscribe()
    }
    this.dataLoadingSubs.unsubscribe()
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  // doFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase()
  // }

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

  filterTable(filterValue: string) {
    this.dataSource.filter = filterValue
  }

  // clickTheRow(row: Exercise) {
  //   console.log(row)
  //   this.uiService.showSnackbar(
  //     `Exercise clicked! Calories ${row.calories}`,
  //     null,
  //     3000
  //   )
  // }

  clickTheRow(row: Exercise): void {
    const dialogRef = this.dialog.open(BasicDialogComponent, {
      width: '250px',
      data: { data1: row.name, data2: row.duration }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')
      // this.animal = result;
    })
  }
}
