import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import Recipe from "./model";

@Resolver(Recipe)
class RecipeResolver {
  @Query(() => Recipe)
  getRecipe() {
    return {
      id: "1",
      title: "Recipe 1",
      description: "Desc 1",
    };
  }
}

export default RecipeResolver;
