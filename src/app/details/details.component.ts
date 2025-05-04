import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { HousingService } from "../housing.service";
import { HousingLocation } from "../housing-location";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: "app-details",
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    template: `<article>
        <img class="listing-photo" [src]="housingLocation?.photo" />
        <section class="listing-description">
            <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
            <p class="listing-location">
                {{ housingLocation?.city }}, {{ housingLocation?.state }}
            </p>
        </section>
        <section class="listing-features">
            <h2 class="listing-features">About this housing location</h2>
            <ul>
                <li>Units Available: {{ housingLocation?.availableUnits }}</li>
                <li>Wifi: {{ housingLocation?.wifi ? "Yes" : "No" }}</li>
                <li>Laundry: {{ housingLocation?.laundry ? "Yes" : "No" }}</li>
            </ul>
        </section>
        <section class="listing-apply">
            <h2 class="section-heading">Apply Now to live here</h2>
            <form [formGroup]="applyForm" (submit)="submitApplication()">
                <label for="firstName">First Name</label>
                <input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    formControlName="firstName"
                />
                <label for="lastName">Last Name</label>
                <input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    formControlName="lastName"
                />
                <label for="email">Email</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    formControlName="email"
                />
                <button class="primary" type="submit">Apply</button>
            </form>
        </section>
    </article> `,
    styleUrls: ["./details.component.css"],
})
export class DetailsComponent {
    route: ActivatedRoute = inject(ActivatedRoute);
    housingLocationId: number = 0;
    housingLocation: HousingLocation | undefined;
    housingService: HousingService;
    applyForm: FormGroup = new FormGroup({
        firstName: new FormControl(""),
        lastName: new FormControl(""),
        email: new FormControl(""),
    });

    constructor() {
        this.housingLocationId = Number(this.route.snapshot.paramMap.get("id"));
        if (isNaN(this.housingLocationId)) {
            this.housingLocationId = 0;
        }
        this.housingService = inject(HousingService);
        this.housingService
            .getHousingLocationById(this.housingLocationId)
            .then((location) => {
                this.housingLocation = location;
            });
    }

    submitApplication() {
        if (this.applyForm.valid) {
            this.housingService.submitApplication(
                this.applyForm.value.firstName ?? "",
                this.applyForm.value.lastName ?? "",
                this.applyForm.value.email ?? ""
            );
            console.log("Application submitted", this.applyForm.value);
            this.applyForm.reset();
        } else {
            console.log("Form is invalid");
        }
    }
}
