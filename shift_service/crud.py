from sqlalchemy import or_
from sqlalchemy.orm.session import Session
from shift_service.models import Users


def get_resource(session: Session, model, id):
    return session.query(model).filter(model.id == id).one_or_none()  # type: ignore


def get_resources(session: Session, model, offset: int, limit: int, **kwargs):
    return session.query(model).filter_by(**kwargs).offset(offset).limit(limit)

def get_all_unique_companies(session: Session):
    return session.query(Users.company).distinct()


def search_users(
    session: Session,
    search_by: str | None,
    company: str | None,
):
    query = session.query(Users)
    filters = []
    if search_by:
        filters.extend(
            [
                Users.first_name.like(f"%{search_by}%"),
                Users.last_name.like(f"%{search_by}%"),
            ]
        )
        query = query.filter(or_(False, *filters))
    if company:
        query = query.filter_by(company=company)
    return query
