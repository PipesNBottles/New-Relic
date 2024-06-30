from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from shift_service import settings
from shift_service.api.v1 import api_router

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/v1")


@app.get("/ping")
def health_check():
    """
    Endpoint to check whether the service is alive and ready for traffic
    """
    return {"message": "pong"}
