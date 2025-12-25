import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  CheckoutFormModel,
  CreateCashOrders,
  CreateVisaOrders,
} from '@org/models';
import { Observable } from 'rxjs';

/**
 *  Service to create an order.
 */
@Injectable({
  providedIn: 'root',
})
export class CreatOrder {
  private readonly http = inject(HttpClient);

  /**
   *  Sends a request to create cash order.
   */
  createCashOrder(
    id: string | null,
    dataobject: CheckoutFormModel
  ): Observable<CreateCashOrders> {
    return this.http.post<CreateCashOrders>(
      `https://ecommerce.routemisr.com/api/v1/orders/${id}`,
      dataobject
    );
  }

  /**
   *  Sends a request to create visa order.
   */
  createVisaOrder(
    id: string | null,
    dataobject: CheckoutFormModel
  ): Observable<CreateVisaOrders> {
    return this.http.post<CreateVisaOrders>(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`,
      dataobject
    );
  }
}
