import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
class Recipe {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;
}

export default Recipe;
