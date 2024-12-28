import { Router } from "@angular/router";
import { HuntCardSelectedEvent } from "../hunts/hunt/card/card-selected-event";

export const getSelectedHunts = (router: Router): HuntCardSelectedEvent[] => router.getCurrentNavigation()?.extras?.state?.['selectedHunts'] || [];
