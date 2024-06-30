from fastapi.testclient import TestClient
from shift_service.server import app
from seed_db import main as seed_func

client = TestClient(app)
seed_func()

def test_read_main():
    response = client.get("/ping")
    assert response.status_code == 200
    assert response.json() == {"message": "pong"}


def test_get_all_users():
    response = client.get("/v1/users")
    json = response.json()
    assert response.status_code == 200
    assert len(json) == 52


def test_search_users():
    response = client.get("/v1/users", params={"search_by": "Khalid"})
    json = response.json()
    assert response.status_code == 200
    assert any("Khalid" in user["first_name"] for user in json)
    assert any("Khalid" in user["last_name"] for user in json)


def test_get_users_by_company():
    response = client.get("/v1/users", params={"company": "Ltd"})
    json = response.json()
    assert response.status_code == 200
    assert all("Ltd" in user["company"] for user in json)


def test_get_users_by_company_with_similar_names():
    response = client.get(
        "/v1/users", params={"company": "Ltd", "first_name": "Michael"}
    )
    json = response.json()
    assert response.status_code == 200
    assert all("Ltd" in user["company"] for user in json)
    assert all(
        "Ltd" in user["company"]
        and ("Michael" in user["last_name"] or "Michael" in user["last_name"])
        for user in json
    )

def test_get_users_invalid_inputs():
    response = client.get(
        "/v1/users", params={"search_by": "1hello"}
    )
    assert response.status_code == 422

def test_get_all_unique_companies():
    response = client.get(
        "/v1/users/company"
    )
    response_json = response.json()
    assert response.status_code == 200
    assert len(response_json) == len(set(response_json))