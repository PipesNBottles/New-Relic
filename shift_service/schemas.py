from pydantic import BaseModel, ConfigDict, Field
from pydantic.json_schema import SkipJsonSchema

class BaseUser(BaseModel):
    id: int
    first_name: str
    last_name: str
    company: str


class Users(BaseUser):
    model_config = ConfigDict(extra='ignore')
