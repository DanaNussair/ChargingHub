import { getChargingPoints } from '@/helpers/db'; // Adjust the import to your actual file path

// Mock the SQLiteDatabase class and its methods
const mockGetAllAsync = jest.fn();
const mockDb = {
	getAllAsync: mockGetAllAsync
};

const mockData = [
	{ id: 1, address: 'Location 1', charging_type: '', availability: '' },
	{ id: 2, location: 'Location 2', charging_type: '', availability: '' }
];

describe('Database helpers', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('getChargingPoints', () => {
		it('should return charging points data on success', async () => {
			mockGetAllAsync.mockResolvedValueOnce(mockData);

			const result = await getChargingPoints(mockDb as any);

			expect(mockGetAllAsync).toHaveBeenCalledWith(
				'SELECT * FROM ChargingPoints'
			);
			expect(result).toEqual(mockData);
		});

		it('should throw an error if getAllAsync fails', async () => {
			const errorMessage = 'Failed to fetch charging points';
			mockGetAllAsync.mockRejectedValueOnce(new Error(errorMessage));

			await expect(getChargingPoints(mockDb as any)).rejects.toThrow(
				errorMessage
			);
			expect(mockGetAllAsync).toHaveBeenCalledWith(
				'SELECT * FROM ChargingPoints'
			);
		});
	});
});
