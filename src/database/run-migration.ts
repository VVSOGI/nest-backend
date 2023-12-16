import { CreateUserTable1702707050713 } from '../migration/1702707050713-CreateUserTable';
import { dataSource } from './data-source';

async function runMigrations() {
  await dataSource.initialize();

  const migration = new CreateUserTable1702707050713();
  await migration.up(dataSource.createQueryRunner());
  console.log('Migrations have been run successfully.');
}

runMigrations().catch((error) => {
  console.error('Error during migrations', error);
});
