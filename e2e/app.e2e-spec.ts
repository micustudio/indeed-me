import { IndeedMePage } from './app.po';

describe('indeed-me App', () => {
  let page: IndeedMePage;

  beforeEach(() => {
    page = new IndeedMePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
