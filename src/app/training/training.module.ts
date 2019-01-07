import { NgModule } from '@angular/core'
import { TrainingComponent } from './training.component'
import { CurrentTrainingComponent } from './current-training/current-training.component'
import { NewTrainingComponent } from './new-training/new-training.component'
import { PastTrainingsComponent } from './past-trainings/past-trainings.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'
import { StopTrainingComponent } from './current-training/stop-training.component'
import { FlexLayoutModule } from '@angular/flex-layout'
import { AngularFirestoreModule } from 'angularfire2/firestore'
import { SharedModule } from '../shared/share.module'

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [SharedModule, AngularFirestoreModule],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
