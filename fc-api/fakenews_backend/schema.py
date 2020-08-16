import graphene
import fakenews_backend.apps.users.schema as user_schema
import fakenews_backend.apps.core.schema as core_schema


class Query(user_schema.Query, core_schema.Query, graphene.ObjectType):
    pass


class Mutation(user_schema.Mutation, core_schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
