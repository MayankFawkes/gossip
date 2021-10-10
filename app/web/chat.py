...
from fastapi import APIRouter, Request, Response
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
from app.constants import app

from html import unescape
...

path = app.path

router = APIRouter()

templates = Jinja2Templates(directory=f"{path}/templates/chat")

@router.get("/chat")
async def chat(request: Request):
	return templates.TemplateResponse("index.html", {"request": request})