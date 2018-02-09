import { SimpleCrmFrontendPage } from './app.po';

describe('simple-crm-frontend App', () => {
  let page: SimpleCrmFrontendPage;

  beforeEach(() => {
    page = new SimpleCrmFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
