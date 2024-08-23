import { RouterOutlet } from '@angular/router';
import { HeaderDashboardComponent } from './../../shared/components/header-dashboard/header-dashboard.component';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [HeaderDashboardComponent, RouterOutlet],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.css'
})
export class DashboardLayoutComponent {

}
