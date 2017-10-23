import { expect } from 'chai';
import { bubbleSort, insertionSort, mergeSort, quickSort, randomNumber } from '@hartiganhm/sorting-suite';

describe('Example Test File', () => {
	it('should successfully us sorts we imported (like badasses)', () => {
		console.log(bubbleSort)
		expect(bubbleSort([3, 2, 1])).to.deep.equal([1, 2, 3]);
	})
})
