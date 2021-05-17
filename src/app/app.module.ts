import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { IStorageService } from './app-service/IStorage.service';
import { StorageService } from './app-service/storage.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './home/home.component';
import { ListTemplateComponent } from './list-template/list-template.component';
import { NoteTemplateComponent } from './list-template/note-template/note-template.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateDialogComponent } from './list-template/note-template/create-dialog/create-dialog';
import { NoteActionComponent } from './list-template/note-template/create-dialog/note-action/note-action.component';
import { TitleTemplateComponent } from './list-template/title-template/title-template.component';
import { CreateLabelComponent } from './home/create-label/create-label.component';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { DashboardContainerComponent } from './home/dashboard/dashboard.component';
import { RemindersComponent } from './home/reminders/reminders.component';
import { TaggedComponent } from './home/tagged/tagged.component';
import { TrashComponent } from './home/trash/trash.component';
import { ArchiveComponent } from './home/archive/archive.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateDialogComponent,
    RemindersComponent,
    ArchiveComponent,
    TrashComponent,
    TaggedComponent,
    DashboardContainerComponent,
    NoteTemplateComponent,
    TitleTemplateComponent,
    ListTemplateComponent,
    NoteActionComponent,
    CreateLabelComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatDialogModule,
    MatSlideToggleModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    DragDropModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    MatTooltipModule,
    MatInputModule,
    MatDividerModule,
    MatExpansionModule,
    MatSidenavModule,

    FlexLayoutModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    {
      provide: IStorageService,
      useClass: StorageService,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
