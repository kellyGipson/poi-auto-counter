import { FormGroup, FormControl, FormArray } from "@angular/forms";

export type HuntForm = FormGroup<{
	species: FormControl<string>;
	counters: FormArray<CounterForm>;
}>

export type CounterForm = FormGroup<{
	count: FormControl<number>;
	interval: FormControl<number>;
	method: FormControl<string>;
	games: FormArray<GamesForm>;
}>;

export type GamesForm = FormGroup<{
	version: FormControl<string>;
	location: FormControl<string>;
	caught: FormControl<boolean>;
	found: FormControl<boolean>;
}>;
