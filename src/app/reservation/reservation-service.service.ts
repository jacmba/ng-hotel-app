import { Injectable } from '@angular/core';
import { Reservation } from '../models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationServiceService {

  private reservations: Reservation[] = [];

  constructor() {
    const savedReservations = localStorage.getItem("reservations");
    this.reservations = savedReservations ?
      JSON.parse(savedReservations) :
      [];
  }

  getReservations(): Reservation[] {
    return this.reservations;
  }

  getReservation(id: string): Reservation | undefined {
    return this.reservations.find(r => r.id === id);
  }

  addReservation(reservation: Reservation): void {
    reservation.id = Date.now().toString();
    this.reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(this.reservations));
  }

  deleteReservation(id: string): void {
    const index = this.reservations.findIndex(r => r.id === id);
    this.reservations.splice(index, 1);
  }

  updateReservation(reservation: Reservation): void {
    const index = this.reservations.findIndex(r => r.id === reservation.id);
    this.reservations[index] = reservation;
  }
}
