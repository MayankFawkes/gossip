'''
Main routes
'''

from fastapi import APIRouter
from app.web import chat
from app.web import index
from app.web import api
from app.web import ws
from fastapi.middleware.cors import CORSMiddleware

routers = APIRouter()

routers.include_router(chat.router, prefix="", tags=["chat"])
routers.include_router(index.router, prefix="", tags=["index"])
routers.include_router(api.router, prefix="", tags=["api"])
routers.include_router(ws.router, prefix="", tags=["ws"])
