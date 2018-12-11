import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { Router } from '@angular/router';
import { PatientPackage } from '../../models/PatientPackage';
import { PaymentService } from '../../services/payment.service';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-patientpackage',
  templateUrl: './patientpackage.component.html',
  styleUrls: ['./patientpackage.component.css']
})
export class PatientPackageComponent implements OnInit {
  currentPackage: PatientPackage = new PatientPackage();
  outstandingBalance: number;
  loading: boolean;

  constructor(
    private patientService: PatientService,
    private router: Router,
    private paymentService: PaymentService,
    private helpersService: HelpersService
  ) { }

  ngOnInit() {
    this.getPatientPackage();
  }

  private getPatientPackage() {
    this.patientService.getCurrentPatientPackage().subscribe(result => {
      this.currentPackage = result;
      if (this.currentPackage.statusId == 2) {
        this.paymentService.getOutstandingBalance().subscribe(balanceResp => {
          this.outstandingBalance = balanceResp.outstandingBalance;
        }, error => {
          console.error(JSON.stringify(error.error));
        });
      }
    }, error => {
      console.error(JSON.stringify(error.error));
    });
  }

  changePackage() {
    this.router.navigate(['/profile/change-package']);
  }

  cancelPackage() {
    this.loading = true;
    this.patientService.cancelPatientPackage().subscribe(result => {
      //Success...reload
      this.getPatientPackage();
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error.error));
    });
  }

  undoCancelPackage() {
    this.loading = true;
    this.patientService.undoCancelPatientPackage().subscribe(result => {
      //Success...reload
      this.getPatientPackage();
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error.error));
    });
  }

  reactivatePackage() {
    this.loading = true;
    this.patientService.reactivatePatientPackage().subscribe(result => {
      //Success...reload
      this.getPatientPackage();
      this.loading = false;
    }, error => {
      this.loading = false;
      console.error(JSON.stringify(error.error));
    });
  }

  getPackageStatusClass(statusId: number) {
    return this.helpersService.getPackageStatusClass(statusId);
  }
}