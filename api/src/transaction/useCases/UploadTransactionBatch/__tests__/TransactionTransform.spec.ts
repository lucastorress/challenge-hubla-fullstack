import { splitStringIntoChunks } from '../TransactionTransform';

const text = '1900-01-02';

describe('helper functions for data manipulation', () => {
  it('should split a string into three chunks with specific length', async () => {
    const result = splitStringIntoChunks(text, [4, 3, 3]);
    expect(result).toHaveLength(3);
    expect(result[0]).toBe('1900');
    expect(result[1]).toBe('-01');
    expect(result[2]).toBe('-02');
  });
});
