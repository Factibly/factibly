import graphene
import fakenews_backend.apps.users.schema as UserSchema

class Query(UserSchema.Query, graphene.ObjectType):
    pass

class Mutation(UserSchema.Mutation, graphene.ObjectType):
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)