import { Component, OnInit } from '@angular/core';
import { Reservation } from '../models/reservation';
import { ReservationServiceService } from '../reservation/reservation-service.service';

@Component({
  selector: 'app-reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.css'
})
export class ReservationListComponent implements OnInit {

  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationServiceService) {}

  ngOnInit(): void {
    this.reservationService.getReservations().subscribe(r =>
      this.reservations = r
    );
  }

  deleteReservation(id: string) {
    this.reservationService.deleteReservation(id)
      .subscribe(() => console.log("Delete request processed"));
  }
}
