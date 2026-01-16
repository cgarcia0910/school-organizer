import { generatedServerCourse } from './generated-server-course';

describe('generatedServerCourse', () => {
  it('should work', () => {
    expect(generatedServerCourse()).toEqual('generated-server-course');
  });
});
