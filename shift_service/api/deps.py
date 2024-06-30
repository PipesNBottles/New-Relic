from sqlalchemy.orm import query
from shift_service import database
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_session():
    try:
        db = database.local_session(query_cls=query.Query)
        yield db
    finally:
        db.close()
