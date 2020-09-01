
from graphene import String, ObjectType
from ..models import Content
from .citation_specific.apa_reference import ApaReference
from .citation_specific.mla_reference import MlaReference
from .citation_specific.harvard_reference import HarvardReference
from .citation_specific.chicago_reference import ChicagoReference
from .citation_specific.turabian_reference import TurabianReference
from .citation_specific.bibtex_reference import BibtexReference
from .citation_specific.ieee_reference import IeeeReference
from .citation_specific.acm_reference import AcmReference
from .citation_specific.cbe_cse_reference import CbeCseReference
from .citation_specific.acs_reference import AcsReference
from .citation_specific.vancouver_reference import VancouverReference
from .citation_specific.nlm_reference import NlmReference
from .citation_specific.ama_reference import AmaReference
from .citation_specific.oscola_reference import OscolaReference
from .citation_specific.mhra_reference import MhraReference
from .citation_specific.aaa_reference import AaaReference
from .citation_specific.apsa_reference import ApsaReference


class CitationType(ObjectType):
    style = String()
    reference = String()


class ReferenceCreator:
    klasses = (ApaReference, MlaReference, HarvardReference,
               ChicagoReference, TurabianReference, BibtexReference,
               IeeeReference, AcmReference, CbeCseReference,
               AcsReference, VancouverReference, NlmReference,
               AmaReference, OscolaReference, MhraReference,
               AaaReference, ApsaReference)

    def __init__(self, content: Content):
        self.url = content.url
        self.title = content.title
        self.author = content.author
        self.publication_date = content.publication_date

    def create_citations(self):
        citations = []
        medium = "website"
        for klass in self.klasses:
            ct = CitationType()
            ct.style = klass.name
            obj = klass(
                self.url,
                self.title,
                self.author,
                self.publication_date
            )
            ct.reference = getattr(obj, f"reference_{medium}")()
            citations.append(ct)

        return citations
