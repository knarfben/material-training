import { Exercise } from './exercise.model'
import { Subject } from 'rxjs'
import { Injectable, OnInit, OnDestroy } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { map } from 'rxjs/operators'
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable()
export class TrainingService {
  changeExercise = new Subject<Exercise>()
  changedExercises = new Subject<Exercise[]>()
  finishedExercisesChanged = new Subject<Exercise[]>()

  private runningExercise: Exercise
  private availableExercises: Exercise[] = []
  private fbSubs: Subscription[] = []

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
    this.fbSubs.push(this.db
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
    )
  }

  /**
   * startExercise
   */
  public startExercise(selectedId: string) {
    // this.db.doc('availableExercises/' + selectedId).update({
    //   lastSelected: new Date()
    // })
    this.runningExercise = this.availableExercises.find(
      ex => ex.id === selectedId
    )
    this.changeExercise.next({ ...this.runningExercise })
  }

  getRunningExercise() {
    return { ...this.runningExercise }
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        this.finishedExercisesChanged.next(exercises)
      })
    )
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

  cancelSubscriptions() {
    this.fbSubs.forEach(element => {
      element.unsubscribe()
    })
  }
}
