from shift_service.models import Users
from shift_service.database import local_session
from sqlalchemy.orm import query
from faker import Faker


def main():
    session = local_session(query_cls=query.Query)
    all_users = session.query(Users).all()
    if len(all_users) == 0:
        fake = Faker()
        data = [Users(first_name=fake.unique.first_name(), last_name=fake.unique.last_name(), company=fake.company()) for _ in range(50)]  # type: ignore
        data.append(Users(first_name="Khalid", last_name="Al-Awady", company="New Relic"))
        data.append(Users(first_name="Al-Awady", last_name="Khalid", company="Relic New"))

        session.add_all(data)
        session.commit()


if __name__ == "__main__":
    main()
