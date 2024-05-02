import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservationServiceService } from '../reservation/reservation-service.service';
import { Reservation } from '../models/reservation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.css'
})
export class ReservationFormComponent implements OnInit {
  
  reservationForm: FormGroup = new FormGroup({});

  private id: string | undefined;

  constructor(private formBuildeR: FormBuilder,
    private reservationService: ReservationServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  onSubmit() {
    if (this.reservationForm.valid) {
      const reservation: Reservation = this.reservationForm.value;
      
      if(this.id) {
        reservation.id = this.id;
        this.reservationService.updateReservation(reservation);
      } else {
        this.reservationService.addReservation(reservation);
      }

      this.router.navigate(['/list']);
    }
  }

  ngOnInit(): void {
      this.reservationForm = this.formBuildeR.group({
        checkInDate: ['', Validators.required],
        checkOutDate: ['', Validators.required],
        guestName: ['', Validators.required],
        guestEmail: ['', [Validators.required, Validators.email]],
        roomNumber: ['', Validators.required],
      });

      const id = this.activatedRoute.snapshot.paramMap.get("id");

      if(id) {
        const reservation = this.reservationService.getReservation(id);

        if(reservation) {
          this.id = id;
          this.reservationForm.patchValue(reservation);
        }
      }
  }
}
