import { expect } from 'chai';
import { loadPackage } from '../../utils/load-package.util';

describe('loadPackage', () => {
  describe('when package is available', () => {
    it('should return package', () => {
      expect(loadPackage('reflect-metadata', 'ctx')).to.be.eql(
        require('reflect-metadata'),
      );
    });
  });

  describe('when package is not available', () => {
    it('should throw an error', () => {
      expect(() => loadPackage('nonexistent-package', 'ctx')).to.throw();
    });

    it('should throw error with descriptive message', () => {
      expect(() => loadPackage('nonexistent-package', 'ctx')).to.throw(
        'The "nonexistent-package" package is missing.',
      );
    });

    it('should throw when loaderFn fails', () => {
      expect(() =>
        loadPackage('any', 'ctx', () => {
          throw new Error('fail');
        }),
      ).to.throw('The "any" package is missing.');
    });
  });
});
