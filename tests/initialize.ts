import { initializeBooks } from './fixtures/books.fixture';
import datasource from './db-config';

(async () => {
  await datasource.initialize();
  await initializeBooks();
  // Other db fixtures will follow here...
})();
