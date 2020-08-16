from graphene import ClientIDMutation, Field, String
from graphql import GraphQLError


class BaseMutation(ClientIDMutation):
    class Meta:
        abstract = True

    @classmethod
    def __init_subclass_with_meta__(
        cls, output=None, input_fields=None, arguments=None, name=None, **options
    ):
        super().__init_subclass_with_meta__(
            output, input_fields, arguments, name, **options)
        cls._meta.fields["errors"] = Field(
            String, name="errors")

    @classmethod
    def mutate(cls, root, info, input):
        try:
            return super().mutate(root, info, input)
        except GraphQLError as e:
            return cls(errors=str(e))
