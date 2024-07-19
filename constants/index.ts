import images from './images';

const AVAILABILITY = [
	{ label: 'Occupied', value: 'occupied' },
	{ label: 'Available', value: 'available' },
	{ label: 'Offline', value: 'offline' }
];

const TYPES = [
	{
		label: 'Fast charger',
		value: 'fast'
	},
	{ label: 'Standard charger', value: 'standard' },
	{ label: 'Slow charger', value: 'slow' }
];

export { images, AVAILABILITY, TYPES };
