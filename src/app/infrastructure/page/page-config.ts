import { Route } from "@angular/router";

export interface PageConfig {
	route: Route & { data: { title: string } };
}
