import { Query, Resolver } from "type-graphql";

@Resolver()
class HelloResolver {
  @Query(() => String)
  helloWorld() {
    return "Hello World!";
  }

  @Query(() => String)
  helloWorld2() {
    return "Hello World2!";
  }
}

export default HelloResolver;
