import { Component } from "@angular/core";
import { HuntsComponent } from "../hunts/hunts.component";

@Component({
	selector: 'home',
	template: `<hunts></hunts>`,
	imports: [HuntsComponent]
})
export class HomeComponent {

}
