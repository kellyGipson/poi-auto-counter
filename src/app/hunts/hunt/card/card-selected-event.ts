import { Hunt } from "../../../infrastructure/auto-counter/hunt";

export interface HuntCardSelectedEvent {
	hunt: Hunt;
	isSelected: boolean;
}
