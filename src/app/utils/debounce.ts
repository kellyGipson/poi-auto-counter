export function debounce(
  func: () => void,
  delay: number
): void {
  let timer: ReturnType<typeof setTimeout>;

	const dbncFn = () => {
    clearTimeout(timer);
    timer = setTimeout(() => func(), delay);
  };
	dbncFn();
}
