import { expect } from 'chai';
import { Logger } from '@nestjs/common';
import * as sinon from 'sinon';
import { optionalRequire } from '../../helpers/optional-require';

describe('optionalRequire', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should load package when available', () => {
    const result = optionalRequire('path');
    expect(result).to.not.be.undefined;
  });

  it('should use loaderFn when provided', () => {
    const loaderFn = () => ({ loaded: true });
    const result = optionalRequire('any', loaderFn);
    expect(result).to.eql({ loaded: true });
  });

  it('should return empty object when package not found and log warning', () => {
    const warnSpy = sinon.spy(Logger, 'warn');
    const result = optionalRequire('nonexistent-package-test');

    expect(result).to.eql({});
    expect(warnSpy.calledOnce).to.be.true;
    expect(warnSpy.firstCall.firstArg).to.include('nonexistent-package-test');
  });

  it('should catch loaderFn errors and return empty object', () => {
    const warnSpy = sinon.spy(Logger, 'warn');
    const result = optionalRequire('any', () => {
      throw new Error('fail');
    });

    expect(result).to.eql({});
    expect(warnSpy.calledOnce).to.be.true;
    expect(warnSpy.firstCall.firstArg).to.include('any');
  });
});
