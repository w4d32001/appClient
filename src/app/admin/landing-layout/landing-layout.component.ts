import { CompanyService } from './../../core/services/api/company.service';
import { Company } from './../../core/models/company';
import { HeaderLandingComponent } from './../../shared/components/header-landing/header-landing.component';
import { CarouselComponent } from './../../shared/components/carousel/carousel.component';
import { FooterLandingComponent } from './../../shared/components/footer-landing/footer-landing.component';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-landing-layout',
  standalone: true,
  imports: [FooterLandingComponent, CarouselComponent, HeaderLandingComponent],
  templateUrl: './landing-layout.component.html',
  styleUrl: './landing-layout.component.css'
})
export class LandingLayoutComponent {
  private companyService = inject(CompanyService)

  company: Company = {
    id: 0,
    name: "",
    description: "",
    img: "",
    address: ""
  }
  getCompany(){
    this.companyService.getCompany(1).subscribe(
      (response) => {
        this.company = response.data
      }
    )
  }
  ngOnInit(){
    this.getCompany()
  }
}
