import { Injectable } from "@angular/core";
import { HousingLocation } from "./housing-location";

@Injectable({
    providedIn: "root",
})
export class HousingService {
    url = "http://localhost:3000/locations";

    constructor() {}

    async getAllHousingLocations(): Promise<HousingLocation[]> {
        const data = await fetch(this.url);
        const locations = await data.json();
        return locations;
    }

    async getHousingLocationById(
        id: number
    ): Promise<HousingLocation | undefined> {
        const data = await fetch(`${this.url}/${id}`);
        const location = await data.json();
        if (location) {
            return location;
        }
        return undefined;
    }

    submitApplication(
        firstName: string,
        lastName: string,
        email: string
    ): boolean {
        console.log(
            `Application submitted for ${firstName} ${lastName} (${email})`
        );
        return true;
    }
}
