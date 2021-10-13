...
from fastapi import APIRouter, Request, Response
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from app.constants import app
...

path = app.path

router = APIRouter()


@router.get("/message")
async def message_data():
	return {}


@router.get("/recent")
async def recent():
	return [
		{"name": ""}
	]