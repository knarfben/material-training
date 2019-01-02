import { Exercise } from './exercise.model'
import { Subject } from 'rxjs'
import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { map } from 'rxjs/operators'

@Injectable()
export class TrainingService {
  private runningExercise: Exercise
  private exercises: Exercise[] = []
  changeExercise = new Subject<Exercise>()
  private availableExercises: Exercise[] = []
  changedExercises = new Subject<Exercise[]>()

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    return this.db
      .collection<Exercise>('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            const ex: Exercise = {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              calories: doc.payload.doc.data().calories,
              duration: doc.payload.doc.data().duration
            }
            return ex
          })
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises
        this.changedExercises.next([...this.availableExercises])
      })
  }

  /**
   * startExercise
   */
  public startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    )
    this.changeExercise.next({ ...this.runningExercise })
  }

  getRunningExercise() {
    return { ...this.runningExercise }
  }

  getCompletedOrCancelledExercises() {
    return this.exercises.slice()
  }

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    })
    this.runningExercise = null
    this.changeExercise.next(null)
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: (this.runningExercise.duration * progress) / 100,
      calories: (this.runningExercise.calories * progress) / 100,
      date: new Date(),
      state: 'cancelled'
    })
    this.runningExercise = null
    this.changeExercise.next(null)
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise)
  }
}
