describe('First tests to check if jest is working', () => {
  test('true is true', () => {
    expect(true).toBe(true);
  });

  test('how cast to number with "+" in TypeScript works', () => {
    expect(+'abc' || 0).toBe(0); // NaN
    const t: any = undefined;
    expect(+t || 1).toBe(1);
    expect(+'one' || 2).toBe(2); // NaN
    expect(+{val: 42} || 3).toBe(3); // NaN
  });
});
