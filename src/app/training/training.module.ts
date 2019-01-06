import { NgModule } from '@angular/core'
import { TrainingComponent } from './training.component'
import { CurrentTrainingComponent } from './current-training/current-training.component'
import { NewTrainingComponent } from './new-training/new-training.component'
import { PastTrainingsComponent } from './past-trainings/past-trainings.component'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { MaterialModule } from '../material.module'

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent
  ],
  imports: [CommonModule, MaterialModule, FormsModule],
  exports: []
})
export class TrainingModule {}
