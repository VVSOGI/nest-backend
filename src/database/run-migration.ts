import { Bennynest21703836421186 } from 'src/migration/1703836421186-bennynest2';
import { dataSource } from './data-source';

async function runMigrations() {
  await dataSource.initialize();

  const migration = new Bennynest21703836421186();
  await migration.up(dataSource.createQueryRunner());
  console.log('Migrations have been run successfully.');
}

runMigrations().catch((error) => {
  console.error('Error during migrations', error);
});
