export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  hashed_refresh_token?: string;
}
