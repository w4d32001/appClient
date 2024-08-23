import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';
import KRGlue from '@lyracom/embedded-form-glue';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment-form-component',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './payment-form-component.component.html',
  styleUrls: ['./payment-form-component.component.css']
})
export class PaymentFormComponentComponent implements AfterViewInit {
  @Input() totalAmount!: number;
  message: string = '';
  paid: boolean = false;
  
  response: any; // Cambiado a 'any' para manejar la respuesta

  constructor(private http: HttpClient, private chRef: ChangeDetectorRef, private router: Router) { }

  async ngAfterViewInit() {
    let endpoint: string = '';
    let publicKey: string = '';
    let formToken: string = '';

    try {
      const amountInCents = this.totalAmount * 100;
      const resp: any = await this.http.post('http://127.0.0.1:8000/api/checkout', { amount: amountInCents, currency: 'PEN' }).toPromise();
      
      // Verifica la respuesta antes de proceder
      if (resp && resp.endpoint && resp.publickey && resp.formToken) {
        endpoint = resp.endpoint;
        publicKey = resp.publickey;
        formToken = resp.formToken;

        const { KR } = await KRGlue.loadLibrary(endpoint, publicKey);
        await KR.setFormConfig({ formToken: formToken });
        await KR.onSubmit(this.onSubmit.bind(this)); // Asegúrate de enlazar el contexto
        await KR.renderElements('#myPaymentForm'); 
      } else {
        throw new Error('La respuesta del servidor es inválida.');
      }
      
    } catch (error: any) {
      this.message = error.message + ' (ver la consola para más detalles)';
      console.error('Error al cargar el formulario de pago:', error);
      
      // Redirige en caso de error
      this.router.navigate(['/error']); // Cambia esto a la ruta de error deseada
    }
  }

  private async onSubmit(responseData: any) {
    try {
      // Aquí se asume que `responseData` contiene la respuesta del pago
      this.response = responseData; // Almacena la respuesta

      if (this.response.success) { // Asegúrate de que `success` es la propiedad que indica un pago exitoso
        this.paid = true;
        this.chRef.detectChanges(); 
        console.log("Pago exitoso:", this.response);

        localStorage.clear(); 
        await this.router.navigate(['/profile']); 
        return true; 
      } else {
        this.message = 'No se pudo validar el pago.';
        return false; 
      }
    } catch (error) {
      console.error('Error al validar el pago:', error);
      this.message = 'Error al procesar el pago. Verifica la consola para más detalles.';
      return false; 
    }
  }
}
