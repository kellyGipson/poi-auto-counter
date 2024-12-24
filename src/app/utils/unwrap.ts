import { Observable, take, tap } from "rxjs";

export const unwrap = <ObsValue>(obs: Observable<ObsValue>): ObsValue | undefined => {
	let value: ObsValue | undefined;

	obs.pipe(
		take(1),
		tap((v) => {
			value = v || undefined;
		})
	).subscribe();
	
	return value;
}
