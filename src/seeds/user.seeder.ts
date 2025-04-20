import { DataSource } from 'typeorm';
import { User } from '../apis/users/entities/user.entity';
import { DatabaseConfig } from 'src/config/database';

const config = {
  ...DatabaseConfig,
  entities: [User],
};

const dataSource = new DataSource(config);

async function seed() {
  await dataSource.initialize();

  const userRepo = dataSource.getRepository(User);

  const existing = await userRepo.findOneBy({ email: 'admin@example.com' });
  if (existing) {
    console.log('Seed user already exists.');
    return;
  }

  const user = userRepo.create({
    name: 'admin',
    email: 'admin@example.com',
    password: '1',
    hashed_refresh_token: undefined,
  });

  await userRepo.save(user);
  console.log('User seeded!');
  await dataSource.destroy();
}

seed().catch(e => {
  console.error(e);
  process.exit(1);
});
