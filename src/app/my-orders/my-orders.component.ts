import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders$;
  constructor(
    private authService: AuthService,
    private orderService: OrderService) {
    authService.getUser()
      .subscribe(user => {
        this.orders$ = orderService.getOrdersById(user.uid);
      });

  }

  ngOnInit() {
  }
  test() {
    this.orderService.getOrdersById('jCDHox0HEpWJznu9xWpXJYHzsBO2').subscribe(p => {
      console.log(p);
    })
  }

}
