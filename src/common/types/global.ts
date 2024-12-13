import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserType {
  @Field()
  id: number;

  @Field()
  username: string;
}

@ObjectType()
export class LoginResponse {
  @Field()
  access_token: string;

  @Field(() => UserType)
  user: UserType;
}
