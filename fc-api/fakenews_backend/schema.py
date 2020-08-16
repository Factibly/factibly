import graphene
from fakenews_backend.apps.core.gql import schema as core_schema
from fakenews_backend.apps.users.gql import schema as user_schema


class Query(user_schema.Query, core_schema.Query, graphene.ObjectType):
    pass


class Mutation(user_schema.Mutation, core_schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
