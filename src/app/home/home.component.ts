import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { IStorageService } from '../app-service/IStorage.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CreateLabelComponent } from './create-label/create-label.component';

interface action {
  name: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-home-component',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  actions: action[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
      route: '/dashboard',
    },
    {
      name: 'Reminders',
      icon: 'schedule',
      route: '/reminder',
    },
    {
      name: 'Archive',
      icon: 'archive',
      route: '/archive',
    },
    {
      name: 'Trash',
      icon: 'delete',
      route: '/trash',
    },
  ];

  path = '';
  customLabels: Observable<string[]>;

  constructor(
    private storageService: IStorageService,
    private router: Router,
    public dialog: MatDialog,
  ) {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          this.path = window.location.hash;
          this.path = this.path.substr(1);
        }),
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.customLabels = this.storageService.GetAllCustomBuckets();
  }

  createLabel() {
    let labels;
    this.customLabels.subscribe((data) => (labels = data));
    const dialogRef = this.dialog.open(CreateLabelComponent, {
      disableClose: true,
      data: labels,
    });

    dialogRef.afterClosed().subscribe((res: string) => {
      if (res !== undefined) {
        this.storageService.CreateCustomBucket(res);
        this.router.navigateByUrl('/tagged/' + res);
      }
    });
  }

  deleteLabel(deleteLabel: string) {
    this.storageService.DeleteBucket(deleteLabel);
    let labels: string[];
    this.customLabels.subscribe((data) => {
      return (labels = data);
    });
    this.router.navigateByUrl(labels.length > 0 ? '/tagged/' + labels[0] : '');
  }

  getRoute(label: string) {
    return '/tagged/' + label;
  }
}
