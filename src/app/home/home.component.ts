import { Component, inject } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HousingLocationComponent } from "../housing-location/housing-location.component";
import { HousingLocation } from "../housing-location";
import { HousingService } from "../housing.service";

@Component({
    selector: "app-home",
    standalone: true,
    imports: [CommonModule, HousingLocationComponent],
    template: `
        <section>
            <form>
                <label for="search">Search</label>
                <input type="text" placeholder="Filter by city" #filter />
                <button
                    class="primary"
                    type="button"
                    (click)="filterResults(filter.value)"
                >
                    Search
                </button>
            </form>
        </section>
        <section class="results">
            <app-housing-location
                *ngFor="let housingLocation of housingLocations"
                [housingLocation]="housingLocation"
            ></app-housing-location>
        </section>
    `,
    styleUrls: ["./home.component.css"],
})
export class HomeComponent {
    housingLocations: HousingLocation[] = [];
    housingService: HousingService = inject(HousingService);
    constructor() {
        this.housingService.getAllHousingLocations().then((locations) => {
            this.housingLocations = locations;
        });
    }

    filterResults(filter: string) {
        console.log("Filter: ", filter);
        this.housingService.getAllHousingLocations().then((locations) => {
            console.log("Locations: ", locations);
            this.housingLocations = locations.filter((location) =>
                location.city.toLowerCase().includes(filter.toLowerCase())
            );
        });
    }
}
