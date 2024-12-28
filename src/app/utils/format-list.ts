export const formatList = (items: any[]) => {
	if (!items) return '';
	if (items?.length === 1) return items[0];

	const lastItem = items?.[items?.length - 1];
	delete items?.[items?.length - 1];

	const formattedList = items.join(', ');
	return formattedList + ' and ' + lastItem;
}
