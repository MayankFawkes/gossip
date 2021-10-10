# app/main.py
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from starlette.middleware.cors import CORSMiddleware
from app.constants import site, app
from fastapi.staticfiles import StaticFiles
from app.web import routers

path = app.path

async def not_found(request, exc):
	return "Error"

exceptions = {
}

app = FastAPI(title=app.name, openapi_url=None, exception_handlers=exceptions)

app.mount("/static", StaticFiles(directory=f"{path}/static"), name="static")



app.add_middleware(
CORSMiddleware,
allow_origins=["*"], # Allows all origins
allow_credentials=True,
allow_methods=["*"], # Allows all methods
allow_headers=["*"], # Allows all headers
)

@app.get("/favicon.ico")
async def read_item():
	return FileResponse(f"{path}/files/favicon.ico")

@app.get("/robots.txt")
async def read_item():
	return FileResponse(f"{path}/files/robots.txt")

app.include_router(routers, prefix="")