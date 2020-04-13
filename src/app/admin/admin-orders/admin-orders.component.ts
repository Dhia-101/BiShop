import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders;
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    orderService.getOrders().pipe(take(1))
      .subscribe(o => this.orders = o);
  }


  ngOnInit() {
  }

}
