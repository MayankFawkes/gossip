...
from fastapi import APIRouter, Request, Response
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from app.constants import app
...

path = app.path

router = APIRouter()
templates = Jinja2Templates(directory=f"{path}/templates/index")


@router.get("/")
async def index():
	return {"status": "working"}
