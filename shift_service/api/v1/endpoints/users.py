from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from shift_service import schemas, crud
from shift_service.api import deps
from typing import Annotated

router = APIRouter()


@router.get("", response_model=list[schemas.Users])
def get_users(
    search_by: Annotated[str | None, Query(min_length=1, pattern=r"^\D+$")] = None,
    company: Annotated[str | None, Query(min_length=1)] = None,
    session: Session = Depends(deps.get_session),
):
    query = crud.search_users(
        session=session,
        search_by=search_by,
        company=company,
    )
    return query.all()

@router.get("/company", response_model=list[str])
def get_companies(
    session: Session = Depends(deps.get_session),
):
    query = crud.get_all_unique_companies(session)
    all_companies = query.all()
    return [company[0] for company in all_companies]