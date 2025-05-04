import { Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { DetailsComponent } from "./details/details.component";

const routeConfig: Routes = [];
routeConfig.push(
    {
        path: "",
        pathMatch: "full",
        component: HomeComponent,
        title: "Home Page",
    },
    {
        path: "details/:id",
        pathMatch: "full",
        component: DetailsComponent,
        title: "Details Page",
    }
);

export default routeConfig;
