from fastapi import APIRouter, Request, Response
from fastapi.responses import RedirectResponse
from typing import Union, Dict
import json


async def return_json(text:Union[Dict[str, str], str]):
	if isinstance(text, dict):
		text = json.dumps(text)
	return Response(content=text, media_type="application/json")
